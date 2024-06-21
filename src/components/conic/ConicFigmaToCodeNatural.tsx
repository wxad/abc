import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-12 pt-8 pb-12 overflow-hidden flex-col sm:flex-row">
      <div className="flex-none relative w-48 h-48">
        <div
          className="absolute-full rounded-lg overflow-hidden"
          style={{
            backgroundImage:
              "url(https://wxa.wxs.qq.com/wxad-design/yijie/conic-figma-2.webp)",
            backgroundSize: "100% 100%",
          }}
        />
        <span className="absolute left-0 w-full -bottom-6 text-xs text-center text-neutral-400">
          Figma
        </span>
      </div>
      <div className="flex-none relative w-48 h-48">
        <div
          className="absolute-full rounded-lg overflow-hidden"
          style={{
            background:
              "conic-gradient(from -173deg at 50% 50%, #08CC64 0deg, #17E879 83deg, #08CC64 155deg, #08CC64 169deg, #09D669 187deg, #77FF6E 292deg, #31DF67 310deg, #08CC64 328deg, #00C566 342deg, #08CC64 360deg)",
          }}
        />
        <span className="absolute left-0 w-full -bottom-6 text-xs text-center text-neutral-400">
          Web 头尾衔接自然
        </span>
      </div>
    </DemoBox>
  )
}

export default Demo
