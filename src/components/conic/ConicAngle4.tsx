import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-6 p-8 overflow-hidden flex-col sm:flex-row">
      <div className="flex-none relative w-48 h-48 rounded-lg overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-48 scale-x-[4]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #08CC64 0deg, #17E879 32deg, #08CC64 58deg, #08CC64 79deg, #09D669 126deg, #77FF6E 187deg, #31DF67 223.2deg, #08CC64 259deg, #00B85F 324deg, #08CC64 360deg)",
          }}
        />
      </div>
      <img
        className="flex-1 min-w-0 rounded-lg object-cover mix-blend-darken"
        src="https://wxa.wxs.qq.com/wxad-design/yijie/conic-figma-1.webp"
      />
    </DemoBox>
  )
}

export default Demo
