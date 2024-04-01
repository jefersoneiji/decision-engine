import { BasicButton } from "@src/components/BasicButton"
import { useContext } from "react"
import { policy } from "./Policy"
import { DrawerName, editor } from "./Editor"

export const EditPolicy = () => {
    const { showDrawer } = useContext(editor)
    const { title } = useContext(policy)

    const onEditDrawer = () => {
        showDrawer(DrawerName.editPolicy, {
            policyTitle: title
        })
    }
    return <BasicButton title="Edit Policy" onClick={onEditDrawer} />
}