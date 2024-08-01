import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm text-neutral-400">
      <div className="flex flex-1 flex-col items-center gap-2 max-w-52">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/ios-video-2-slow.gif"
          loading="lazy"
        />
      </div>
    </DemoBox>
  )
}

export default Demo
