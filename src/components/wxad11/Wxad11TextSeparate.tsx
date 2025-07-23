import DemoBox from "@/components/DemoBox"
import { Pane } from "tweakpane"

import {
  motion,
  useSpring,
  useMotionValue,
  MotionValue,
  animate,
  AnimationPlaybackControls,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const oneLineHeight = 29

const ItemSeparate = ({
  index,
  content,
  lineNumber,
  rotate: rotateProp,
  step,
}: {
  index: number
  content: string
  lineNumber: number
  rotate: MotionValue<number>
  step: number
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const charRef = useRef<HTMLSpanElement>(null)
  const [visualDuration, setVisualDuration] = useState(0)

  const rotate = useSpring(rotateProp, {
    visualDuration,
    bounce: 0,
    restDelta: 0.01,
  })

  useEffect(() => {
    if (charRef.current) {
      // 拿到 charRef.current 距离容器右边多少
      const rect = charRef.current.getBoundingClientRect()
      const wrapperRect = wrapperRef.current.getBoundingClientRect()
      const duration = 0.01 * (wrapperRect.right - rect.right) * step
      setVisualDuration(duration)
    }
  }, [charRef.current, step])

  return (
    <motion.div
      ref={wrapperRef}
      className={cn(
        "absolute-full flex flex-col items-center justify-center",
        lineNumber === 1 && "pt-[14px]"
      )}
      style={{
        rotate: step === 0 ? rotateProp : rotate,
        transformOrigin: "calc(50% * var(--depth)) 50%",
      }}
      key={index}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute rotate-[-18deg] transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100",
            index === 0 && "visible",
            lineNumber === 1 && "-top-[8px] -left-[27px] w-[10px] h-[50px]",
            lineNumber === 2 && "top-[3px] -left-[27px] w-[10px] h-[60px]",
            lineNumber === 3 && "top-[11px] -left-[27px] w-[10px] h-[70px]"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#00F58A]" />
        </div>
        <div
          className={cn(
            "absolute rotate-[12deg] transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100",
            index === content.length - 1 && "visible",
            lineNumber === 1 && "top-[-10.5px] -right-[27px] w-[10px] h-[55px]",
            lineNumber === 2 && "top-[1px] -right-[27px] w-[10px] h-[65px] ",
            lineNumber === 3 && "top-[8px] -right-[27px] w-[10px] h-[75px]"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#00F58A]" />
        </div>
        <div
          className="relative break-words mb-5 pl-1 max-w-[270px] text-[24px] text-center font-semibold text-black bg-transparent transition-all duration-[300ms] opacity-[0.06] group-data-[item-current=true]:opacity-100 flex-none"
          style={{
            lineHeight: `${oneLineHeight}px`,
            maxHeight: `${oneLineHeight * 3}px`,
          }}
        >
          {[...content].map((char, i) => (
            <span
              key={i}
              className={cn(
                "inline-block",
                i === index ? "opacity-100" : "opacity-0"
              )}
              ref={(el) => {
                if (el && i === index) {
                  charRef.current = el
                }
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <div
          className={
            index === Math.round((content.length - 1) / 2)
              ? "opacity-100"
              : "opacity-0"
          }
        >
          <div className="flex items-center justify-center gap-[9px] h-[25px] transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100 group-data-[item-current=true]:visible">
            <div className="text-[20px] font-medium text-[#808080]">
              Aragakey.
            </div>
          </div>
          <div
            className={cn(
              "relative flex items-center justify-center gap-0.5 mt-[14px] h-6 transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100 group-data-[item-current=true]:visible text-[#808080]"
            )}
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7341 6.07251C12.432 4.37533 15.1839 4.37592 16.8816 6.07349C18.5637 7.75555 18.5793 10.4727 16.9285 12.1741L16.9275 12.176L10.9705 18.134C10.6087 18.4959 10.039 18.5232 9.64526 18.217L9.63745 18.2102L9.55835 18.1409L9.55054 18.134V18.1331L3.59155 12.1741C1.94146 10.4724 1.95746 7.75545 3.6394 6.07349C5.33668 4.37621 8.0879 4.37539 9.78589 6.07153L10.1091 6.38696H10.1082L10.2595 6.53052L10.532 6.27173L10.7341 6.07251ZM15.824 6.91235C14.6425 5.84479 12.8182 5.88022 11.6794 7.0188L11.6785 7.02075L11.3416 7.34888L11.3396 7.35083L10.3757 8.26196L10.2605 8.37036L10.1453 8.26196L9.05835 7.23267L9.0564 7.23071L8.84253 7.01978L8.84155 7.0188C7.6661 5.84361 5.76007 5.84345 4.58472 7.0188C3.46138 8.14216 3.41125 9.93522 4.42847 11.1086L4.53979 11.2307L10.2595 16.9514L15.9705 11.2405C17.0719 10.1034 17.0981 8.31438 16.0554 7.14575L15.9363 7.0188L15.824 6.91235Z"
                fill="#808080"
                stroke="#808080"
                strokeWidth="0.334432"
              />
            </svg>
            <div>11</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Item = ({
  content,
  id,
  index,
  deg,
  className,
  style,
  rotate,
  step,
  ...others
}: {
  content: string
  id: number
  index: number
  deg: number
  className?: string
  style?: React.CSSProperties
  rotate: MotionValue<number>
  step: number
}) => {
  const [lineNumber, setLineNumber] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      const height = entry.contentRect.height
      const lineNumber = Math.floor(height / oneLineHeight)
      setLineNumber(lineNumber)
    })
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const [wrapperTransform, setWrapperTransform] = useState("")

  useEffect(() => {
    // 内部通过 getBoundingClientRect 计算每一个 char 距离容器右侧的值，这时候如果容器 rotate 了就会有问题，因此先不设置 rotate，
    // demo 中简单处理

    const timer = setTimeout(() => {
      setWrapperTransform(`rotate(${deg}deg) translateZ(0)`)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      data-item
      data-item-id={id}
      data-item-index={index}
      data-item-deg={-deg}
      className={cn(
        "group absolute left-0 flex flex-col items-center justify-center w-[340px] h-[170px]",
        className
      )}
      style={{
        top: "calc(50% - 170px / 2)",
        transform: wrapperTransform,
        transformOrigin: "calc(50% * var(--depth)) 50%",
        ...style,
      }}
      {...others}
    >
      <motion.div
        className={cn(
          "relative flex flex-col items-center justify-center w-full",
          lineNumber === 1 && "pt-[14px]"
        )}
      >
        <div className="relative">
          <div
            ref={contentRef}
            className="relative break-words mb-5 pl-1 max-w-[270px] text-[24px] text-center font-semibold text-black bg-transparent transition-all duration-[300ms] opacity-[0.06] group-data-[item-current=true]:opacity-100 flex-none"
            style={{
              lineHeight: `${oneLineHeight}px`,
              maxHeight: `${oneLineHeight * 3}px`,
            }}
          >
            {[...content].map((char, index) => (
              <span key={index} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <div className="h-[63px]" />
        </div>

        {[...content].map((_, index) => (
          <ItemSeparate
            key={index}
            index={index}
            content={content}
            lineNumber={lineNumber}
            rotate={rotate}
            step={step}
          />
        ))}
      </motion.div>
    </div>
  )
}

const Demo = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const textsSample = [
    "自强不息，厚德载物。祝微信广告十一周年生日快乐，越来越好。",
    "微广十一周年生日快乐",
    "超级喜欢和大家一起并肩作战的感觉！",
    "祝微信广告越来越好！",
  ]

  const texts = textsSample.concat(...Array(5).fill(textsSample))

  const rotateStart = useMotionValue(0)
  const rotateComplete = useRef(false)
  const rotate = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const animateRef = useRef<AnimationPlaybackControls | null>(null)

  const paneWrapper = useRef<HTMLDivElement | null>(null)
  const paneRef = useRef<Pane | null>(null)
  const [params, setParams] = useState({
    step: 0.07,
  })

  const handleDragComplete = (deg: number) => {
    const items = [
      ...wrapperRef.current!.querySelectorAll("[data-item]"),
    ] as HTMLDivElement[]

    items.forEach((item) => {
      const itemDeg = Number(item.getAttribute("data-item-deg"))
      item.dataset.itemCurrent = (itemDeg - deg) % 360 ? "false" : "true"
    })
  }

  useEffect(() => {
    handleDragComplete(rotate.get())
  }, [])

  useEffect(() => {
    paneRef.current = new Pane({
      container: paneWrapper.current,
    })

    paneRef.current.on("change", (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.label]: ev.value,
      }))
    })

    paneRef.current.addBinding(params, "step", {
      min: 0,
      max: 0.2,
      step: 0.01,
    })

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  return (
    <DemoBox ref={wrapperRef}>
      <div ref={paneWrapper} className="absolute top-1 right-1 z-1" />
      <div className="hidden md:flex absolute z-1 bottom-4 right-4 items-center gap-1 text-xs text-neutral-400 bg-white/10 backdrop-blur-[1px]">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.25 9a7.75 7.75 0 1 1 15.5 0v6a7.75 7.75 0 0 1-15.5 0zm7-6.205A6.251 6.251 0 0 0 5.75 9v6a6.25 6.25 0 1 0 12.5 0V9a6.251 6.251 0 0 0-5.5-6.205v3.583a2.25 2.25 0 0 1 1.5 2.122v2a2.25 2.25 0 0 1-4.5 0v-2c0-.98.626-1.813 1.5-2.122zM12 7.75a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75"
            clipRule="evenodd"
          />
        </svg>
        上下拖动体验
      </div>
      <div className="flex md:hidden absolute z-1 bottom-4 right-4 items-center gap-1 text-xs text-neutral-400 bg-white/10 backdrop-blur-[1px]">
        <svg className="w-4 h-4" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M196 88a27.86 27.86 0 0 0-13.35 3.39A28 28 0 0 0 144 74.7V44a28 28 0 0 0-56 0v80l-3.82-6.13A28 28 0 0 0 35.73 146l4.67 8.23C74.81 214.89 89.05 240 136 240a88.1 88.1 0 0 0 88-88v-36a28 28 0 0 0-28-28m12 64a72.08 72.08 0 0 1-72 72c-37.63 0-47.84-18-81.68-77.68l-4.69-8.27V138A12 12 0 0 1 54 121.61a11.9 11.9 0 0 1 6-1.6a12 12 0 0 1 10.41 6a2 2 0 0 0 .14.23l18.67 30A8 8 0 0 0 104 152V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0v-12a12 12 0 0 1 24 0v20a8 8 0 0 0 16 0v-4a12 12 0 0 1 24 0Z"
          />
        </svg>
        上下滑动体验
      </div>
      <motion.div
        className="flex items-center justify-center h-[450px] overflow-hidden select-none"
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onDragStart={() => {
          rotateComplete.current = false
          if (animateRef.current) {
            animateRef.current.stop()
          }
          rotateStart.set(rotate.get())
        }}
        onDragEnd={(_, info) => {
          const { y } = info.velocity
          const vy = -y
          if (vy === 0) {
            // 转到最靠近 360 / texts.length 的整数倍
            const nearest =
              Math.round(rotate.get() / (360 / texts.length)) *
              (360 / texts.length)
            if (animateRef.current) {
              animateRef.current.stop()
            }
            animateRef.current = animate(rotate.get(), nearest, {
              type: "spring",
              visualDuration: 0.4,
              bounce: 0,
              restDelta: 0.01,
              onUpdate: (v) => {
                rotate.jump(v)
                if (Math.abs(v - nearest) < 1 && !rotateComplete.current) {
                  rotateComplete.current = true
                  handleDragComplete(nearest)
                }
              },
            })
          } else {
            const to = rotate.get() + vy * 0.01 * 2
            const nearest =
              Math.round(to / (360 / texts.length)) * (360 / texts.length)
            if (animateRef.current) {
              animateRef.current.stop()
            }
            animateRef.current = animate(rotate.get(), nearest, {
              type: "spring",
              visualDuration: 0.4,
              bounce: 0,
              restDelta: 0.01,
              velocity: vy * 0.01,
              onUpdate: (v) => {
                rotate.jump(v)
                if (Math.abs(v - nearest) < 1 && !rotateComplete.current) {
                  rotateComplete.current = true
                  handleDragComplete(nearest)
                }
              },
            })
          }
        }}
        onDrag={(_, info) => {
          // 20250722: motion@12.23.6 有 bug，onDrag 会触发于 onDragStart 之前
          // https://github.com/motiondivision/motion/issues/2345
          setTimeout(() => {
            const { offset } = info
            const { y } = offset
            rotate.set(rotateStart.get() - y / 10)
          }, 0)
        }}
      >
        <motion.div
          className="relative w-[340px] h-[170px]"
          style={
            {
              "--depth": 6,
              transformOrigin: "calc(50% * var(--depth)) 50%",
            } as React.CSSProperties
          }
        >
          <div className="absolute-full scale-75">
            <motion.div
              className="absolute left-0 will-change-transform"
              style={{
                // rotate,
                top: "calc(340px * var(--depth) * -.5 + 170px / 2)",
                width: "calc(340px * var(--depth))",
                height: "calc(340px * var(--depth))",
              }}
            >
              {texts.map((text, index) => (
                <Item
                  key={index}
                  index={index}
                  content={text}
                  id={index + 1}
                  deg={index * 15}
                  rotate={rotate}
                  step={params.step}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </DemoBox>
  )
}

export default Demo
