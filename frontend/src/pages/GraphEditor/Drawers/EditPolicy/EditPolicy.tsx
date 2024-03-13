import { useContext, useState } from 'react'

import { Drawer } from "@src/components/Drawer"
import { editor } from "../../Editor"
import { policy } from '../../Policy'

export const EditPolicyDrawer = ({ policyTitle }: { policyTitle: string }) => {
    const { drawerVisible, closeEditorDrawer } = useContext(editor)
    
    const [newTitle, setNewTitle] = useState(policyTitle || 'Untitled')
    
    const { setTitle } = useContext(policy)
    const onSetTitle = () => {
        setTitle(newTitle)
        closeEditorDrawer()
    }
    
    return (
        <Drawer
            title="Edit Policy"
            content={
                <>
                    <p className='font-sans font-semibold mb-3'>Name</p>
                    <input
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        style={{ maxWidth: 200 }}
                    />
                    <br />
                    <br />
                    <button onClick={onSetTitle} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                        Save
                    </button>
                </>
            }
            onClose={closeEditorDrawer}
            visible={drawerVisible}
        />

    )
}