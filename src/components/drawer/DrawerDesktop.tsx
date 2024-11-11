import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"
import { cn } from "@/lib/utils"

const Demo = () => {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setExpanded((bool) => !bool)
    }, 2000)
  }, [])

  return (
    <DemoBox className="-mx-48 overflow-hidden border-0 rounded-none">
      <div className="bg-black">
        <img
          className={cn(
            "block w-full aspect-[18/9] object-cover origin-left transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
            expanded ? "translate-x-[8px] scale-[0.97] rounded-lg" : ""
          )}
          src="https://wxa.wxs.qq.com/wxad-design/yijie/zhibo-tester-1.png"
          alt=""
        />
        <div
          className={cn(
            "absolute right-0 top-0 w-full h-full bg-black bg-opacity-55 transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
            expanded ? "opacity-100" : "opacity-0"
          )}
        />
        <img
          className={cn(
            "absolute right-0 top-0 w-[91%] h-full object-cover rounded-l-md duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
            expanded ? "translate-x-0" : "translate-x-full"
          )}
          src="https://wxa.wxs.qq.com/wxad-design/yijie/drawer-example-table.png"
          alt=""
        />
      </div>
    </DemoBox>
  )
}

export default Demo
