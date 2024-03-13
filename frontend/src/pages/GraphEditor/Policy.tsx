import { PropsWithChildren, createContext, useState } from "react";

type Policy = {
    title: string;
    setTitle: (title: string) => void;
}
export const policy = createContext({} as Policy)

export function PolicyProvider({ children }: PropsWithChildren) {
    const [title, setTitle] = useState('Untitled')
    return (
        <policy.Provider value={{ title, setTitle }}>
            {children}
        </policy.Provider>
    )
}