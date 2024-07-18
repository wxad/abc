import DemoBox from "../DemoBox"

const Demo = () => {
  return (
    <DemoBox
      className="flex justify-center items-center py-2"
      style={{
        background: "#fff",
      }}
    >
      <img
        className="block m-auto my-4 w-40 max-w-full rounded-lg"
        src="https://wxa.wxs.qq.com/wxad-design/yijie/abc-bm-2.webp"
        loading="lazy"
      />
    </DemoBox>
  )
}

export default Demo
