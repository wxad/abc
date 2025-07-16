import { animate, motion, useMotionValue } from "motion/react"
import DemoBox from "../DemoBox"

const Demo = ({
  mode,
  drag,
}: {
  mode: "free" | "bezier" | "spring" | "springbounce"
  drag: "x" | "y" | boolean
}) => {
  const end = 248
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const config =
    mode === "bezier"
      ? ({
          duration: 0.3,
          ease: "easeInOut",
        } as const)
      : ({
          type: "spring",
          visualDuration: 0.4,
          bounce: mode === "springbounce" ? 0.5 : 0,
        } as const)

  return (
    <DemoBox className="flex items-center justify-center overflow-hidden">
      <div
        className={`relative w-[320px] ${
          drag === true ? "h-[300px]" : "h-[200px]"
        }`}
      >
        <div className="absolute top-1/2 left-8 -mt-1 size-2 bg-neutral-400 rounded-full" />
        <div className="absolute top-1/2 right-8 -mt-1 size-2 bg-neutral-400 rounded-full" />
        <motion.div
          className="absolute top-1/2 left-0 -mt-9 size-[72px] bg-white rounded-full shadow-sm cursor-move"
          style={{
            x,
            y,
          }}
          drag={drag}
          dragConstraints={
            mode === "free" ? undefined : { left: 0, right: 248 }
          }
          dragMomentum={false}
          onDragEnd={(_, info) => {
            let targetX = 0
            if (info.velocity.x > 0) {
              targetX = end
            } else if (info.velocity.x < 0) {
              targetX = 0
            } else {
              targetX = info.offset.x > 0 ? end : 0
            }
            if (mode !== "free") {
              animate(x, targetX, {
                ...config,
                velocity: mode !== "bezier" ? info.velocity.x : 0,
              })

              if (drag === true) {
                animate(y, 0, {
                  ...config,
                  velocity: mode !== "bezier" ? info.velocity.y : 0,
                })
              }
            }
          }}
        />
      </div>
    </DemoBox>
  )
}

export default Demo
