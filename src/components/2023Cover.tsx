const Cover2023 = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute inset-0 bg-[length:40px_40px] border border-gray-300 overflow-hidden rounded-full"
        style={{
          backgroundImage: "url(/abc/grid.svg)",
        }}
      >
        <img
          src="abc/triangle-2.png"
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-85%] w-[40%] h-[40%] mix-blend-darken"
        />
        <img
          src="abc/triangle-0.png"
          className="absolute top-1/2 left-1/2 translate-x-[-100%] translate-y-[-35%] w-[40%] h-[40%] mix-blend-darken"
        />
        <img
          src="abc/triangle-1.png"
          className="absolute top-1/2 left-1/2 translate-y-[-35%] w-[40%] h-[40%] mix-blend-darken"
        />
      </div>
    </div>
  )
}

export default Cover2023
