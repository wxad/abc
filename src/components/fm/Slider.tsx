import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const Demo = ({
  value,
  tooltipVisible = false,
  combine = false,
}: {
  value?: number[]
  tooltipVisible?: boolean
  combine?: boolean
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const handle0Ref = useRef<HTMLDivElement>(null)
  const handle1Ref = useRef<HTMLDivElement>(null)

  const [value0, setValue0] = useState(value ? value[0] : 10)
  const [value1, setValue1] = useState(value ? value[1] : 37)
  const range = value0 < value1 ? [value0, value1] : [value1, value0]

  const [mouseEntered, setMouseEntered] = useState(false)
  const [active0, setActive0] = useState(false)
  const [active1, setActive1] = useState(false)
  const latestActive0 = useRef(active0)
  const latestActive1 = useRef(active1)
  useEffect(() => {
    latestActive0.current = active0
    latestActive1.current = active1
  }, [active0, active1])

  const handlePointerMove = (e: PointerEvent) => {
    const rect = sliderRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const newValue = Math.min(100, Math.max(0, Math.round((x / width) * 100)))

    if (latestActive0.current) {
      setValue0(newValue)
    } else {
      setValue1(newValue)
    }
  }

  const handlePointerUp = () => {
    setActive0(false)
    setActive1(false)
    window.removeEventListener("pointermove", handlePointerMove)
    window.removeEventListener("pointerup", handlePointerUp)
  }

  const handlePointerDown = (index: 0 | 1) => {
    if (index === 0) {
      setActive0(true)
    } else {
      setActive1(true)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  const handleMouseEnter = () => {
    setMouseEntered(true)
  }

  const handleMouseLeave = () => {
    setMouseEntered(false)
  }

  const combined = combine && Math.abs(value0 - value1) < 18

  return (
    <DemoBox className="pt-24 pb-16 text-center">
      <div className="flex items-center justify-center gap-4 text-sm text-neutral-400">
        <div
          className="py-1 select-none touch-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-[300px] h-1 bg-neutral-200 rounded-sm cursor-pointer"
            ref={sliderRef}
          >
            <div
              className="absolute bg-neutral-400 rounded-sm"
              style={{
                inset: `0 ${100 - range[1]}% 0 ${range[0]}%`,
              }}
            />
            <div
              ref={handle0Ref}
              className={`absolute top-[-5px] w-[14px] h-[14px] bg-white rounded-full transform -translate-x-1/2 ${
                active0
                  ? "border-2 border-neutral-900 scale-110"
                  : "border-2 border-neutral-400"
              }`}
              style={{
                left: `${value0}%`,
              }}
              onPointerDown={() => {
                handlePointerDown(0)
              }}
            />
            <div
              ref={handle1Ref}
              className={`absolute top-[-5px] w-[14px] h-[14px] bg-white rounded-full transform -translate-x-1/2 ${
                active1
                  ? "border-2 border-neutral-900 scale-110"
                  : "border-2 border-neutral-400"
              }`}
              style={{
                left: `${value1}%`,
              }}
              onPointerDown={() => {
                handlePointerDown(1)
              }}
            />
            <div
              className={`absolute bottom-5 w-14 h-9 text-sm text-white bg-black rounded-md transform transition-[opacity,visibility] duration-500 -translate-x-1/2 ${
                tooltipVisible || mouseEntered || active0 || active1
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
              style={{
                left: `${value0}%`,
              }}
            >
              {!combined && (
                <div className="absolute-full flex items-center justify-center z-10">
                  {value0}°C
                </div>
              )}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 rounded-sm bg-black" />
            </div>
            <div
              className={`absolute bottom-5 w-14 h-9 text-sm text-white bg-black rounded-md transform transition-[opacity,visibility] duration-500 -translate-x-1/2 ${
                tooltipVisible || mouseEntered || active0 || active1
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
              style={{
                left: `${value1}%`,
              }}
            >
              {combined ? (
                <div
                  className={`absolute top-0 h-full flex items-center justify-center z-10 whitespace-nowrap ${
                    value0 > value1 ? "left-0" : "right-0"
                  }`}
                  style={{
                    width: `calc(100% + ${
                      Math.abs(value1 - value0) / 100
                    } * 300px)`,
                  }}
                >
                  {value0 === value1 ? (
                    <>{value0}°C</>
                  ) : (
                    <>
                      {Math.min(value0, value1)}-{Math.max(value0, value1)}°C
                    </>
                  )}
                </div>
              ) : (
                <div className="absolute right-0 top-0 w-full h-full flex items-center justify-center z-10">
                  {value1}°C
                </div>
              )}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 rounded-sm bg-black" />
            </div>
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
