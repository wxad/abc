import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm text-neutral-400">
      <div className="flex flex-1 flex-col items-center gap-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2020-openning.gif"
          loading="lazy"
        />
        进入欢迎页
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2020-vote.gif"
          loading="lazy"
        />
        参与投票
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2020-cards.gif"
          loading="lazy"
        />
        生成评委卡
      </div>
    </DemoBox>
  )
}

export default Demo
