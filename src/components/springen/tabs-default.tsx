import DemoBox from "../DemoBox"
import Tabs from "./Tabs"
import { useEffect, useState } from "react"

const Demo = () => {
  const [value, setValue] = useState("all")

  useEffect(() => {
    const interval = setInterval(() => {
      if (value === "all") {
        setValue("personal")
      } else if (value === "personal") {
        setValue("mutual")
      } else {
        setValue("all")
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [value])

  return (
    <DemoBox className="flex flex-col justify-center items-center gap-10 p-10 text-sm">
      <Tabs.Default
        items={[
          { value: "all", label: "全部视频" },
          { value: "personal", label: "个人视频" },
          { value: "mutual", label: "互选视频" },
        ]}
        value={value}
        onChange={(e, value) => setValue(value)}
      />

      <Tabs.ButtonGroup
        items={[
          { value: "all", label: "全部视频" },
          { value: "personal", label: "个人视频" },
          { value: "mutual", label: "互选视频" },
        ]}
        value={value}
        onChange={(e, value) => setValue(value)}
      />

      <Tabs.Divider
        items={[
          { value: "all", label: "全部视频" },
          { value: "personal", label: "个人视频" },
          { value: "mutual", label: "互选视频" },
        ]}
        value={value}
        onChange={(e, value) => setValue(value)}
      />

      <Tabs.Tag
        items={[
          { value: "all", label: "全部视频" },
          { value: "personal", label: "个人视频" },
          { value: "mutual", label: "互选视频" },
        ]}
        value={value}
        onChange={(e, value) => setValue(value)}
      />
    </DemoBox>
  )
}

export default Demo
