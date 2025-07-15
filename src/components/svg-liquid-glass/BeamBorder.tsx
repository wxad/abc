import DemoBox from "@/components/DemoBox"
import { useRef } from "react"
import { motion, useInView, useMotionValue, useTransform } from "motion/react"
import { useAnimationFrame } from "motion/react"

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  const position = useMotionValue(0)
  const isInView = useInView(ref)
  const start = useTransform(position, (v) => v * 5)

  useAnimationFrame((_, delta) => {
    if (!isInView) return
    let newPosition = position.get() + (delta / 16000 / 3) * 900
    if (newPosition > 900) {
      newPosition = newPosition - 900
    }
    position.set(newPosition)
  })

  return (
    <DemoBox ref={ref}>
      <motion.div className="flex items-center justify-center py-10 gap-4 bg-black">
        <div className="flex relative p-1 rounded-2xl border border-solid border-white border-opacity-30">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={
              {
                "--start": start,
                "--repeating-conic-gradient-times": 5,
                "--gradient":
                  "repeating-conic-gradient(from 236.84deg at 50% 50%, #fff, #fff calc(25% / var(--repeating-conic-gradient-times)))",
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 blur-[2px]">
              <div
                className="absolute rounded-2xl inset-[-1px] border border-solid border-transparent bg-fixed"
                style={
                  {
                    "--spread": 64,
                    background: "var(--gradient)",
                    mask: "linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg))",
                    maskClip: "padding-box, border-box",
                    maskComposite: "intersect",
                  } as React.CSSProperties
                }
              />
            </div>
            <div
              className="absolute rounded-2xl inset-[-1px] border border-solid border-transparent bg-fixed"
              style={
                {
                  "--spread": 32,
                  background: "var(--gradient)",
                  mask: "linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg))",
                  maskClip: "padding-box, border-box",
                  maskComposite: "intersect",
                } as React.CSSProperties
              }
            />
          </motion.div>
          <div className="rounded-xl size-36 bg-neutral-900" />
        </div>
        <div className="flex relative p-1 rounded-2xl border border-solid border-white border-opacity-30">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={
              {
                "--start": start,
                "--repeating-conic-gradient-times": 5,
                "--gradient":
                  "repeating-conic-gradient(from 236.84deg at 50% 50%, #fff, #fff calc(25% / var(--repeating-conic-gradient-times)))",
              } as React.CSSProperties
            }
          >
            <div
              className="absolute rounded-2xl inset-[-1px] border border-solid border-transparent bg-fixed"
              style={
                {
                  "--spread": 64,
                  background:
                    "linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg))",
                  backgroundClip: "padding-box",
                } as React.CSSProperties
              }
            />
          </motion.div>
          <div className="rounded-xl size-36" />
        </div>
      </motion.div>
    </DemoBox>
  )
}

export default Demo
