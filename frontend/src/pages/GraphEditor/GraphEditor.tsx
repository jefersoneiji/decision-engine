import "reactflow/dist/style.css";
import 'react-toastify/dist/ReactToastify.css'
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, Panel, useReactFlow } from "reactflow";
import { ToastContainer } from 'react-toastify'

import { AddNodeEdge } from "./AddNodeEdge";
import { CurrentDrawer } from "./Drawers";
import { DrawerName, EditorProvider, editor } from "./Editor";
import { GraphProvider, graph } from "./Graph";
import { allNodes } from "./Nodes";
import { generateEdge, generateNode } from "./nodeGeneration";
import { positionNodes } from "./positionNodes";
import { savePolicy } from "@src/api/policies";
import { PolicyProvider, policy } from "./Policy";
import { Modal } from "@src/components/Modal";

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
          <p className="bg-white text-gray-800 font-semibold py-2 px-4 border rounded shadow">
            Policy Name: {title}
          </p>
        </Panel>
        <Panel position="bottom-right" className="flex flex-col">
          <ResetBoardButton />
          <EditPolicyButton />
          <SaveButton />
          <PoliciesList />
        </Panel>
      </ReactFlow>
      <ToastContainer />
      <CurrentDrawer />
    </div>
  );
}
const SaveButton = () => {
  const { toObject } = useReactFlow()
  const { title } = useContext(policy)

  const onSavePolicy = () => {
    savePolicy({ ...toObject(), title })
  }
  return (
    <button
      className="mb-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onSavePolicy}
    >
      Save Policy
    </button>
  )
}

const ResetBoardButton = () => {
  const onResetBoard = () => {
    location.reload()
  }
  return (
    <button
      className="mb-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onResetBoard}
    >
      Reset Policy
    </button>
  )
}

const EditPolicyButton = () => {
  const { showDrawer } = useContext(editor)
  const { title } = useContext(policy)

  const onShowDrawer = () => {
    showDrawer(DrawerName.editPolicy, {
      policyTitle: title
    })
  }
  return (
    <button
      className="mb-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onShowDrawer}
    >
      Edit Policy
    </button>
  )
}

const PoliciesList = () => {
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <button
        className="mb-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={onOpen}
      >
        Policies List
      </button>
      <Modal open={open} onClose={onClose} >
        <p>Testing</p>
      </Modal>
    </>
  )
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
