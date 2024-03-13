import { Drawer } from 'components/Drawer'
import { useContext, useState } from 'react'
import { editor } from '@src/pages/GraphEditor/Editor'
import type { CommonDrawerProps } from '..';
import { graph } from '../../Graph';

type EditNodeDrawerProps = {
    operation: string;
    value: number;
    parameter: string;
    label: string;
} & CommonDrawerProps

export const EditNodeDrawer = ({ id: nodeId, operation, parameter, value }: EditNodeDrawerProps) => {
    const { drawerVisible, closeEditorDrawer } = useContext(editor)
    const { updateNode, deleteNode } = useContext(graph)

    const [currOperation, setOperation] = useState(operation || '>')
    const [currParameter, setParameter] = useState(parameter || 'random')
    const [currValue, setValue] = useState(value || 0)

    const onSave = () => {
        const label = currParameter + ' ' + currOperation + " " + currValue
        updateNode(nodeId!, {
            operation: currOperation,
            parameter: currParameter,
            value: currValue,
            label
        })
    }

    const onDelete = () => {
        deleteNode(nodeId!)
    }
    return (
        <Drawer
            title="Edit Node"
            content={
                <>
                    <span className='font-sans'>IF </span>
                    <input
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={currParameter}
                        onChange={e => setParameter(e.target.value)}
                        style={{ maxWidth: 100 }}
                    />
                    {' '}
                    <select
                        name='operators'
                        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={currOperation}
                        onChange={(e) => setOperation(e.target.value)}
                    >
                        <option value=">">{'>'}</option>
                        <option value=">=">{'>='}</option>
                        <option value="=">{'='}</option>
                        <option value="<">{'<'}</option>
                        <option value="<=">{'<='}</option>
                    </select>
                    {' '}
                    <input
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={currValue}
                        onChange={e => setValue(Number(e.target.value))}
                        style={{ maxWidth: 100 }}
                    />
                    <br />
                    <br />
                    <button onClick={onDelete} className='mr-5 bg-red-500 hover:bg-red-200 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                        Delete Node
                    </button>
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