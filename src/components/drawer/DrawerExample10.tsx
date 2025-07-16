import { useRef } from "react"
import { useDrag } from "@use-gesture/react"
import { animate, AnimationPlaybackControls } from "motion/react"
import DemoBox from "../DemoBox"

// 0 - 250 - 567

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
          handleChange(y + 250)
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
      <div className="relative w-[390px] h-[844px] overflow-hidden">
        <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute-full overflow-hidden origin-top">
            <img
              src="https://wxa.wxs.qq.com/wxad-design/yijie/ggwc-tester.png"
              alt=""
              className="absolute top-0 left-0 w-full cursor-pointer"
            />
            <div
              className="absolute-full bg-black/50 pointer-events-none"
              ref={maskRef}
            />
          </div>
          <div
            className="absolute bottom-0 left-0 w-full origin-bottom pb-[32px] bg-white rounded-t-xl"
            style={{
              transform: "translate3d(0, 250px, 0)",
            }}
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
              <div className="flex flex-col items-center pt-[72px] px-[55px]">
                <img
                  className="mb-3 w-14 h-14 rounded-md"
                  src="https://wxa.wxs.qq.com/wxad-design/yijie/pdd-logo.png"
                />
                <div className="mb-[10px] text-[17px] font-medium">拼多多</div>
                <div className="mb-5 text-[15px] text-neutral-500 line-clamp-2">
                  拼多多，社交新电商领导者，更懂消费者的手机购物APP。8亿用户在此拼团购物买菜
                </div>
                <div className="flex items-center justify-center w-[184px] h-12 text-[17px] text-white font-medium bg-[#07c160] rounded-lg">
                  去应用商店下载
                </div>
                <div className="mt-8 flex gap-3 whitespace-nowrap overflow-auto">
                  <img
                    className="w-[100px] rounded-lg"
                    src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/8e/8d/7e/8e8d7e40-042b-6578-f942-89f55eb0d854/1__U53cc_U5341_U4e00_U72c2_U6b22.jpg/460x0w.webp"
                  />
                  <img
                    className="w-[100px] rounded-lg"
                    src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/a2/27/4f/a2274f30-498f-bc2c-9716-ef19b3ff9eda/2__U795e_U5238_U6765_U88ad.jpg/460x0w.webp"
                  />
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
