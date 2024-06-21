import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-6 py-8 overflow-hidden flex-col sm:flex-row">
      <div
        className="w-48 h-48 rounded-lg"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #08CC64 0deg, #17E879 32deg, #08CC64 58deg, #08CC64 79deg, #09D669 126deg, #77FF6E 187deg, #31DF67 223.2deg, #08CC64 259deg, #00B85F 324deg, #08CC64 360deg)",
        }}
      />
      <div className="relative w-48 h-48 rounded-lg overflow-hidden">
        <img
          className="absolute-full object-cover mix-blend-darken"
          src="https://wxa.wxs.qq.com/wxad-design/yijie/conic-figma-0.webp"
        />
      </div>
    </DemoBox>
  )
}

export default Demo
