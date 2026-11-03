import { useEffect } from "react"
import { wireFrame } from "@/lib/pyramidWire"

/**
 * 动效 favicon：把 logo 的「转一面」做成循环版写回 link[rel=icon]。
 *
 * 节奏：缓动转过一面（90°）→ 停 2s → 再转一面，循环往复。
 * 实现：64×64 canvas 按线框数学描边，导出 PNG data URL 替换 favicon；
 * 旋转期间节流到 ~20fps，停顿时只写一帧。prefers-reduced-motion 下不接管，
 * 保留 _app 里的静态 SVG favicon（Safari 等不响应动态 favicon 的浏览器同）。
 */

const SIZE = 64
const SCALE = SIZE / 24
const SPIN_MS = 1_200
const DWELL_MS = 2_000
const CYCLE_MS = SPIN_MS + DWELL_MS
const COLOR = "#262626"

const PyramidFavicon = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const link =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      (() => {
        const l = document.createElement("link")
        l.rel = "icon"
        document.head.appendChild(l)
        return l
      })()
    const canvas = document.createElement("canvas")
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = (theta: number) => {
      const { slants, chain } = wireFrame(theta)
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.strokeStyle = COLOR
      ctx.lineWidth = 2 * SCALE
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      slants.forEach(([x1, y1, x2, y2]) => {
        ctx.moveTo(x1 * SCALE, y1 * SCALE)
        ctx.lineTo(x2 * SCALE, y2 * SCALE)
      })
      if (chain.length) {
        ctx.moveTo(chain[0][0] * SCALE, chain[0][1] * SCALE)
        for (let i = 1; i < chain.length; i++) {
          ctx.lineTo(chain[i][0] * SCALE, chain[i][1] * SCALE)
        }
      }
      ctx.stroke()
      link.type = "image/png"
      link.href = canvas.toDataURL("image/png")
    }

    let raf = 0
    let lastDraw = -2 // -2 = 已写停顿帧
    const tick = () => {
      const u = performance.now() % CYCLE_MS
      const now = performance.now()
      if (u < SPIN_MS) {
        if (now - lastDraw > 50) {
          const p = u / SPIN_MS
          // ease-in-out cubic：慢起、慢收，停得稳
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
          draw(e * (Math.PI / 2)) // 只转过一面
          lastDraw = now
        }
      } else if (lastDraw !== -2) {
        draw(0)
        lastDraw = -2
      }
      raf = requestAnimationFrame(tick)
    }
    draw(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}

export default PyramidFavicon
