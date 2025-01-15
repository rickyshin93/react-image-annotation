const CustomDoneButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg z-[300] font-bold pointer-events-auto hover:bg-blue-600 m-2"
      onClick={onClick}
    >
      Done
    </button>
  )
}

export { CustomDoneButton }
