import DemoBox from "@/components/DemoBox"
import { cn } from "@/lib/utils"
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(0)
  const latestStep = useRef(0)
  useEffect(() => {
    latestStep.current = step
  }, [step])
  const position = useMotionValue(0)
  const isInView = useInView(ref)
  const backgroundPosition = useTransform(position, (v) => `center ${v}%`)

  useAnimationFrame((_, delta) => {
    if (!isInView) return
    let newPosition = position.get() + (delta / 16000 / 3) * 900
    if (newPosition > 900) {
      newPosition = newPosition - 900
    }
    position.set(newPosition)
  })

  const lastTimestamp = useRef(0)
  const stepDuration = useRef(3000) // 设定每个步骤的持续时间（毫秒）

  useAnimationFrame((timestamp) => {
    if (!isInView) return

    // 计算从上一次更新时间到当前的时间差
    const deltaTime = timestamp - lastTimestamp.current

    if (deltaTime >= stepDuration.current) {
      let newStep = latestStep.current + 1

      // 重置 step 为 0 当其大于 3
      if (newStep > 3) {
        newStep = 0
      }

      setStep(newStep)
      lastTimestamp.current = timestamp // 更新上次更新时间
    }
  })

  let mapHref =
    "data:image/svg+xml,%3Csvg%20class%3D%22displacement-image%22%20viewBox%3D%220%200%20144%20144%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22red%22%20x1%3D%22100%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22red%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22blue%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22blue%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3C!--%20backdrop%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20red%20linear%20--%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20%3C!--%20blue%20linear%20--%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20%3C!--%20block%20out%20distortion%20--%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E"

  if (step === 1) {
    mapHref =
      "data:image/svg+xml,%3Csvg%20class%3D%22displacement-image%22%20viewBox%3D%220%200%20144%20144%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22red%22%20x1%3D%22100%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22red%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22blue%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22blue%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3C!--%20backdrop%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20red%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20rx%3D%2216%22%20fill%3D%22url(%23red)%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20blue%20linear%20--%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20%3C!--%20block%20out%20distortion%20--%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E"
  } else if (step === 2) {
    mapHref =
      "data:image/svg+xml,%3Csvg%20class%3D%22displacement-image%22%20viewBox%3D%220%200%20144%20144%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22red%22%20x1%3D%22100%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22red%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22blue%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22blue%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3C!--%20backdrop%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20red%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20rx%3D%2216%22%20fill%3D%22url(%23red)%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20blue%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20rx%3D%2216%22%20fill%3D%22url(%23blue)%22%20style%3D%22mix-blend-mode%3A%20difference%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20block%20out%20distortion%20--%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fsvg%3E"
  } else if (step === 3) {
    mapHref =
      "data:image/svg+xml,%3Csvg%20class%3D%22displacement-image%22%20viewBox%3D%220%200%20144%20144%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22red%22%20x1%3D%22100%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22red%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22blue%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22blue%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3C!--%20backdrop%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20red%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20rx%3D%2216%22%20fill%3D%22url(%23red)%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20blue%20linear%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22144%22%20height%3D%22144%22%20rx%3D%2216%22%20fill%3D%22url(%23blue)%22%20style%3D%22mix-blend-mode%3A%20difference%22%2F%3E%0A%20%20%20%20%20%20%3C!--%20block%20out%20distortion%20--%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%225.040000000000001%22%20y%3D%225.040000000000001%22%20width%3D%22133.92%22%20height%3D%22133.92%22%20rx%3D%2216%22%20fill%3D%22hsl(0%200%25%2050%25%20%2F%200.93%22%20style%3D%22filter%3Ablur(11px)%22%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E"
  }

  return (
    <DemoBox className="flex overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 items-center justify-center text-xs text-neutral-500">
        <div className="relative size-36 rounded-2xl overflow-hidden">
          <div className="absolute-full bg-black" />
          <div
            className={cn(
              "absolute-full bg-linear-to-r from-[#ff0000] to-transparent transition-all duration-500 opacity-0",
              step > 0 && "opacity-100"
            )}
          />
          <div
            className={cn(
              "absolute-full bg-linear-to-tl from-[#0000ff] to-transparent transition-all duration-500 opacity-0",
              step > 1 && "opacity-100"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 m-auto size-[134px] bg-[#7f7f7f] rounded-xl blur-sm transition-all duration-500 opacity-0",
              step > 2 && "opacity-100"
            )}
          />
        </div>
        <motion.div layout>
          <motion.span className="inline-block" layout>
            黑
          </motion.span>
          {step > 0 && (
            <motion.span layout className="inline-block">
              &nbsp;+ 红
            </motion.span>
          )}
          {step > 1 && (
            <motion.span layout className="inline-block">
              &nbsp;+ 蓝
            </motion.span>
          )}
          {step > 2 && (
            <motion.span layout className="inline-block">
              &nbsp;+ 灰
            </motion.span>
          )}
        </motion.div>
      </div>
      <motion.div
        ref={ref}
        className="flex-1 flex items-center justify-center gap-4 flex-col h-[400px] text-xs text-white"
        style={{
          backgroundImage:
            "url(https://wxa.wxs.qq.com/wxad-design/yijie/glass-demo.jpg)",
          backgroundSize: "300px auto",
          backgroundPosition,
        }}
      >
        <svg className="touch-none size-0 invisible" viewBox="0 0 144 144">
          <defs className="touch-none">
            <filter
              id="displacement-filter-demo-1"
              colorInterpolationFilters="sRGB"
              className="touch-none"
            >
              <feImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                result="map"
                href={mapHref}
                className="touch-none"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                id="redchannel"
                xChannelSelector="R"
                yChannelSelector="B"
                result="dispRed"
                scale="-50"
                className="touch-none"
              />
              <feGaussianBlur
                in="output"
                stdDeviation="0.2"
                className="touch-none"
              />
            </filter>
          </defs>
        </svg>
        <motion.div
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          dragElastic={1}
          className="flex-none relative size-36 rounded-2xl cursor-grab active:cursor-grabbing"
        >
          <div
            className="absolute-full rounded-2xl"
            style={{
              filter: "url(#displacement-filter-demo-1)",
              backdropFilter: "blur(0.25px) contrast(1.1) brightness(1.05) saturate(1.1)",
            }}
          />
          <div
            className="absolute-full rounded-2xl"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 4px 8px, rgba(0, 0, 0, 0.15) 0px -10px 25px inset, rgba(255, 255, 255, 0.74) 0px -1px 4px 1px inset",
            }}
          />
        </motion.div>
        <motion.div
          layout
          style={{
            textShadow: "0 0 2px #000",
          }}
        >
          <motion.span className="inline-block" layout>
            黑
          </motion.span>
          {step > 0 && (
            <motion.span layout className="inline-block">
              &nbsp;+ 红
            </motion.span>
          )}
          {step > 1 && (
            <motion.span layout className="inline-block">
              &nbsp;+ 蓝
            </motion.span>
          )}
          {step > 2 && (
            <motion.span layout className="inline-block">
              &nbsp;+ 灰
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </DemoBox>
  )
}

export default Demo
