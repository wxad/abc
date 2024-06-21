import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useVelocity,
} from "framer-motion"
import { useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"
import DemoBox from "../DemoBox"

const Demo = () => {
  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting
  const rotate = useMotionValue(0)
  const velocityValue = useMotionValue(0)
  const velocityFactor = useVelocity(velocityValue)

  useAnimationFrame((_, delta) => {
    let newRotate =
      rotate.get() + (delta / 12000) * 360 + velocityFactor.get() / 4
    if (newRotate > 360) {
      newRotate = newRotate - 360
    }
    rotate.set(newRotate)
  })

  const handleSwitch = () => {
    animate(velocityValue, velocityValue.get() + 4, {
      type: "keyframes",
      duration: 1.7,
      ease: [0.43, 0.35, 0.2, 0.95],
    })
  }

  return (
    <div>
      <DemoBox
        ref={ref}
        className="flex flex-col justify-center items-center gap-4 h-44 overflow-hidden"
      >
        <motion.div
          style={{
            rotate: inView ? rotate : undefined,
          }}
        >
          <svg className="w-12 h-12 fill-neutral-400" viewBox="0 0 24 24">
            <path d="M14.5 2.31504V8.84315L8.34562 2.68877C9.47759 2.24416 10.7103 2 12 2C12.8632 2 13.701 2.10938 14.5 2.31504Z" />
            <path d="M16 2.83209V11.5355L20.6155 6.92008C19.55 5.11693 17.9345 3.67732 16 2.83209Z" />
            <path d="M21.3112 8.34562L15.1569 14.5H21.685C21.8906 13.701 22 12.8632 22 12C22 10.7103 21.7558 9.47759 21.3112 8.34562Z" />
            <path d="M21.1679 16H12.4645L17.0799 20.6155C18.8831 19.55 20.3227 17.9345 21.1679 16Z" />
            <path d="M15.6544 21.3112L9.5 15.1569V21.685C10.299 21.8906 11.1368 22 12 22C13.2897 22 14.5224 21.7558 15.6544 21.3112Z" />
            <path d="M8 21.1679V12.4645L3.38455 17.0799C4.45003 18.8831 6.06546 20.3227 8 21.1679Z" />
            <path d="M2.68877 15.6544L8.84315 9.5H2.31504C2.10938 10.299 2 11.1368 2 12C2 13.2897 2.24416 14.5224 2.68877 15.6544Z" />
            <path d="M2.83209 8C3.67732 6.06546 5.11693 4.45003 6.92008 3.38455L11.5355 8H2.83209Z" />
          </svg>
        </motion.div>
        <button
          className="py-1 px-2 text-sm text-white bg-black rounded-md"
          onClick={handleSwitch}
        >
          点击加速
        </button>
      </DemoBox>
    </div>
  )
}

export default Demo
