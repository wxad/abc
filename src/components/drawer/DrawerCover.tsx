const Cover = () => {
  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div
        className="absolute inset-0 bg-[length:40px_40px] border border-neutral-300 overflow-hidden rounded-full"
        style={{
          backgroundImage: "url(/abc/grid.svg)",
        }}
      >
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/Screen-studio-Z8NTDldAwq.gif"
          className="absolute-full object-contain mix-blend-darken grayscale scale-[1.23]"
          style={{
            background: "linear-gradient(#9f9f9f, #b9b9b9)",
          }}
          loading="lazy"
          alt="cover"
        />
      </div>
    </div>
  )
}

export default Cover
