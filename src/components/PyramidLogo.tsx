import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * 设计垂点 logo：线性描边的 3D 四棱锥（线框）。
 *
 * 不是 CSS 3D 拼贴：每帧对四棱锥做真实正交投影（视角仰角与 Lucide Pyramid
 * 一致），剔除背向面，只画可见面的棱 —— 静止时恰好是 Lucide Pyramid 的
 * 五条线，转起来是真正的线稿 3D 旋转，描边粗细始终均匀。
 */

/* 由 Lucide Pyramid 的 24×24 静止坐标反推模型：
 * 顶点 (12,2)、左 (2.5,16.5)、前 (12,22)、右 (21.5,16.5) */
const CX = 12
const CY = 16.5
const R = 9.5 // 底面外接半径（屏幕半宽）
const SIN_E = 5.5 / R // 视角仰角 sin
const COS_E = Math.sqrt(1 - SIN_E * SIN_E)
const H = 14.5 / COS_E // 锥高
const PERIOD_MS = 10_000 // 一圈 10s；同页所有实例共用同一相位

type P3 = readonly [number, number, number]

const APEX: P3 = [0, H, 0]
const VIEW: P3 = [0, SIN_E, COS_E] // 指向观察者的单位向量
const BASE_XZ: readonly (readonly [number, number])[] = [
  [0, R],
  [R, 0],
  [0, -R],
  [-R, 0],
] // 前、右、后、左

const project = ([x, y, z]: P3): readonly [number, number] => [
  CX + x,
  CY + z * SIN_E - y * COS_E,
]

const cross = (u: P3, v: P3): P3 => [
  u[1] * v[2] - u[2] * v[1],
  u[2] * v[0] - u[0] * v[2],
  u[0] * v[1] - u[1] * v[0],
]

/** 旋转角 theta 下，消隐后的线框可见棱 */
const wirePath = (theta: number): string => {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const corners: P3[] = BASE_XZ.map(([x, z]) => [
    x * c + z * s,
    0,
    z * c - x * s,
  ])

  const segs: string[] = []
  const seen = new Set<string>()
  const edge = (key: string, p: P3, q: P3) => {
    if (seen.has(key)) return
    seen.add(key)
    const [x1, y1] = project(p)
    const [x2, y2] = project(q)
    segs.push(`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`)
  }

  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4
    // 面 (apex, c_i, c_j) 的朝外法线
    let n = cross(
      [
        corners[i][0] - APEX[0],
        corners[i][1] - APEX[1],
        corners[i][2] - APEX[2],
      ],
      [
        corners[j][0] - APEX[0],
        corners[j][1] - APEX[1],
        corners[j][2] - APEX[2],
      ],
    )
    if (
      n[0] * (corners[i][0] + corners[j][0]) +
        n[2] * (corners[i][2] + corners[j][2]) <
      0
    ) {
      n = [-n[0], -n[1], -n[2]]
    }
    // 背向观察者的面整面消隐
    if (n[0] * VIEW[0] + n[1] * VIEW[1] + n[2] * VIEW[2] <= 0) continue
    edge(`s${i}`, APEX, corners[i])
    edge(`s${j}`, APEX, corners[j])
    edge(`b${i}`, corners[i], corners[j])
  }
  return segs.join("")
}

const PyramidLogo = ({ className }: { className?: string }) => {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const tick = () => {
      const theta = ((performance.now() % PERIOD_MS) / PERIOD_MS) * Math.PI * 2
      path.setAttribute("d", wirePath(theta))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0 text-neutral-800", className)}
    >
      <path ref={pathRef} d={wirePath(0)} />
    </svg>
  )
}

export default PyramidLogo
