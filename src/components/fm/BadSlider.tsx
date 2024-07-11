import DemoBox from "@/components/DemoBox"
import { useEffect, useRef, useState } from "react"

const Demo = () => {
  return (
    <DemoBox className="flex flex-col items-center pt-12 pb-2 overflow-hidden">
      <svg
        width="24"
        height="24"
        viewBox="0 0 18 18"
        className="-mb-4 fill-current text-neutral-400"
      >
        <path
          d="M10.1694 9.10876L12.4675 6.81066L11.4069 5.75L9.10876 8.0481L6.81066 5.75L5.75 6.81066L8.0481 9.10876L5.75 11.4069L6.81066 12.4675L9.10876 10.1694L11.4069 12.4675L12.4675 11.4069L10.1694 9.10876ZM9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16Z"
          fillRule="evenodd"
        />
      </svg>
      <img
        src="https://wxa.wxs.qq.com/wxad-design/yijie/bad-slider-11333.gif"
        className="block w-full outline -outline-offset-8 outline-8 outline-white overflow-hidden rounded-xl mix-blend-darken grayscale"
      />
    </DemoBox>
  )
}

export default Demo
