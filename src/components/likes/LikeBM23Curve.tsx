import DemoBox from "@/components/DemoBox"

const Demo = (props: {}) => {
  return (
    <DemoBox className="py-4 text-center">
      <img
        className="m-auto w-1/3 min-w-[200px] overflow-hidden rounded-xl mix-blend-multiply grayscale"
        src="https://wxa.wxs.qq.com/wxad-design/yijie/2023-bmy-detail.webp"
        alt=""
      />
    </DemoBox>
  )
}

export default Demo
