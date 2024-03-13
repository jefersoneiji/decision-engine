/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Edge,
  Node,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { editor } from "./Editor";
import {
  getNodeDimensions,
  insertNodeAfterEdge,
} from "./nodeGeneration";
import { NodeName } from "./Nodes";
import { positionNodes } from "./positionNodes";

type ConditionalNode = {
  operation: string,
  parameter: string,
  value: number,
  label: string
}

type EndNode = { decision: string }

export type Graph = {
  nodes: Node[];
  edges: Edge[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  addNodeAfterEdge: (params: { nodeName: NodeName; edge: Edge }) => void;
  updateNode: (id: string, params: ConditionalNode | EndNode) => void;
  deleteNode: (id: string) => void;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: Dispatch<SetStateAction<ReactFlowInstance | null>>;
  fitZoomToGraph: (reactFlowRef: RefObject<HTMLDivElement>) => void;
};

export const graph = createContext({} as Graph);

// "Big" is arbitrary, and in this context it is used to define if a graph zoom
// should focus on the entire graph or only at the beginning of it (start block part).
const arbitraryBigHeight = 1000;

export function GraphProvider({ children }: PropsWithChildren) {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<Graph["reactFlowInstance"]>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { closeEditorDrawer } = useContext(editor);

  const { drawerVisible } = useContext(editor);

  const positionElements = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      const [positionedNodes, positionedEdges] = positionNodes(nodes, edges);
      setNodes(positionedNodes);
      setEdges(positionedEdges);
    },
    [setNodes, setEdges]
  );

  const addNodeAfterEdge: Graph["addNodeAfterEdge"] = ({ nodeName, edge }) => {
    if (!edge) {
      return;
    }

    const { nodes: updatedNodes, edges: updatedEdges } = insertNodeAfterEdge({
      edge,
      nodeName,
      nodes,
      edges,
    });

    closeEditorDrawer();

    positionElements(updatedNodes, updatedEdges);
  };

  const updateNode: Graph['updateNode'] = (id, params) => {
    const updatedNodes = nodes.map(node => node.id === id ? {
      ...node,
      data: Object.assign(node.data, params)
    } : node)

    positionElements(updatedNodes, edges)

    closeEditorDrawer();
  }

  const deleteNode: Graph['deleteNode'] = (id) => {
    const remainedNodes = nodes.filter(node => node.id !== id)
    const remainedEdges = edges.filter(edge => edge.target !== id)

    // positionElements(remainedNodes, edges)
    setNodes(remainedNodes);
    setEdges(remainedEdges);

    closeEditorDrawer()
  }
  function fitZoomToGraph(reactFlowRef: RefObject<HTMLDivElement>) {
    const graphHeight = nodes.reduce((biggestHeight, node) => {
      const graphHeightTillNode = node.position.y;
      if (graphHeightTillNode > biggestHeight) {
        biggestHeight = graphHeightTillNode;
      }
      return biggestHeight;
    }, 0);

    if (!reactFlowRef.current) {
      return;
    }

    if (graphHeight < arbitraryBigHeight) {
      reactFlowInstance?.fitView();
      return;
    }

    const startNodeWidth = getNodeDimensions("start").width;
    const editorWidth =
      reactFlowRef.current.clientWidth * (drawerVisible ? 0.6 : 1);

    const positionThatCentersStartNode = editorWidth / 2 - startNodeWidth / 2;

    const arbitraryTopPosition = 40;
    const arbitraryZoom = 0.8;

    reactFlowInstance?.setViewport({
      x: positionThatCentersStartNode,
      y: arbitraryTopPosition,
      zoom: arbitraryZoom,
    });
  }

  return (
    <graph.Provider
      value={{
        nodes,
        setNodes,
        updateNode,
        deleteNode,
        edges,
        setEdges,
        addNodeAfterEdge,
        reactFlowInstance,
        setReactFlowInstance,
        fitZoomToGraph,
      }}
    >
      {children}
    </graph.Provider>
  );
}
