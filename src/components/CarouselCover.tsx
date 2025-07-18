const CarouselCover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute inset-0 bg-size-[40px_40px] border border-neutral-300 overflow-hidden rounded-full"
        style={{
          backgroundImage: "url(/abc/grid.svg)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[150px] h-[225px] bg-neutral-200 border-dashed border border-neutral-400 rounded-[10px] shadow-xs font-mono text-neutral-600 text-sm">
          carousel
        </div>
        <div className="absolute top-1/2 left-1/2 transform translate-x-[70%] -translate-y-[43%] rotate-10 w-[150px] h-[225px] bg-neutral-200 border-dashed border border-neutral-400 rounded-[10px] shadow-xs" />
        <div className="absolute top-1/2 right-1/2 transform translate-x-[-70%] -translate-y-[43%] rotate-[-10deg] w-[150px] h-[225px] bg-neutral-200 border-dashed border border-neutral-400 rounded-[10px] shadow-xs" />
      </div>
    </div>
  )
}

export default CarouselCover
