import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { Toaster, toast } from "sonner"

const Item = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <section
      className="absolute flex items-center justify-between p-4 w-80 bg-white border border-neutral-200 shadow-md rounded-lg"
      style={style}
    >
      <div className="text-[13px] leading-[1.5]">
        <div className="mb-[2px] font-medium">提示信息</div>
        <div>这是一条提示信息。</div>
      </div>
      <div className="flex items-center justify-center w-10 h-6 text-xs text-white bg-black rounded-[4px]">
        撤销
      </div>
    </section>
  )
}

const Demo = (props: {}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const interval = useRef<number>(0)

  useEffect(() => {
    const items = [
      ...containerRef.current?.querySelectorAll("section"),
    ] as HTMLDivElement[]
    interval.current = window.setInterval(() => {
      items.forEach((item) => {
        item.style.transition = "0.6s ease all"
      })
      items[3].style.transform = "translate3d(0, 0, 0)"
      items[3].style.opacity = "1"
      items[2].style.transform = "translate3d(0, 14px, 0) scale(0.95)"
      items[1].style.transform = "translate3d(0, 28px, 0) scale(0.9)"
      items[0].style.transform = "translate3d(0, 42px, 0) scale(0.85)"
      items[0].style.opacity = "0"

      setTimeout(() => {
        items.forEach((item) => {
          item.style.transition = ""
        })
        items[3].style.transform = "translate3d(0, -100px, 0)"
        items[3].style.opacity = "0"
        items[2].style.transform = ""
        items[1].style.transform = "translate3d(0, 14px, 0) scale(0.95)"
        items[0].style.transform = "translate3d(0, 28px, 0) scale(0.9)"
        items[0].style.opacity = ""
      }, 1000)
    }, 2000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="flex justify-center pt-10 pb-16">
      <div className="w-80 h-20" ref={containerRef}>
        <Item style={{ transform: "translate3d(0, 28px, 0) scale(0.9)" }} />
        <Item style={{ transform: "translate3d(0, 14px, 0) scale(0.95)" }} />
        <Item />
        <Item
          style={{ transform: "translate3d(0, -100px, 0)", opacity: "0" }}
        />
      </div>
    </DemoBox>
  )
}

export default Demo
