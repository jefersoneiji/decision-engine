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
import { deletePolicy, getAllPolicies, savePolicy } from "@src/api/policies";
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
    location.reload()
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
  const [policies, setPolicies] = useState([])

  useEffect(() => {
    getAllPolicies().then(res => {
      setPolicies(res.data)
    })
  }, [])
  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const Row = ({ id, title, createdAt }: { id:string, title: string, createdAt: string }) => {
    return (
      <tr className="border-b border-neutral-200">
        <td>{title}</td>
        <td>{createdAt}</td>
        <td><TrashIcon id={id} /></td>
        <td><EditIcon /></td>
      </tr>
    )
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
        <table className="w-full table-auto text-center">
          <thead className="border-b border-neutral-200">
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {policies.length > 0 && policies.map((policy, idx) =>
              <Row
                key={idx}
                id={policy.id}
                title={policy.title}
                createdAt={policy.createdAt}
              />
            )}
          </tbody>
        </table>
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

const TrashIcon = ({ id }: { id: string }) => {
  const onDelete = () => {
    deletePolicy(id)
    location.reload()
  }
  return (
    <div className="flex justify-center cursor-pointer" onClick={onDelete}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </div>
  )
}

const EditIcon = () => {
  return (
    <div className="flex justify-center cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    </div>
  )
}
