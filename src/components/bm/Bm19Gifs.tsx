import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm text-neutral-400">
      <div className="flex flex-1 flex-col items-center gap-2 max-w-64">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2019-vote-scene.gif"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 max-w-64">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2019-cards-choose.gif"
          loading="lazy"
        />
      </div>
    </DemoBox>
  )
}

export default Demo
