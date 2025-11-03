import DemoBox from "@/components/DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex flex-col items-center py-8 overflow-hidden">
      <img
        className="w-[420px] max-w-[90%] mix-blend-multiply"
        src="https://wxa.wxs.qq.com/wxad-design/yijie/springen-chart-0-demo.gif"
        loading="lazy"
        style={{
          clipPath: "inset(1px round 12px)",
        }}
      />
    </DemoBox>
  )
}

export default Demo
