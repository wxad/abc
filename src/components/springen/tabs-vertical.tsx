import DemoBox from "../DemoBox"
import Tabs from "./Tabs"
import { useRef, useState } from "react"

const Demo = () => {
  const [value, setValue] = useState("1")
  const scrollContainer = useRef<HTMLDivElement>(null)
  const handleScroll = () => {
    if (!scrollContainer.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current
    const scrollTopPercent = scrollTop / (scrollHeight - clientHeight)
    if (scrollTopPercent < 0.33) {
      setValue("1")
    } else if (scrollTopPercent < 0.66) {
      setValue("2")
    } else {
      setValue("3")
    }
  }

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm">
      <div
        className="relative w-[350px] h-[200px] overflow-y-auto scrollbar-custom"
        ref={scrollContainer}
        onScroll={handleScroll}
      >
        <Tabs.Vertical
          className="left-2 top-2"
          style={{
            position: "sticky",
          }}
          items={[
            { value: "1", label: "全部视频" },
            { value: "2", label: "个人视频" },
            { value: "3", label: "互选视频" },
          ]}
          value={value}
          onChange={(e, value) => {
            setValue(value)
          }}
        />
        <div className="h-[300px]" />
      </div>
    </DemoBox>
  )
}

export default Demo
