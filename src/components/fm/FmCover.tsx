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
        <img src="https://wxa.wxs.qq.com/wxad-design/yijie/fm-cover.png" className="absolute-full mix-blend-darken" />
      </div>
    </div>
  )
}

export default Cover
