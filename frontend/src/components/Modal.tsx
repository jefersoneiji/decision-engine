import { FC, PropsWithChildren } from "react";

type Modal = {
    open: boolean;
    onClose: () => void;
}
export const Modal: FC<Modal & PropsWithChildren> = ({ open, onClose, children }) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
            onClick={onClose}
        >
            <div className={`h-full max-h-64 w-full max-w-[40rem] bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-12 opacity-0"}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex flex-row justify-end">
                    <button onClick={onClose} className="mb-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                        x
                    </button>
                </div>
                <div className="max-h-48 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}
