import { BasicButton } from "@src/components/BasicButton"

export const ResetBoard = ()=>{
    const onResetBoard = () => {
        location.reload()
      }
    return <BasicButton title="Reset Board" onClick={onResetBoard}/> 
}