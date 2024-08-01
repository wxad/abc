import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm text-neutral-400">
      <div className="flex flex-1 flex-col items-center gap-2 max-w-40">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/ios-stage-1.webp"
          loading="lazy"
        />
        1
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 max-w-40">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/ios-stage-2.webp"
          loading="lazy"
        />
        2
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 max-w-40">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/ios-stage-3.webp"
          loading="lazy"
        />
        3
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 max-w-40">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/ios-stage-4.webp"
          loading="lazy"
        />
        4
      </div>
    </DemoBox>
  )
}

export default Demo
