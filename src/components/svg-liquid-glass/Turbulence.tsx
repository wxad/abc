import DemoBox from "@/components/DemoBox"
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Pane } from "tweakpane"

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  const position = useMotionValue(0)
  const isInView = useInView(ref)
  const backgroundPosition = useTransform(position, (v) => `center ${v}%`)

  useAnimationFrame((_, delta) => {
    if (!isInView) return
    let newPosition = position.get() + (delta / 16000 / 2) * 900
    if (newPosition > 900) {
      newPosition = newPosition - 900
    }
    position.set(newPosition)
  })

  const paneWrapper = useRef<HTMLDivElement>(null)
  const paneRef = useRef<Pane | null>(null)
  const [params, setParams] = useState({
    scale: 50,
    frequency: 0.008,
  })

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

    paneRef.current.addBlade({
      view: "slider",
      label: "scale",
      min: 0,
      max: 100,
      value: 50,
    })

    paneRef.current.addBlade({
      view: "slider",
      label: "frequency",
      min: 0,
      max: 0.02,
      value: 0.008,
      step: 0.001,
    })

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  return (
    <DemoBox className="overflow-hidden">
      <div ref={paneWrapper} className="absolute top-1 right-1" />
      <motion.div
        ref={ref}
        className="h-[400px]"
        style={{
          backgroundImage:
            "url(https://wxa.wxs.qq.com/wxad-design/yijie/glass-demo.jpg)",
          backgroundSize: "300px auto",
          backgroundPosition,
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-36 rounded-2xl">
          <svg width="0" height="0" className="absolute overflow-hidden">
            <defs>
              <filter
                id="turbulence-filter"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={`${params.frequency} ${params.frequency}`}
                  numOctaves="2"
                  seed="92"
                  result="noise"
                />
                <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="blur"
                  scale={params.scale}
                  xChannelSelector="R"
                  yChannelSelector="G"
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
            className="absolute-full rounded-2xl cursor-grab active:cursor-grabbing"
          >
            <div
              className="absolute-full rounded-2xl"
              style={{
                filter: "url(#turbulence-filter)",
                backdropFilter: "blur(0px)",
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
        </div>
      </motion.div>
    </DemoBox>
  )
}

export default Demo
