export const PolicyTitle = ({ title }: { title: string }) => {
    return (
        <p className="bg-white text-gray-800 font-semibold py-2 px-4 border rounded shadow">
            Policy Name: {title}
        </p>
    )
}