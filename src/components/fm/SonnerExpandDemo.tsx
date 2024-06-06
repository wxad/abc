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
      items[1].style.transform = "translate3d(0, 85px, 0) scale(1)"
      items[0].style.transform = "translate3d(0, 170px, 0) scale(1)"

      setTimeout(() => {
        items[1].style.transform = "translate3d(0, 14px, 0) scale(0.95)"
        items[0].style.transform = "translate3d(0, 28px, 0) scale(0.9)"
      }, 2000)
    }, 4000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="flex justify-center pt-8 pb-48">
      <div className="w-80 h-20" ref={containerRef}>
        <Item style={{ transform: "translate3d(0, 28px, 0) scale(0.9)" }} />
        <Item style={{ transform: "translate3d(0, 14px, 0) scale(0.95)" }} />
        <Item />
      </div>
    </DemoBox>
  )
}

export default Demo
