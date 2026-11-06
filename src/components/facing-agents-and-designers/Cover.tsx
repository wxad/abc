const Cover = () => {
  return (
    <div className="relative rounded-full overflow-hidden border border-neutral-300">
      <div className="pt-[100%]" />
      <video
        className="absolute-full object-cover"
        autoPlay
        preload="auto"
        x-webkit-airplay="true"
        webkit-playsinline="true"
        playsInline
        muted
        loop
      >
        <source
          src="https://wxa.wxs.qq.com/wxad-design/yijie/components-compressed.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}

export default Cover
