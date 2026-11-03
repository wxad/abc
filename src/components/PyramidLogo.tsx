import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { wirePath } from "@/lib/pyramidWire"

/**
 * 设计垂点 logo：线性描边的 3D 四棱锥（线框）。
 *
 * 几何与消隐见 @/lib/pyramidWire：静止时恰好是 Lucide Pyramid 的五条线，
 * 转起来是真正的线稿 3D 旋转，描边粗细始终均匀。
 *
 * 节奏：入场进入视口时缓动转过一面（90°）、停回原形，之后保持静止；
 * hover 再转一面。转角只吃 stroke 自带的 round cap / round join，保持
 * Lucide 的线性原味。
 */

const SPIN_MS = 1_200 // 转过一面（90°）时长（缓入缓出）

const REST_D = wirePath(0)

const PyramidLogo = ({ className }: { className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    if (!svg || !path) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let spinStart = -1

    const render = (theta: number) => {
      path.setAttribute("d", wirePath(theta))
    }
    const tick = () => {
      const p = (performance.now() - spinStart) / SPIN_MS
      if (p >= 1) {
        spinStart = -1
        render(0)
        return
      }
      // ease-in-out cubic：慢起、慢收，停得稳
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      render(e * (Math.PI / 2)) // 只转过一面
      raf = requestAnimationFrame(tick)
    }
    const startSpin = () => {
      if (spinStart >= 0) return
      spinStart = performance.now()
      raf = requestAnimationFrame(tick)
    }

    // hover 再转一面
    svg.addEventListener("mouseenter", startSpin)
    // 入场：首次进入视口转过一面
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          io.disconnect()
          startSpin()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(svg)

    return () => {
      cancelAnimationFrame(raf)
      svg.removeEventListener("mouseenter", startSpin)
      io.disconnect()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0 text-neutral-800", className)}
    >
      <path ref={pathRef} d={REST_D} />
    </svg>
  )
}

export default PyramidLogo
