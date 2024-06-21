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
              "conic-gradient(from 180deg at 50% 49.9%, #08CC64 8.704102858901024deg, #17E879 90deg, #08CC64 160.429208278656deg, #08CC64 176.39445662498474deg, #09D669 193.76951694488525deg, #77FF6E 299.3333888053894deg, #31DF67 317.59665727615356deg, #08CC64 335.3943371772766deg, #00C566 350.5913472175598deg)",
          }}
        />
        <span className="absolute left-0 w-full -bottom-6 text-xs text-center text-neutral-400">
          Web
        </span>
      </div>
    </DemoBox>
  )
}

export default Demo
