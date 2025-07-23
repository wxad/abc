import DemoBox from "@/components/DemoBox"
import { Pane } from "tweakpane"

import {
  motion,
  useSpring,
  useVelocity,
  useScroll,
  useMotionValue,
  MotionValue,
  PanInfo,
  animate,
  AnimationPlaybackControls,
} from "motion/react"
import { useEffect, useImperativeHandle, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const oneLineHeight = 29

const Item = ({
  content,
  id,
  index,
  deg,
  className,
  style,
  rotateValueVelocity,
  ...others
}: {
  content: string
  id: number
  index: number
  deg: number
  className?: string
  style?: React.CSSProperties
  rotateValueVelocity: MotionValue<number>
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

  return (
    <div
      data-item
      data-item-current={id === 1}
      data-item-id={id}
      data-item-index={index}
      className={cn(
        "group absolute left-0 flex flex-col items-center justify-center w-[340px] h-[170px",
        className
      )}
      style={{
        top: "calc(50% - 170px / 2)",
        transform: `rotate(${deg}deg) translateZ(0)`,
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
        style={{
          // transform: finalTransform,
          transformOrigin: "80% 50%",
        }}
      >
        <div className="relative">
          <div
            className={cn(
              "absolute rotate-[-18deg] transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100 group-data-[item-current=true]:visible",
              lineNumber === 1 && "-top-[8px] -left-[27px] w-[10px] h-[50px]",
              lineNumber === 2 && "top-[3px] -left-[27px] w-[10px] h-[60px]",
              lineNumber === 3 && "top-[11px] -left-[27px] w-[10px] h-[70px]"
            )}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#00F58A]" />
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[#00F58A] tilt-n-move-shaking-animation" /> */}
          </div>
          <div
            className={cn(
              "absolute rotate-[12deg] transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100 group-data-[item-current=true]:visible",
              lineNumber === 1 &&
                "top-[-10.5px] -right-[27px] w-[10px] h-[55px]",
              lineNumber === 2 && "top-[1px] -right-[27px] w-[10px] h-[65px] ",
              lineNumber === 3 && "top-[8px] -right-[27px] w-[10px] h-[75px]"
            )}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#00F58A]" />
          </div>
          <div
            ref={contentRef}
            className="relative break-words mb-5 pl-1 max-w-[270px] text-[24px] text-center font-semibold text-black bg-transparent transition-all duration-[300ms] opacity-[0.06] group-data-[item-current=true]:opacity-100 flex-none"
            style={{
              lineHeight: `${oneLineHeight}px`,
              maxHeight: `${oneLineHeight * 3}px`,
            }}
          >
            {content}
            {/* {[...content].map((char, index) => (
            <span
              key={index}
              className="inline-block tilt-n-move-shaking-animation"
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))} */}
          </div>
          <div className="flex items-center justify-center gap-[9px] h-[25px] transition-all duration-[300ms] opacity-0 invisible group-data-[item-current=true]:opacity-100 group-data-[item-current=true]:visible">
            <div className="text-[20px] font-semibold text-[#808080]">
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
      </motion.div>
    </div>
  )
}

const Demo = ({}: {}) => {
  const texts = [
    "自强不息，厚德载物。祝微信广告十一周年生日快乐，越来越好。",
    "微广十一周年生日快乐",
    "超级喜欢和大家一起并肩作战的感觉！",
    "祝微信广告越来越好！",
  ]

  const rotateValue = useMotionValue(0)

  const rotateValueVelocity = useVelocity(rotateValue)

  const updateItemCurrent = () => {
    const items = [
      ...document.querySelectorAll("[data-item]"),
    ] as HTMLDivElement[]

    items.forEach((item) => {
      const id = item.getAttribute("data-item-id")
      // item.dataset.itemCurrent = Number(id) === currentCenterId.current ? "true" : "false"
    })
  }

  return (
    <DemoBox className="flex items-center justify-center h-[500px]">
      <div
        className="relative w-[340px] h-[170px]"
        style={
          {
            "--depth": 6,
            transformOrigin: "calc(50% * var(--depth)) 50%",
          } as React.CSSProperties
        }
      >
        {[...texts, ...texts, ...texts, ...texts, ...texts, ...texts].map(
          (text, index) => (
            <Item
              key={index}
              index={index}
              content={text}
              rotateValueVelocity={rotateValueVelocity}
              id={index + 1}
              deg={index * 15}
            />
          )
        )}
      </div>
    </DemoBox>
  )
}

export default Demo
