import DemoBox from "@/components/DemoBox"
import { useDrag } from "@use-gesture/react"
import { useTrail } from "@react-spring/web"
import { useRef } from "react"

const Trail = ({ showHeart = false }: { showHeart?: boolean }) => {
  const startX = useRef(0)
  const translateX = useRef(0)
  const bottomX = useRef(0)
  const topX = useRef(0)
  const handleRef = useRef<HTMLDivElement>(null)
  const element1 = useRef<HTMLDivElement>(null)
  const element2 = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)

  const fast = { tension: 900, friction: 50 }
  const slow = { mass: 3, tension: 600, friction: 50 }

  const [, api]: any = useTrail(2, (i) => ({
    x: 0,
    config: i === 0 ? fast : slow,
    onChange(result) {
      if (i === 0) {
        bottomX.current = result.value.x
      } else {
        topX.current = result.value.x
        const y = 72

        let rotate =
          90 - (Math.atan2(y, topX.current - bottomX.current) * 180) / Math.PI
        rotate = rotate / 2.5

        element1.current.style.transform = `translate3d(${bottomX.current}px, 0, 0)`
        element2.current.style.transform = `translate3d(${topX.current}px, 0, 0)`

        if (heartRef.current) {
          heartRef.current.style.transform = `translate3d(${bottomX.current}px, 0, 0) rotate(${rotate}deg)`
        }
      }
    },
  }))

  const doUpdate = () => {
    if (handleRef.current) {
      handleRef.current.style.transform = `translate3d(${translateX.current}px, 0, 0)`
    }
  }

  const bindDrag = useDrag(({ movement: [x], down, first }) => {
    if (first) {
      startX.current = x - translateX.current
    }
    const delta = Math.min(260, Math.max(0, x - startX.current))
    api.start({ x: delta })
    translateX.current = delta
    doUpdate()
  })
  return (
    <DemoBox className="pt-36 pb-10 text-center">
      <div className="relative m-auto w-[260px] h-0.5 bg-neutral-200 rounded-sm">
        {showHeart && (
          <div
            className="absolute bottom-[20px] left-[-40px] w-[80px] h-[72px] touch-none select-none origin-bottom"
            style={{
              backgroundImage:
                "url(https://wxa.wxs.qq.com/wxad-design/yijie/bm-heart-huixin.webp)",
              backgroundSize: "100% 100%",
            }}
            ref={heartRef}
          />
        )}
        <div
          ref={element1}
          className={`absolute -left-3 -top-10 flex items-center justify-center w-6 h-6 text-white text-sm font-semibold bg-neutral-700 rounded-full ${
            showHeart ? "opacity-80" : ""
          }`}
        >
          1
        </div>
        <div
          ref={element2}
          className={`absolute -left-3 -top-24 flex items-center justify-center w-6 h-6 text-white text-sm font-semibold bg-neutral-700 rounded-full ${
            showHeart ? "opacity-80" : ""
          }`}
        >
          2
        </div>
        <div
          ref={handleRef}
          className="absolute top-[-7px] -left-2 w-4 h-4 bg-white border border-neutral-300 rounded-full cursor-grab hover:shadow-lg touch-none"
          // @ts-ignore
          {...bindDrag()}
        >
          <div className="absolute -top-4 -left-4 w-12 h-12" />
        </div>
      </div>
    </DemoBox>
  )
}

export default Trail
