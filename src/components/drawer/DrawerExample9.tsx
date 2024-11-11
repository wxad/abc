import { useRef } from "react"
import { useDrag } from "@use-gesture/react"
import { animate, AnimationPlaybackControls } from "framer-motion"
import DemoBox from "../DemoBox"

const applyRubberBand = (x: number, edge: number, dimension: number) => {
  const c = 0.55 // 你可以调整这个值来改变橡皮筋的紧度
  return (
    (1.0 - 1.0 / ((Math.abs(x - edge) * c) / dimension + 1.0)) *
      dimension *
      Math.sign(x - edge) +
    edge
  )
}

const Demo = () => {
  const currentTranslate = useRef(0)
  const maskRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationPlaybackControls | null>(null)

  const handleChange = (y: number) => {
    currentTranslate.current = y
    drawerRef.current!.style.transform = `translate3d(0, ${y}px, 0)`

    let opacity = "1"
    if (y > 0) {
      opacity = `${1 - y / 457}`
      maskRef.current!.style.opacity = opacity
    }
  }

  const bindDrag = useDrag(
    ({ down, movement: [, y], velocity: [, vy], direction: [_, dy] }) => {
      if (down) {
        if (y > 0) {
          handleChange(y)
        } else {
          handleChange(applyRubberBand(y, 0, 40))
        }
      } else {
        if (y <= 0) {
          animationRef.current?.stop()
          animationRef.current = animate(currentTranslate.current, 0, {
            type: "spring",
            stiffness: 170,
            damping: 26,
            onUpdate: (latest) => {
              handleChange(latest)
            },
          })
        } else {
          if (dy === -1) {
            animationRef.current = animate(currentTranslate.current, 0, {
              type: "spring",
              stiffness: 170,
              damping: 26,
              velocity: vy * 1000 * dy,
              onUpdate: (latest) => {
                handleChange(latest)
              },
            })
          } else if (vy < 0.2) {
            animationRef.current?.stop()
            animationRef.current = animate(
              currentTranslate.current,
              y > 50 ? 457 : 0,
              {
                type: "spring",
                stiffness: 170,
                damping: 26,
                onUpdate: (latest) => {
                  handleChange(latest)
                },
              }
            )
          } else if (vy > 0.2) {
            animationRef.current?.stop()
            animationRef.current = animate(currentTranslate.current, 457, {
              type: "spring",
              stiffness: 170,
              damping: 26,
              velocity: vy * 1000 * dy,
              onUpdate: (latest) => {
                handleChange(latest)
              },
            })
          }
        }
      }
    }
  )

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm">
      <div
        className="relative w-[404.8px] h-[820px] overflow-hidden"
        style={{
          backgroundSize: "cover",
          zoom: 0.85,
        }}
      >
        <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute-full overflow-hidden origin-top">
            <img
              src="https://wxa.wxs.qq.com/wxad-design/yijie/list-tester-1.png"
              alt=""
              className="absolute top-0 left-0 w-full cursor-pointer"
            />
            <div
              className="absolute-full bg-black bg-opacity-50 pointer-events-none"
              ref={maskRef}
            />
          </div>
          <div
            className="absolute bottom-0 left-0 w-full origin-bottom pb-[76px] bg-white rounded-t-xl"
            ref={drawerRef}
          >
            <div className="absolute top-full left-0 w-full h-full bg-white -translate-y-1" />
            <div className="relative">
              <div
                className="absolute z-1 top-0 left-0 w-full h-10 touch-none"
                // @ts-ignore
                {...bindDrag()}
              >
                <div className="absolute top-4 left-1/2 w-12 h-1.5 rounded-full bg-gray-300 -translate-x-1/2" />
              </div>
              <div className="px-6 top-0 left-0 w-full">
                <div className="mb-3 pt-12 text-[15px] font-medium">
                  期望发表日期
                </div>
                <div className="flex items-center">
                  <div className="flex-1 flex items-center justify-center h-[45px] text-[15px] text-black text-opacity-30 bg-[#F7F7F7] rounded-lg cursor-pointer">
                    开始日期
                  </div>
                  <div className="flex-none mx-2 w-2 h-[1px] bg-black" />
                  <div className="flex-1 flex items-center justify-center h-[45px] text-[15px] text-black text-opacity-30 bg-[#F7F7F7] rounded-lg cursor-pointer">
                    结束日期
                  </div>
                </div>
                <div className="mt-6 mb-3 text-[15px] font-medium">
                  订单状态
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["全部", "待接单", "待上传脚本", "脚本确认中"].map(
                    (o, i) => (
                      <div
                        className={`flex items-center justify-center h-[45px] text-[15px] rounded-lg ${
                          o === "全部"
                            ? "bg-[#FA9D3B] bg-opacity-10 text-[#FA9D3B] font-medium"
                            : "bg-[#F7F7F7]"
                        }`}
                        key={i}
                      >
                        {o}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pt-12 w-full bg-white">
                <div className="w-[120px] flex items-center justify-center h-[48px] text-[17px] rounded-lg bg-[#F7F7F7] font-medium cursor-pointer">
                  取消
                </div>
                <div className="w-[120px] flex items-center justify-center h-[48px] text-[17px] rounded-lg font-medium text-white bg-[#FA9D3B] cursor-pointer">
                  确定
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
