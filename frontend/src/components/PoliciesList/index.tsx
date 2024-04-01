import { useContext, useEffect, useState } from "react"
import type { Node, Edge } from 'reactflow'

import { PolicyData, deletePolicy, getAllPolicies, getPolicy } from "@src/api/policies"
import { graph } from "@src/pages/GraphEditor/Graph"
import { policy } from "@src/pages/GraphEditor/Policy"
import { positionNodes } from "@src/pages/GraphEditor/positionNodes"
import { Modal } from "../Modal"
import { EditIcon, TrashIcon } from "./Icons"


type PolicyInfo = { id: string, title: string, createdAt: string }
type PolicyProps = PolicyData & PolicyInfo

export const PoliciesList = () => {
    const [open, setOpen] = useState(false)
    const [policies, setPolicies] = useState<Array<PolicyProps>>([])

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
                    <PolicyHeader />
                    <tbody>
                        {policies.length > 0 && policies.map((policy, idx) =>
                            <PolicyItem
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

const PolicyHeader = () => {
    return (
        <thead className="border-b border-neutral-200">
            <tr>
                <th>Name</th>
                <th>Created</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
        </thead>
    )
}

const PolicyItem = ({ id, title, createdAt }: { id: string, title: string, createdAt: string }) => {
    return (
        <tr className="border-b border-neutral-200">
            <td>{title}</td>
            <td>{createdAt}</td>
            <td><DeleteButton id={id} /></td>
            <td><EditButton id={id} /></td>
        </tr>
    )
}

const DeleteButton = ({ id }: { id: string }) => {
    const onDelete = async () => {
        await deletePolicy(id).then(() => location.reload())
    }
    return (
        <div className="flex justify-center cursor-pointer" onClick={onDelete}>
            <TrashIcon />
        </div >
    )
}

type SetBoardProps = (
    positionedNodes: Node[],
    positionedEdges: Edge[],
    title: string
) => void
const EditButton = ({ id }: { id: string }) => {
    const { setNodes, setEdges } = useContext(graph)
    const { setIsEditing, setId, setTitle } = useContext(policy)

    const setBoardValues: SetBoardProps = (positionedNodes, positionedEdges, title) => {
        setNodes(positionedNodes)
        setEdges(positionedEdges)
        setIsEditing(true)
        setId(id)
        setTitle(title)
    }

    const onEdit = () => {
        getPolicy(id).then(res => {
            const { nodes, edges, title } = res.data
            const [positionedNodes, positionedEdges] = positionNodes(nodes, edges)
            setBoardValues(positionedNodes, positionedEdges, title)
        })
    }
    return (
        <div className="flex justify-center cursor-pointer" onClick={onEdit}>
            <EditIcon />
        </div>
    )
}