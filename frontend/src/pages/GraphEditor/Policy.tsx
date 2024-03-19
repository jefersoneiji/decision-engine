import { PropsWithChildren, createContext, useState } from "react";

type Policy = {
    id: string;
    setId: (id: string)=> void;
    title: string;
    setTitle: (title: string) => void;
    isEditing: boolean;
    setIsEditing: (input: boolean) => void;
}
export const policy = createContext({} as Policy)

export function PolicyProvider({ children }: PropsWithChildren) {
    const [title, setTitle] = useState('Untitled')
    const [id, setId] = useState('0')
    const [isEditing, setIsEditing] = useState(false)
    
    return (
        <policy.Provider
            value={{
                title,
                setTitle,
                id,
                setId,
                isEditing,
                setIsEditing
            }}
        >
            {children}
        </policy.Provider>
    )
}