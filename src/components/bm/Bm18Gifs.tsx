import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm text-neutral-400">
      <div className="flex flex-1 flex-col items-center gap-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2018-openning-final-mute.gif"
          loading="lazy"
          alt="开场视频"
        />
        开场视频
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2018-vote.gif"
          loading="lazy"
          alt="参与投票"
        />
        参与投票
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2018-cards.gif"
          loading="lazy"
          alt="生成评委卡"
        />
        生成评委卡
      </div>
    </DemoBox>
  )
}

export default Demo
