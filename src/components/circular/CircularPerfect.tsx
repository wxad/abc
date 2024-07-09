import React, { useRef, useEffect, useState } from "react"
import { Pane } from "tweakpane"
import DemoBox from "../DemoBox"

const Demo = () => {
  const resizeWrapper = useRef<HTMLDivElement | null>(null)
  const paneWrapper = useRef<HTMLDivElement | null>(null)
  const paneRef = useRef<Pane | null>(null)
  const widths = useRef<number[]>([])
  const [params, setParams] = useState({
    name: "bilibili",
    gap: 2,
    padding: 25,
  })
  const [positions, setPositions] = useState<
    {
      angle: number
      x: number
      y: number
    }[]
  >([])

  const refresh = () => {
    let texts: HTMLDivElement[] = []
    if (resizeWrapper.current) {
      texts = [
        ...resizeWrapper.current.querySelectorAll("[data-role='text']"),
      ] as HTMLDivElement[]
    }

    widths.current = texts.map((text) => text.getBoundingClientRect().width)
    const radius = 32
    const circle = 2 * Math.PI * radius
    const start = 0
    let current = start
    const positions = []

    texts.forEach((_, index) => {
      const width = widths.current[index]
      const gap = params.gap

      const angle = (current / circle) * 360

      const x = Math.sin((angle * Math.PI) / 180) * radius
      const y = -Math.cos((angle * Math.PI) / 180) * radius
      positions.push({ angle, x, y })

      current += width / 2 + widths.current[index + 1] / 2 + gap
    })

    setPositions(positions)
  }

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

    paneRef.current.addBinding(params, "name")
    paneRef.current.addBinding(params, "gap", {
      min: 0,
      max: 10,
    })
    paneRef.current.addBinding(params, "padding", {
      min: 15,
      max: 40,
    })

    const observer = new ResizeObserver(() => {
      refresh()
    })

    if (resizeWrapper.current) {
      observer.observe(resizeWrapper.current)
    }

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [params])

  const totalWidth = widths.current.reduce((acc, cur) => acc + cur, 0)
  const totalGap = params.gap * (widths.current.length - 1)
  const total = totalWidth + totalGap

  const dash =
    100 -
    ((total +
      (2 * Math.PI * 32 * (params.padding * 2)) / 360 -
      widths.current[0] / 2 -
      widths.current[widths.current.length - 1] / 2) *
      100) /
      (Math.PI * 32 * 2)

  return (
    <DemoBox
      className="flex justify-center items-center gap-6 pt-32 md:pt-20 pb-16 overflow-hidden"
      style={{
        background: "rgba(0, 0, 0, 1)",
      }}
    >
      <div
        className="text-sm font-[gilroysemibold] absolute pointer-events-none opacity-0"
        ref={resizeWrapper}
      >
        {params.name.split("").map((char, index) => (
          <div key={index} data-role="text" className="inline-block">
            {char}
          </div>
        ))}
      </div>
      <div ref={paneWrapper} className="absolute top-[4px] right-[4px]" />
      <div className="relative w-[100px] h-[100px] scale-[1.3]">
        <svg
          className="absolute top-[18px] left-[10px]"
          width="7"
          height="65"
          viewBox="0 0 7 65"
          fill="none"
        >
          <path
            d="M6.97125 0.0961914H0.615479V64.0193H6.97125V0.0961914Z"
            fill="#00FA73"
          />
        </svg>
        <div className="absolute bottom-[17px] left-[27px] w-16 h-16 scale-105 origin-bottom-left">
          <svg className="absolute-full fill-none" viewBox="0 0 36 36">
            <path
              className="fill-none origin-center stroke-white stroke-[3.18px] transition-all duration-500"
              style={{
                transform: `rotateY(180deg) rotateZ(${params.padding + 30}deg)`,
                strokeDasharray: `${dash} 100`,
              }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute-full text-white text-base leading-[1] font-[gilroysemibold] rotate-[-30deg] scale-90">
            {params.name.split("").map((char, index) => {
              if (!positions[index]) return null
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${positions[index].x}px) translateY(${positions[index].y}px) rotate(${positions[index].angle}deg)`,
                  }}
                >
                  {char}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
