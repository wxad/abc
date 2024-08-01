import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 pt-4 text-sm text-neutral-400">
      <div className="flex flex-col items-center gap-2 w-80 mix-blend-darken">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/carousel-no-cho.gif"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center gap-2 w-80 mix-blend-darken">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/output-recent-design.gif"
          loading="lazy"
        />
      </div>
    </DemoBox>
  )
}

export default Demo
