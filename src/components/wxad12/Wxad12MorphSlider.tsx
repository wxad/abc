import { useRef, useState } from "react"

/** 单手柄 scrub，样式与 @/components/fm/Slider 一致 */
export function Wxad12MorphSlider({
  value,
  onChange,
  onInteractionStart,
  onInteractionEnd,
}: {
  value: number
  onChange: (v: number) => void
  onInteractionStart?: () => void
  onInteractionEnd?: () => void
}) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  const pick = (clientX: number) => {
    const rect = sliderRef.current!.getBoundingClientRect()
    onChange(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)))
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    onInteractionStart?.()
    setActive(true)
    pick(e.clientX)

    const move = (ev: PointerEvent) => pick(ev.clientX)
    const up = () => {
      setActive(false)
      onInteractionEnd?.()
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  return (
    <div
      ref={sliderRef}
      className="relative w-[200px] h-1 bg-neutral-200 rounded-xs cursor-pointer touch-none select-none"
      onPointerDown={handlePointerDown}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      aria-label="路径变形进度"
    >
      <div
        className="absolute inset-y-0 left-0 bg-[#00E96F] rounded-xs pointer-events-none"
        style={{ width: `${value * 100}%` }}
      />
      <div
        className={`absolute top-[-5px] size-[14px] -translate-x-1/2 rounded-full bg-white border-2 pointer-events-none transition-transform ${
          active ? "border-neutral-900 scale-110" : "border-neutral-400"
        }`}
        style={{ left: `${value * 100}%` }}
      />
    </div>
  )
}
