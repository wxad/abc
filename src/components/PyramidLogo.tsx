import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * 设计垂点 logo：线性描边的 3D 四棱锥（线框）。
 *
 * 不是 CSS 3D 拼贴：每帧对四棱锥做真实正交投影（视角仰角与 Lucide Pyramid
 * 一致），剔除背向面，只画可见面的棱 —— 静止时恰好是 Lucide Pyramid 的
 * 五条线，转起来是真正的线稿 3D 旋转，描边粗细始终均匀。
 *
 * 节奏：入场进入视口时缓动转一圈、停回原形，之后保持静止；hover 再转一圈。
 * 圆角：底边棱连成一条 polyline 吃 round join；另在每个顶点垫一枚比描边
 * 半宽更大的圆点，让尖角 visibly 圆润。
 */

/* 由 Lucide Pyramid 的 24×24 静止坐标反推模型：
 * 顶点 (12,2)、左 (2.5,16.5)、前 (12,22)、右 (21.5,16.5) */
const CX = 12
const CY = 16.5
const R = 9.5 // 底面外接半径（屏幕半宽）
const SIN_E = 5.5 / R // 视角仰角 sin
const COS_E = Math.sqrt(1 - SIN_E * SIN_E)
const H = 14.5 / COS_E // 锥高
const DOT_R = 1.25 // 顶点圆点半径（描边半宽为 1，略大一点才显圆又不突兀）
const SPIN_MS = 1_800 // 转一圈时长（缓入缓出）

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

/** 旋转角 theta 下的线框：消隐后的棱 + 顶点圆点 */
const wireFrame = (theta: number): { d: string; dots: string } => {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const corners: P3[] = BASE_XZ.map(([x, z]) => [
    x * c + z * s,
    0,
    z * c - x * s,
  ])

  const pt = (p: P3) => {
    const [x, y] = project(p)
    return `${x.toFixed(2)} ${y.toFixed(2)}`
  }

  // 可见面（背向观察者的整面消隐）
  const visible: number[] = []
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
    if (n[0] * VIEW[0] + n[1] * VIEW[1] + n[2] * VIEW[2] > 0) visible.push(i)
  }

  const segs: string[] = []
  // 侧棱：各一条线段，端点汇于顶点，由 round cap 收圆
  const slants = new Set<number>()
  visible.forEach((i) => {
    slants.add(i)
    slants.add((i + 1) % 4)
  })
  const apex = pt(APEX)
  slants.forEach((i) => segs.push(`M${apex}L${pt(corners[i])}`))

  // 底边棱：可见底边连成一条 polyline，拐角由 round join 收圆
  // （至多 3 面可见，底边链不会闭合成环）
  const vis = new Set(visible)
  let start = -1
  for (let i = 0; i < 4 && start < 0; i++) {
    if (vis.has(i) && !vis.has((i + 3) % 4)) start = i
  }
  if (start >= 0) {
    const pts = [pt(corners[start])]
    let e = start
    while (vis.has(e)) {
      e = (e + 1) % 4
      pts.push(pt(corners[e]))
    }
    segs.push(`M${pts.join("L")}`)
  }

  // 顶点圆点：apex + 各可见底角，比描边半宽大，尖角因此圆润
  const dotPts: (readonly [number, number])[] = [
    project(APEX),
    ...[...slants].map((i) => project(corners[i])),
  ]
  const dots = dotPts.map(
    ([x, y]) =>
      `M${(x - DOT_R).toFixed(2)} ${y.toFixed(2)}` +
      `a${DOT_R} ${DOT_R} 0 1 0 ${DOT_R * 2} 0` +
      `a${DOT_R} ${DOT_R} 0 1 0 ${-DOT_R * 2} 0`,
  )

  return { d: segs.join(""), dots: dots.join("") }
}

const REST = wireFrame(0)

const PyramidLogo = ({ className }: { className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const dotsRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    const dots = dotsRef.current
    if (!svg || !path || !dots) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let spinStart = -1

    const render = (theta: number) => {
      const f = wireFrame(theta)
      path.setAttribute("d", f.d)
      dots.setAttribute("d", f.dots)
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
      render(e * Math.PI * 2)
      raf = requestAnimationFrame(tick)
    }
    const startSpin = () => {
      if (spinStart >= 0) return
      spinStart = performance.now()
      raf = requestAnimationFrame(tick)
    }

    // hover 再转一圈
    svg.addEventListener("mouseenter", startSpin)
    // 入场：首次进入视口转一圈
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
      <path ref={pathRef} d={REST.d} />
      <path ref={dotsRef} d={REST.dots} fill="currentColor" stroke="none" />
    </svg>
  )
}

export default PyramidLogo
