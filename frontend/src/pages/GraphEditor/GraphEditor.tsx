import "reactflow/dist/style.css";
import 'react-toastify/dist/ReactToastify.css'
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, Panel } from "reactflow";
import { ToastContainer } from 'react-toastify'

import { AddNodeEdge } from "./AddNodeEdge";
import { CurrentDrawer } from "./Drawers";
import { EditorProvider } from "./Editor";
import { GraphProvider, graph } from "./Graph";
import { allNodes } from "./Nodes";
import { generateEdge, generateNode } from "./nodeGeneration";
import { positionNodes } from "./positionNodes";
import { PolicyProvider, policy } from "./Policy";
import { ResetBoard } from "./ResetBoard";
import { EditPolicy } from "./EditPolicy";
import { SavePolicy } from "./SavePolicy";
import { PoliciesList } from "@src/components/PoliciesList";
import { PolicyTitle } from "./PolicyTitle";

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
      generateNode({ nodeName: "end", data: { decision: 'False' } }),
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

  const { title } = useContext(policy)

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
        <Panel position="top-center">
          <PolicyTitle title={title} />
        </Panel>
        <Panel position="bottom-right" className="flex flex-col">
          <ResetBoard />
          <EditPolicy />
          <SavePolicy />
          <PoliciesList />
        </Panel>
      </ReactFlow>
      <ToastContainer />
      <CurrentDrawer />
    </div>
  );
}

export function GraphEditor() {
  return (
    <EditorProvider>
      <GraphProvider>
        <PolicyProvider>
          <ReactFlowSandbox />
        </PolicyProvider>
      </GraphProvider>
    </EditorProvider>
  );
}
