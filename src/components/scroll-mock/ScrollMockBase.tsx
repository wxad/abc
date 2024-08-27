import { useRef, useState } from "react"
import { Pane } from "tweakpane"
import { animate, AnimationPlaybackControls } from "framer-motion"
import { useDrag } from "@use-gesture/react"
import DemoBox from "../DemoBox"

const applyRubberBand = (x: number, edge: number, dimension: number) => {
  const c = 0.55; // 你可以调整这个值来改变橡皮筋的紧度
  return (1.0 - (1.0 / ((Math.abs(x - edge) * c / dimension) + 1.0))) * dimension * Math.sign(x - edge) + edge;
}

const Demo = () => {
  const scrollMax = 248
  const containerRef = useRef<HTMLDivElement>(null)
  const startTranslateX = useRef(0)
  const currentTranslateX = useRef(0)
  const animating = useRef(false)
  const animationRef = useRef<AnimationPlaybackControls | null>(null)
  const [status, setStatus] = useState("未开始滚动")

  const paneRef = useRef<Pane | null>(null)
  const paramsRef = useRef({

  })

  const bind = useDrag(
    ({ movement: [mx], down, velocity: [vx], first, direction: [dx] }) => {
      if (animating.current) {
        return
      }
      if (first) {
        startTranslateX.current = currentTranslateX.current
        animationRef.current?.stop()
      }

      if (down) {
        let finalX = startTranslateX.current + mx
        if (finalX > 0) {
          // finalX = 0 + (finalX - 0) * 0.35
          finalX = applyRubberBand(finalX, 0, scrollMax)
          setStatus("到达左边界，橡皮筋效果")
        } else if (finalX < -scrollMax) {
          // finalX = -scrollMax + (finalX + scrollMax) * 0.35
          finalX = applyRubberBand(finalX, -scrollMax, scrollMax)
          setStatus("到达右边界，橡皮筋效果")
        } else {
          setStatus("跟手滚动中")
        }
        currentTranslateX.current = finalX
        containerRef.current!.style.transform = `translate3d(${currentTranslateX.current}px, 0, 0)`
      } else {
        if (currentTranslateX.current > 0 || currentTranslateX.current < -scrollMax) {
          setStatus("从边界外拉回")
          animationRef.current?.stop()
          animationRef.current = animate(currentTranslateX.current, currentTranslateX.current > 0 ? 0 : -scrollMax, {
            type: "spring",
            stiffness: 200,
            damping: 40,
            onUpdate: (latest) => {
              currentTranslateX.current = latest
              containerRef.current!.style.transform = `translate3d(${latest}px, 0, 0)`
            },
            onComplete: () => {
              setStatus("未开始滚动")
            }
          })
        } else if (vx !== 0) {
          animationRef.current?.pause()
          animationRef.current = animate(
            currentTranslateX.current,
            vx * 1000 * 0.35 + currentTranslateX.current,
            {
              bounceDamping: 40,
              bounceStiffness: 200,
              max: 0,
              min: -scrollMax,
              restDelta: 0.01,
              restSpeed: 10,
              timeConstant: 750,
              type: "inertia",
              velocity: vx * 1000 * dx,
              onUpdate: (latest) => {
                setStatus("惯性滚动中")
                currentTranslateX.current = latest
                containerRef.current!.style.transform = `translate3d(${latest}px, 0, 0)`
              },
              onComplete: () => {
                setStatus("未开始滚动")
              }
            }
          )
        }
      }

    }, {
    filterTaps: true,
  })

  return (
    <DemoBox className="relative flex justify-center items-center px-4 pb-4 pt-24 text-sm text-neutral-700 font-medium">
      <div className="absolute top-9 left-1/2 -translate-x-1/2">状态：{status}</div>
      <div className="w-[300px] h-56 whitespace-nowrap overflow-hidden touch-none" {...bind()}>
        <div className="w-full h-full" ref={containerRef}>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="mr-3 last:mr-0 inline-flex items-center justify-center text-white w-32 h-full bg-neutral-900 rounded-lg">0{index}</div>
            ))
          }
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
