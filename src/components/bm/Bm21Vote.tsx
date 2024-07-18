import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center py-8">
      <img
        className="block m-auto my-4 max-w-[300px] rounded-lg mix-blend-darken"
        src="https://wxa.wxs.qq.com/wxad-design/yijie/abc-bm-4.gif"
        loading="lazy"
        style={{
          clipPath: "inset(0 0 10% 0)",
        }}
      />
    </DemoBox>
  )
}

export default Demo
