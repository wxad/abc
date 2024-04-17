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
        <video
          className="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-1/2 outline -outline-offset-4 outline-4 outline-white overflow-hidden mix-blend-darken grayscale"
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
      </div>
    </div>
  )
}

export default CarouselCover
