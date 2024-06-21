import DemoBox from "../DemoBox"
import { useIntersectionObserver } from "react-intersection-observer-hook"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion"

const Demo = () => {
  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting
  const rotate = useMotionValue(0)
  const background = useTransform(
    rotate,
    [0, 360],
    [
      "conic-gradient(from 0deg at 50% 50%, #08CC64 0deg, #17E879 32deg, #08CC64 58deg, #08CC64 79deg, #09D669 126deg, #77FF6E 187deg, #31DF67 223.2deg, #08CC64 259deg, #00B85F 324deg, #08CC64 360deg)",
      "conic-gradient(from 360deg at 50% 50%, #08CC64 0deg, #17E879 32deg, #08CC64 58deg, #08CC64 79deg, #09D669 126deg, #77FF6E 187deg, #31DF67 223.2deg, #08CC64 259deg, #00B85F 324deg, #08CC64 360deg)",
    ],
    {
      clamp: false,
    }
  )

  useAnimationFrame((_, delta) => {
    let newRotate = rotate.get() + (delta / 16000) * 360
    if (newRotate > 360) {
      newRotate = newRotate - 360
    }
    rotate.set(newRotate)
  })

  return (
    <DemoBox
      ref={ref}
      className="flex justify-center items-center gap-12 pt-8 pb-12 overflow-hidden flex-col sm:flex-row"
    >
      <div className="flex-none relative w-48 h-48">
        <div className="absolute-full rounded-lg overflow-hidden">
          <motion.div
            className="absolute-full"
            style={{ rotate: inView ? rotate : undefined }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-48 scale-x-[6] scale-y-[1.5]"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, #08CC64 0deg, #17E879 32deg, #08CC64 58deg, #08CC64 79deg, #09D669 126deg, #77FF6E 187deg, #31DF67 223.2deg, #08CC64 259deg, #00B85F 324deg, #08CC64 360deg)",
              }}
            />
          </motion.div>
        </div>
        <span className="absolute left-0 w-full -bottom-6 text-xs text-center text-neutral-400">
          rotate 动画 (js)
        </span>
      </div>
      <div className="flex-none relative w-48 h-48">
        <div className="absolute-full rounded-lg overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-48 scale-x-[4]"
            style={{
              background: inView ? background : undefined,
            }}
          />
        </div>
        <span className="absolute left-0 w-full -bottom-6 text-xs text-center text-neutral-400">
          deg 动画 (js)
        </span>
      </div>
    </DemoBox>
  )
}

export default Demo
