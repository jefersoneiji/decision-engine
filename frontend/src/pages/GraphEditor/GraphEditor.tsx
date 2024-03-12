import "reactflow/dist/style.css";
import 'react-toastify/dist/ReactToastify.css'
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, Panel, useReactFlow } from "reactflow";
import { ToastContainer } from 'react-toastify'

import { AddNodeEdge } from "./AddNodeEdge";
import { CurrentDrawer } from "./Drawers";
import { EditorProvider } from "./Editor";
import { GraphProvider, graph } from "./Graph";
import { allNodes } from "./Nodes";
import { generateEdge, generateNode } from "./nodeGeneration";
import { positionNodes } from "./positionNodes";
import { savePolicy } from "@src/api/policies";

const edgeTypes = {
  "add-node": AddNodeEdge,
};

function ReactFlowSandbox() {
  const {
    nodes,
    edges,
    reactFlowInstance,
    setReactFlowInstance,
    fitZoomToGraph,
    setNodes,
    setEdges,
  } = useContext(graph);

  const [centeredGraphAtStart, setCenteredGraphAtStart] = useState(false);
  const reactFlowRef = useRef<HTMLDivElement>(null);

  const tryCenteringGraph = useCallback(() => {
    if (centeredGraphAtStart) {
      return;
    }

    fitZoomToGraph(reactFlowRef);

    const viewport = reactFlowInstance?.getViewport();
    if (viewport && viewport.x !== 0 && viewport.y !== 0) {
      return setCenteredGraphAtStart(true);
    }

    const retryTimeInMs = 50;
    setTimeout(() => tryCenteringGraph(), retryTimeInMs);
  }, [centeredGraphAtStart, fitZoomToGraph, reactFlowInstance]);

  useEffect(() => {
    tryCenteringGraph();
  }, [tryCenteringGraph]);

  useEffect(() => {
    const initialNodes = [
      generateNode({ nodeName: "start", id: "start" }),
      generateNode({ nodeName: "end" }),
    ];
    const initialEdges = [
      generateEdge({
        source: "start",
        target: initialNodes[1].id,
      }),
    ];
    const [positionedNodes, positionedEdges] = positionNodes(
      initialNodes,
      initialEdges
    );
    setNodes(positionedNodes);
    setEdges(positionedEdges);
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden w-full relative">
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={allNodes}
        onInit={setReactFlowInstance}
        nodesDraggable={false}
        deleteKeyCode={null}
      >
        <Background className="bg-N-75" size={2} color="#C1C4D6" />
        <Panel position="bottom-right">
          <SaveButton />
        </Panel>
      </ReactFlow>
      <ToastContainer />
      <CurrentDrawer />
    </div>
  );
}
const SaveButton = () => {
  const { toObject } = useReactFlow()
  return (
    <button
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={() => savePolicy(toObject())}
    >
      Save policy
    </button>
  )
}
export function GraphEditor() {
  return (
    <EditorProvider>
      <GraphProvider>
        <ReactFlowSandbox />
      </GraphProvider>
    </EditorProvider>
  );
}
