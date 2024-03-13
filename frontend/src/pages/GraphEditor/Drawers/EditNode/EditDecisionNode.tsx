import { useContext, useState } from "react";
import { CommonDrawerProps } from "..";
import { graph } from "../../Graph";
import { editor } from "../../Editor";
import { Drawer } from "@src/components/Drawer";

type EditDecisionNodeDrawerProps = {
    decision: string
} & CommonDrawerProps

export const EditDecisionNodeDrawer = ({ id: nodeId, decision }: EditDecisionNodeDrawerProps) => {
    const { drawerVisible, closeEditorDrawer } = useContext(editor)
    const { updateNode } = useContext(graph)

    const [currDecision, setDecision] = useState(decision || 'False')

    const onSave = () => {
        updateNode(nodeId!, { decision: currDecision })
    }

    return (
        <Drawer
            title="Edit Decision Node"
            content={
                <>
                    <span className='font-sans'>Decision is </span>
                    {' '}
                    <select
                        name='operators'
                        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={currDecision}
                        onChange={(e) => setDecision(e.target.value)}
                    >
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                    <br />
                    <br />
                    <button onClick={onSave} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                        Save
                    </button>
                </>
            }
            onClose={closeEditorDrawer}
            visible={drawerVisible}
        />
    )
}