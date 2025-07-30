import { useEffect, useRef, useState } from "react"
import { Pane } from "tweakpane"
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useSpring,
} from "motion/react"
import DemoBox from "../DemoBox"

const Demo = ({
  width = 200,
  height = 200,
}: {
  width: number
  height: number
}) => {
  const imgs = [
    "https://wxa.wxs.qq.com/wxad-design/yijie/2023-bmy-mask.webp",
    "https://wxa.wxs.qq.com/wxad-design/yijie/adui-cover-3.webp",
    "https://wxa.wxs.qq.com/wxad-design/yijie/mfi-top.webp",
  ]

  const animateRef = useRef<AnimationPlaybackControls | null>(null)
  const currentX = useSpring(0, {
    visualDuration: 0.1,
    bounce: 0,
    restDelta: 0.001,
  })
  const startX = useRef(0)

  // 始终保持三张元素，然后根据 currentX 的值，计算出当前显示的元素，保证无限循环播放
  const [currentItems, setCurrentItems] = useState([
    {
      x: -width,
      img: imgs[imgs.length - 1],
      index: imgs.length - 1,
    },
    {
      x: 0,
      img: imgs[0],
      index: 0,
    },
    {
      x: width,
      img: imgs[1],
      index: 1,
    },
  ])

  const latestCurrentItems = useRef(currentItems)

  useEffect(() => {
    latestCurrentItems.current = currentItems
  }, [currentItems])

  currentX.on("change", (v) => {
    const currentCenterX = -Math.round(v / width) * width
    const currentCenterItem = latestCurrentItems.current.find(
      (item) => item.x === currentCenterX
    )

    if (!currentCenterItem) {
      return
    }

    const currentCenterIndex = currentCenterItem.index

    const imgsLength = imgs.length

    const newCurrentItems = [
      {
        x: currentCenterX - width,
        index: (currentCenterIndex - 1 + imgsLength) % imgsLength,
        img: imgs[(currentCenterIndex - 1 + imgsLength) % imgsLength],
      },
      {
        x: currentCenterX,
        index: currentCenterIndex,
        img: imgs[currentCenterIndex],
      },
      {
        x: currentCenterX + width,
        index: (currentCenterIndex + 1) % imgsLength,
        img: imgs[(currentCenterIndex + 1) % imgsLength],
      },
    ]

    const newItem = newCurrentItems.find(
      (item) =>
        !latestCurrentItems.current.find(
          (c) => c.index === item.index && c.x === item.x
        )
    )

    if (newItem) {
      setCurrentItems(newCurrentItems)
    }
  })

  return (
    <DemoBox className="relative flex justify-center items-center p-4 text-sm text-neutral-700 font-medium">
      <motion.div
        drag
        className="relative overflow-hidden"
        style={{
          width: width,
          height: height,
        }}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onDragStart={() => {
          if (animateRef.current) {
            animateRef.current.stop()
          }
          startX.current = currentX.get()
        }}
        onDrag={(_, info) => {
          // 20250722: motion@12.23.6 有 bug，onDrag 会触发于 onDragStart 之前
          // https://github.com/motiondivision/motion/issues/2345
          setTimeout(() => {
            const { offset } = info
            const { x } = offset
            currentX.set(startX.current + x)
          }, 0)
        }}
        onDragEnd={(_, info) => {
          const { x: vx } = info.velocity
          if (vx === 0) {
            const nearest = Math.round(currentX.get() / width) * width
            if (animateRef.current) {
              animateRef.current.stop()
            }
            animateRef.current = animate(currentX.get(), nearest, {
              type: "spring",
              visualDuration: 0.4,
              bounce: 0,
              restDelta: 0.01,
              onUpdate: (v) => {
                currentX.jump(v)
              },
            })
          } else {
            const to =
              vx > 0
                ? Math.ceil(currentX.get() / width) * width
                : Math.floor(currentX.get() / width) * width

            if (animateRef.current) {
              animateRef.current.stop()
            }

            animateRef.current = animate(currentX.get(), to, {
              type: "spring",
              visualDuration: 0.4,
              bounce: 0,
              restDelta: 0.01,
              velocity: Math.min(1500, Math.max(vx, -1500)),
              onUpdate: (v) => {
                currentX.jump(v)
              },
            })
          }
        }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            x: currentX,
          }}
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                x: item.x,
              }}
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={item.img}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-0 left-0">{currentX}</motion.div>
    </DemoBox>
  )
}

export default Demo
