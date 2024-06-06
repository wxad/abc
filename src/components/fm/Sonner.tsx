import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { Toaster, toast } from "sonner"

const Demo = (props: {}) => {
  return (
    <DemoBox className="py-10">
      <Toaster position="top-center" />
      <div className="flex items-center justify-center gap-4 text-sm">
        <button
          className="py-2 px-4 text-white bg-black rounded-md"
          onClick={() => {
            toast("提示信息", {
              description: "这是一条提示信息。",
              action: {
                label: "撤销",
                onClick: () => console.log("Undo"),
              },
            })
          }}
        >
          给我一条提示
        </button>
      </div>
    </DemoBox>
  )
}

export default Demo
