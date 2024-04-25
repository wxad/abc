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
        <div className="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 overflow-hidden mix-blend-darken grayscale">
          <video
            className="absolute-full"
            autoPlay
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            muted
            loop
          >
            <source
              src="https://wxa.wxs.qq.com/wxad-design/yijie/bm-24version-green-un.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute-full border-4 border-white" />
        </div>
      </div>
    </div>
  )
}

export default CarouselCover
