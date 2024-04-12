import DemoBox from "@/components/DemoBox"
import { A } from "../MdxComponents"

const Trail = (props: {}) => {
  return (
    <DemoBox className="py-10 text-center">
      <A href="https://codepen.io/aragakey">
        这是一个链接，仅支持鼠标体验(https://wxa.wxs.qq.com/wxad-design/yijie/trail-abc.webp)
      </A>
    </DemoBox>
  )
}

export default Trail
