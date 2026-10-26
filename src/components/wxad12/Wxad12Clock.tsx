import DemoBox from "@/components/DemoBox"
import { useEffect, useRef } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

/** 与 LogoIntro 表盘同一套几何：390 宽舞台上的刻度圈 */
const K = 390 / 1920
const GLYPH = 240 * K
const RADIUS = 344 * K
const NUMFONT = 250 * K
const BOX = Math.ceil(RADIUS * 2 + NUMFONT * 1.35)
const CX = BOX / 2
const CY = BOX / 2

const DIAL_MS = 3500
const HOLD_MS = 800

const X_PATH =
  "M21.512 18.0773L29.32 28.9999H22.9627L18.3547 22.5146L13.704 28.9999H7.3467L15.1547 18.1199L7.68803 7.66661H14.0454L18.3547 13.6826L22.664 7.66661H28.9787L21.512 18.0773Z"
const W_PATH =
  "M24.8187 20.8079L28.4454 7.66661H34.2907L27.5067 28.9999H22.2587L18.3334 16.0719L14.408 28.9999H9.16002L2.37602 7.66661H8.22135L11.848 20.7653L15.7307 7.66661H20.936L24.8187 20.8079Z"
const A_PATH =
  "M24.2427 10.1839V7.66661H29.7467V28.9999H24.2427V26.4826C22.5787 28.5733 20.2747 29.5973 17.288 29.5973C14.4293 29.5973 11.9973 28.5306 9.94932 26.3546C7.94398 24.1786 6.91998 21.4906 6.91998 18.3333C6.91998 15.1759 7.94398 12.5306 9.94932 10.3546C11.9973 8.17861 14.4293 7.06928 17.288 7.06928C20.2747 7.06928 22.5787 8.09328 24.2427 10.1839ZM14.088 22.6853C15.1973 23.7946 16.6053 24.3493 18.312 24.3493C20.0187 24.3493 21.4267 23.7946 22.536 22.6853C23.688 21.5333 24.2427 20.0826 24.2427 18.3333C24.2427 16.5839 23.688 15.1333 22.536 14.0239C21.4267 12.8719 20.0187 12.3173 18.312 12.3173C16.6053 12.3173 15.1973 12.8719 14.088 14.0239C12.9787 15.1333 12.424 16.5839 12.424 18.3333C12.424 20.0826 12.9787 21.5333 14.088 22.6853Z"
const D_PATH =
  "M23.8771 11.0507V2.34279e-05H29.3811V29.8667H23.8771V27.3494C22.2558 29.44 19.9518 30.464 16.9651 30.464C14.1065 30.464 11.6318 29.3974 9.5838 27.2214C7.57846 25.0454 6.55446 22.3574 6.55446 19.2C6.55446 16.0427 7.57846 13.3974 9.5838 11.2214C11.6318 9.04536 14.1065 7.93603 16.9651 7.93603C19.9518 7.93603 22.2558 8.96003 23.8771 11.0507ZM13.7225 23.552C14.8745 24.6614 16.2825 25.216 17.9891 25.216C19.6958 25.216 21.1038 24.6614 22.2131 23.552C23.3225 22.4 23.8771 20.9494 23.8771 19.2C23.8771 17.4507 23.3225 16 22.2131 14.8907C21.1038 13.7387 19.6958 13.184 17.9891 13.184C16.2825 13.184 14.8745 13.7387 13.7225 14.8907C12.6131 16 12.0585 17.4507 12.0585 19.2C12.0585 20.9494 12.6131 22.4 13.7225 23.552Z"

function dialEase(amount: number) {
  const x1 = 0.25
  const y1 = 0.11
  const x2 = 0.5
  const y2 = 1
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  const solveX = (x: number) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const delta = sampleX(t) - x
      if (Math.abs(delta) < 1e-6) return t
      const dx = sampleDX(t)
      if (Math.abs(dx) < 1e-6) break
      t -= delta / dx
    }
    let lo = 0
    let hi = 1
    t = x
    for (let i = 0; i < 20; i++) {
      const xv = sampleX(t)
      if (Math.abs(xv - x) < 1e-6) break
      if (xv < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return t
  }
  if (amount <= 0) return 0
  if (amount >= 1) return 1
  return sampleY(solveX(amount))
}

function hourLabel(rotation: number) {
  const hour = Math.round(rotation / 30)
  if (hour < 1) return "1"
  if (hour > 12) return "12"
  return String(hour)
}

function slotStyle(base: number) {
  const phi = (base * Math.PI) / 180
  const half = GLYPH / 2
  return {
    width: GLYPH,
    height: GLYPH,
    left: CX + RADIUS * Math.sin(phi) - half,
    top: CY - RADIUS * Math.cos(phi) - half,
  }
}

const pivotStyle = {
  width: GLYPH,
  height: GLYPH,
  left: CX - GLYPH / 2,
  top: CY - GLYPH / 2,
}

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 36.6667 36.6667" className="block h-full w-full overflow-visible">
      <path d={d} fill="#000" />
    </svg>
  )
}

const Wxad12Clock = ({ cover = false }: { cover?: boolean }) => {
  const pivotRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLDivElement | null)[]>([])
  const [rootRef, { entry }] = useIntersectionObserver({ threshold: 0.35 })
  const inView = entry?.isIntersecting

  useEffect(() => {
    if (!inView) return
    const numEl = numRef.current
    const pivotEl = pivotRef.current
    if (!numEl || !pivotEl) return

    const letters = [
      { el: numEl, base: 0 },
      { el: letterRefs.current[0], base: 90 },
      { el: letterRefs.current[1], base: 180 },
      { el: letterRefs.current[2], base: 270 },
    ].filter((item): item is { el: HTMLDivElement; base: number } => item.el !== null)

    let raf = 0
    let holdTimer = 0
    let stopped = false
    const half = GLYPH / 2

    const place = (el: HTMLDivElement, rotation: number, base: number) => {
      const phi = ((base + rotation) * Math.PI) / 180
      el.style.width = `${GLYPH}px`
      el.style.height = `${GLYPH}px`
      el.style.left = `${CX + RADIUS * Math.sin(phi) - half}px`
      el.style.top = `${CY - RADIUS * Math.cos(phi) - half}px`
    }

    const render = (rotation: number) => {
      pivotEl.style.width = `${GLYPH}px`
      pivotEl.style.height = `${GLYPH}px`
      pivotEl.style.left = `${CX - half}px`
      pivotEl.style.top = `${CY - half}px`
      for (const item of letters) place(item.el, rotation, item.base)
      numEl.style.fontSize = `${NUMFONT}px`
      numEl.textContent = hourLabel(rotation)
    }

    const spin = () => {
      if (stopped) return
      const start = performance.now()
      const frame = (now: number) => {
        if (stopped) return
        const t = Math.min(1, (now - start) / DIAL_MS)
        render(360 * dialEase(t))
        if (t < 1) {
          raf = requestAnimationFrame(frame)
          return
        }
        render(360)
        holdTimer = window.setTimeout(() => {
          render(0)
          spin()
        }, HOLD_MS)
      }
      raf = requestAnimationFrame(frame)
    }

    render(0)
    spin()

    return () => {
      stopped = true
      cancelAnimationFrame(raf)
      window.clearTimeout(holdTimer)
    }
  }, [inView])

  const dial = (
    <div className="relative" style={{ width: BOX, height: BOX }}>
      <div ref={pivotRef} className="absolute z-[2]" style={pivotStyle}>
        <Glyph d={X_PATH} />
      </div>
      <div
        ref={(el) => {
          letterRefs.current[0] = el
        }}
        className="absolute"
        style={slotStyle(90)}
      >
        <Glyph d={A_PATH} />
      </div>
      <div
        ref={(el) => {
          letterRefs.current[1] = el
        }}
        className="absolute"
        style={slotStyle(180)}
      >
        <Glyph d={D_PATH} />
      </div>
      <div
        ref={(el) => {
          letterRefs.current[2] = el
        }}
        className="absolute"
        style={slotStyle(270)}
      >
        <Glyph d={W_PATH} />
      </div>
      <div
        ref={numRef}
        className="absolute flex items-center justify-center overflow-visible leading-none whitespace-nowrap text-[#00E96F]"
        style={{
          ...slotStyle(0),
          fontFamily: "gilroyBold, Helvetica Neue, Arial, sans-serif",
          fontSize: NUMFONT,
        }}
      >
        1
      </div>
    </div>
  )

  if (cover) {
    return (
      <div
        ref={rootRef}
        className="relative overflow-hidden rounded-full border border-neutral-300 bg-size-[40px_40px]"
        style={{ backgroundImage: "url(/abc/grid.svg)" }}
      >
        <div className="pt-[100%]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {dial}
        </div>
      </div>
    )
  }

  return (
    <DemoBox ref={rootRef} className="flex items-center justify-center py-8">
      {dial}
    </DemoBox>
  )
}

export default Wxad12Clock
