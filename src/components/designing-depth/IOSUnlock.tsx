import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 pt-4 text-sm text-neutral-400">
      <div className="flex flex-1 flex-col items-center gap-2 max-w-[500px] mix-blend-darken">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/ios-unlock.gif"
          loading="lazy"
        />
      </div>
    </DemoBox>
  )
}

export default Demo
