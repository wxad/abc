/**
 * 设计垂点 logo 的线框数学：PyramidLogo 与 favicon 共用。
 *
 * 模型由 Lucide Pyramid 的 24×24 静止坐标反推（顶点 (12,2)、左 (2.5,16.5)、
 * 前 (12,22)、右 (21.5,16.5)），对四棱锥做正交投影并剔除背向面。
 * wireFrame 返回消隐后的可见棱：侧棱若干条 + 底边链一条（开放折线）。
 */

const CX = 12
const CY = 16.5
const R = 9.5 // 底面外接半径（屏幕半宽）
const SIN_E = 5.5 / R // 视角仰角 sin
const COS_E = Math.sqrt(1 - SIN_E * SIN_E)
const H = 14.5 / COS_E // 锥高

export type P3 = readonly [number, number, number]
export type Seg = readonly [number, number, number, number]
export type Pt = readonly [number, number]

const APEX: P3 = [0, H, 0]
const VIEW: P3 = [0, SIN_E, COS_E] // 指向观察者的单位向量
const BASE_XZ: readonly (readonly [number, number])[] = [
  [0, R],
  [R, 0],
  [0, -R],
  [-R, 0],
] // 前、右、后、左

export const project = ([x, y, z]: P3): Pt => [
  CX + x,
  CY + z * SIN_E - y * COS_E,
]

const cross = (u: P3, v: P3): P3 => [
  u[1] * v[2] - u[2] * v[1],
  u[2] * v[0] - u[0] * v[2],
  u[0] * v[1] - u[1] * v[0],
]

/** 旋转角 theta 下消隐后的可见棱 */
export const wireFrame = (
  theta: number,
): { slants: Seg[]; chain: Pt[] } => {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const corners: P3[] = BASE_XZ.map(([x, z]) => [
    x * c + z * s,
    0,
    z * c - x * s,
  ])

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

  // 侧棱：端点汇于顶点
  const slantIdx = new Set<number>()
  visible.forEach((i) => {
    slantIdx.add(i)
    slantIdx.add((i + 1) % 4)
  })
  const [ax, ay] = project(APEX)
  const slants: Seg[] = [...slantIdx].map((i) => {
    const [x, y] = project(corners[i])
    return [ax, ay, x, y]
  })

  // 底边链：可见底边首尾相接的开放折线（至多 3 面可见，不会闭合成环）
  const vis = new Set(visible)
  let start = -1
  for (let i = 0; i < 4 && start < 0; i++) {
    if (vis.has(i) && !vis.has((i + 3) % 4)) start = i
  }
  const chain: Pt[] = []
  if (start >= 0) {
    chain.push(project(corners[start]))
    let e = start
    while (vis.has(e)) {
      e = (e + 1) % 4
      chain.push(project(corners[e]))
    }
  }

  return { slants, chain }
}

/** 可见棱的 SVG path d（底边链为一条 polyline，拐角吃 round join） */
export const wirePath = (theta: number): string => {
  const { slants, chain } = wireFrame(theta)
  const segs = slants.map(
    ([x1, y1, x2, y2]) =>
      `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`,
  )
  if (chain.length) {
    segs.push(
      `M${chain
        .map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`)
        .join("L")}`,
    )
  }
  return segs.join("")
}
