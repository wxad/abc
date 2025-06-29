const Cover = () => {
  return (
    <div className="relative rounded-full overflow-hidden">
      <div className="pt-[100%]" />
      <img
        src="https://wxa.wxs.qq.com/wxad-design/yijie/quality-of-ui.webp"
        className="absolute-full object-cover bg-black scale-[1.2] grayscale mix-blend-hard-light"
        loading="lazy"
        alt="cover"
      />
    </div>
  )
}

export default Cover
