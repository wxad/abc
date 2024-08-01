import DemoBox from "@/components/DemoBox"

const Demo = () => {
  return (
    <DemoBox className="py-10 text-center">
      <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
        <img
          className="w-1/3 outline -outline-offset-2 outline-2 outline-neutral-200 overflow-hidden rounded-xl"
          src="https://wxa.wxs.qq.com/wxad-design/yijie/chanel-light-demo.gif"
        />
        <img
          className="w-1/3 outline -outline-offset-2 outline-2 outline-neutral-200 overflow-hidden rounded-xl"
          src="https://wxa.wxs.qq.com/wxad-design/yijie/chanel-dark-demo.gif"
        />
      </div>
    </DemoBox>
  )
}

export default Demo
