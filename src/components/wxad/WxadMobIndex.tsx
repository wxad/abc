import DemoBox from "@/components/DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex flex-col items-center py-8 overflow-hidden">
      <img
        className="w-[240px] max-w-full"
        src="https://wxa.wxs.qq.com/wxad-design/yijie/wxad-con.gif"
        loading="lazy"
        style={{
          clipPath: "inset(1px round 12px)",
        }}
      />
    </DemoBox>
  )
}

export default Demo
