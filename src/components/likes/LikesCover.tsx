const CarouselCover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute inset-0 bg-[length:40px_40px] border border-neutral-300 overflow-hidden rounded-full"
        style={{
          backgroundImage: "url(/abc/grid.svg)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-10 w-[200px] h-0.5 bg-neutral-200 rounded-sm">
          <div
            className="absolute bottom-[20px] left-[-40px] w-[80px] h-[72px] touch-none select-none origin-bottom"
            style={{
              animation: "traildot 4s ease both infinite",
            }}
          >
            <div
              className="absolute-full origin-bottom"
              style={{
                backgroundImage:
                  "url(https://wxa.wxs.qq.com/wxad-design/yijie/bm-heart-huixin.webp)",
                backgroundSize: "100% 100%",
                filter: "grayscale(1)",
                opacity: 0.8,
                animation: "trailHeart 4s ease both infinite",
              }}
            />
          </div>
          <div
            className="absolute top-[-7px] left-[-8px] w-4 h-4 bg-neutral-300 border-2 border-white rounded-full touch-none"
            style={{
              animation: "traildot 4s ease both infinite",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CarouselCover
