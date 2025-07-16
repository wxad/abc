import DemoBox from "@/components/DemoBox"
import { motion, useVelocity, useScroll, useMotionValue } from "motion/react"

const Demo = () => {
  const texts = [
    "Huge epic braam",
    "Horses galloping by",
    "Cat purring loudly",
    "Rock drum fill",
    "Tornado warning siren",
    "Eerie mood music",
    "A car whizzing by",
    "Brassy tuba, staccato",
    "Video game power-up",
    "Mopping a floor",
    "Small automobile weapon",
    "Tinkling revelsings",
    "Small tropical airplane",
    "Intense cinematic boom",
  ]

  const wheelDelta = useMotionValue(0)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.deltaY)
  }

  return (
    <DemoBox className="overflow-hidden">
      <motion.div className="h-[600px]" drag onDrag />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-0 select-none text-sm">
        {texts.map((text, index) => (
          <div
            key={index}
            className="absolute whitespace-nowrap"
            style={{
              top: 0,
              left: 100,
              transformOrigin: "-100px 50%",
              transform: `rotate(${(index * 360) / texts.length}deg)`,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </DemoBox>
  )
}

export default Demo
