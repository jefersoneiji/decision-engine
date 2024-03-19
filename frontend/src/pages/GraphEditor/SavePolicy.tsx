import { useContext } from "react"
import { useReactFlow } from "reactflow"
import { BasicButton } from "@src/components/BasicButton"
import { savePolicy, updatePolicy } from "@src/api/policies"

import { policy } from "./Policy"

export const SavePolicy = () => {
    const { toObject } = useReactFlow()
    const { title, isEditing, setIsEditing, id } = useContext(policy)

    const onSave = () => {
        if (isEditing) {
            updatePolicy(id, { ...toObject(), id, title })
            setIsEditing(false)
            return;
        }
        savePolicy({ ...toObject(), title })
        location.reload()
    }

    return <BasicButton title="Save Policy" onClick={onSave} />
}