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
            <div className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-12 opacity-0"}`}
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    X
                </button>
                {children}
            </div>
        </div>
    )
}
