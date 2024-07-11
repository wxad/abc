import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Select = ({ slow }: { slow?: boolean }) => {
  const [focused, setFocused] = useState(false)
  const timeout = useRef(0)

  useEffect(() => {
    timeout.current = window.setInterval(() => {
      setFocused((bool) => !bool)
    }, 1500)

    return () => {
      window.clearTimeout(timeout.current)
    }
  }, [])

  return (
    <div
      className={`relative w-[250px] h-[30px] text-xs bg-white rounded-md transition-all ${
        slow ? "duration-500" : "duration-300"
      }`}
      style={{
        boxShadow: focused
          ? "0 0 0 1px #000, 0 0 0 4px rgba(255, 255, 255, 0.75), 0 0 0 4px #000"
          : "0 0 0 1px rgba(0, 0, 0, 0.12)",
      }}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500">
        选择器 Select
      </div>
      <div
        className={`absolute left-0 w-full top-[calc(100%_+_8px)] text-xs leading-7 bg-white px-2 py-1 rounded-md transition-all ${
          slow ? "duration-500" : "duration-300"
        }`}
        style={{
          boxShadow:
            "0 0 0 1px rgba(219, 219, 219, 0.55), 0 3px 5px 0 rgba(0, 0, 0, 0.05), 0 6px 15px 0 rgba(0, 0, 0, 0.05)",
          opacity: focused ? 1 : 0,
          clipPath: focused
            ? "polygon(-20% 0,120% 0,120% 120%,-20% 120%)"
            : "polygon(-20% 0,120% 0,120% 0,-20% 0)",
        }}
      >
        <div>朋友圈</div>
        <div>视频号</div>
        <div>订阅号</div>
        <div>公众号</div>
      </div>
    </div>
  )
}

const Demo = () => {
  return (
    <DemoBox className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 pb-12 overflow-hidden">
      <div className="flex flex-col h-[200px] gap-4 items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 18 18"
          className="fill-current text-neutral-400"
        >
          <path
            d="M10.1694 9.10876L12.4675 6.81066L11.4069 5.75L9.10876 8.0481L6.81066 5.75L5.75 6.81066L8.0481 9.10876L5.75 11.4069L6.81066 12.4675L9.10876 10.1694L11.4069 12.4675L12.4675 11.4069L10.1694 9.10876ZM9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16Z"
            fillRule="evenodd"
          />
        </svg>
        <Select slow />
      </div>
      <div className="flex flex-col h-[200px] gap-4 items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 18 18"
          className="fill-current text-neutral-400"
        >
          <path
            d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.01041 10.3388L6.06586 8.39429L5.0052 9.45495L8.01041 12.4602L12.9602 7.51041L11.8995 6.44975L8.01041 10.3388Z"
            fillRule="evenodd"
          />
        </svg>
        <Select />
      </div>
    </DemoBox>
  )
}

export default Demo
