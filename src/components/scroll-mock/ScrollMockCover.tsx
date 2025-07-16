const Cover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div className="absolute inset-0 bg-size-[40px_40px] border border-neutral-300 overflow-hidden rounded-full">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/abc-depth-cover.webp"
          className="absolute-full object-contain mix-blend-hard-light grayscale"
          loading="lazy"
          alt="cover"
        />
      </div>
    </div>
  )
}

export default Cover
