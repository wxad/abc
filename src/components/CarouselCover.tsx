const CarouselCover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute inset-0 bg-[length:40px_40px] border border-gray-300 overflow-hidden rounded-full"
        style={{
          backgroundImage: "url(/grid.svg)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[225px] bg-neutral-200 border-solid border border-gray-400 rounded-[10px] shadow-sm" />
        <div className="absolute top-[24.5%] left-[78%] transform rotate-[10deg] w-[150px] h-[225px] rounded-[10px] shadow-sm" />
        <div className="absolute top-[24.5%] right-[78%] transform rotate-[-10deg] w-[150px] h-[225px] rounded-[10px] shadow-sm" />
      </div>
    </div>
  )
}

export default CarouselCover
