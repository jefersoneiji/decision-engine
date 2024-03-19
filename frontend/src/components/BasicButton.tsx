type ButtonProps = {
    title: string;
    onClick: () => void;
}
export const BasicButton = ({ title, onClick }: ButtonProps) => {
    return (
        <button
            className="mb-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={onClick}
        >
            {title}
        </button>
    )
}