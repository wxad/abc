import { useEffect } from "react"
import { wireFrame } from "@/lib/pyramidWire"

/**
 * 动效 favicon：把 logo 的「转一面」做成循环版写回 link[rel=icon]。
 *
 * 节奏：缓动转过一面（90°，1.2s）→ 停 2s → 再转一面，循环往复。
 * 形态：定格动画——一圈 8 个姿势、每格停留 ~150ms。桌面 Chrome 的 favicon
 * 走 FaviconService 低优先级通道、更新会被合并且到达不规则；定格+停留让
 * 丢帧只表现为某格稍停，观感仍然是有意的节奏。
 * 实现：初始化时把各姿势预编码成 PNG data URL（动画期间不再 toDataURL，
 * 主线程零编码开销），动画中只按帧号换 href，相同帧跳过。
 * prefers-reduced-motion 下不接管，保留 _app 里的静态 SVG favicon
 * （Safari 等不响应动态 favicon 的浏览器同）。
 */

const SIZE = 64
const SCALE = SIZE / 24
const SPIN_MS = 1_200
const DWELL_MS = 2_000
const CYCLE_MS = SPIN_MS + DWELL_MS
const STEPS = 8 // 转一面的定格数（~7fps 更新：Chrome 的 favicon 通道低优先级，
// 定格+停留让被合并/丢弃的更新只表现为某格稍停，而不是卡顿抖动）
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

    const encode = (theta: number) => {
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
      return canvas.toDataURL("image/png")
    }

    // 预编码旋转帧，丢弃相邻重复帧（缓动两端步长极小）
    const frames: { t: number; url: string }[] = []
    for (let k = 0; k <= STEPS; k++) {
      const p = k / STEPS
      // ease-in-out cubic：与 logo 同一条缓动曲线
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      const url = encode(e * (Math.PI / 2))
      if (!frames.length || frames[frames.length - 1].url !== url) {
        frames.push({ t: p * SPIN_MS, url })
      }
    }
    const REST_URL = frames[0].url

    link.type = "image/png"
    link.href = REST_URL
    let current = REST_URL
    let lastKey = ""

    let raf = 0
    const tick = () => {
      const u = performance.now() % CYCLE_MS
      let key: string
      let url: string
      if (u < SPIN_MS) {
        let i = 0
        while (i + 1 < frames.length && frames[i + 1].t <= u) i++
        key = `s${i}`
        url = frames[i].url
      } else {
        key = "d"
        url = REST_URL
      }
      if (key !== lastKey) {
        lastKey = key
        if (url !== current) {
          current = url
          link.href = url
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}

export default PyramidFavicon
