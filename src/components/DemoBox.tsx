const DemoBox: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  return (
    <div
      className="relative mt-4 mb-8 bg-[length:40px_40px] border border-gray-300 rounded-md overflow-auto"
      style={{
        backgroundImage: "url(/abc/grid.svg)",
      }}
    >
      {children}
    </div>
  )
}

export default DemoBox
