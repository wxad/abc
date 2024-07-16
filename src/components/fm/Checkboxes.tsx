import DemoBox from "@/components/DemoBox"
import { useEffect, useRef } from "react"
import Checkbox from "./Checkbox"

const Demo = (props: {}) => {
  return (
    <DemoBox className="py-16 overflow-hidden">
      <div className="flex items-center justify-center gap-4 text-sm scale-110">
        <div className="font-medium text-neutral-600">未选中：</div>
        <Checkbox>常态</Checkbox>
        <Checkbox hover>悬停</Checkbox>
        <Checkbox hover active>
          悬停 + 长按
        </Checkbox>
      </div>
      <div className="mt-10 flex items-center justify-center gap-4 text-sm scale-110">
        <div className="font-medium text-neutral-600">已选中：</div>
        <Checkbox checked>常态</Checkbox>
        <Checkbox checked hover>
          悬停
        </Checkbox>
        <Checkbox checked hover active>
          悬停 + 长按
        </Checkbox>
      </div>
    </DemoBox>
  )
}

export default Demo
