"use client"

import DemoBox from "@/components/DemoBox"
import { useMotionValue, animate } from "motion/react"
import { useRef, useState, useCallback, useEffect } from "react"

/* ============================================================
 *  🎬 单进度条架构（motion 驱动）
 *
 *  progress: MotionValue<number>，每 +1 = 一次完整卡片轮转
 *  floor(progress) 确定基态，frac = progress - floor 为步进内进度
 *
 *  方向感知的角色分配：
 *    forward  (左滑, progress↑): leaving=centerNow, entering=centerNext
 *    backward (右滑, progress↓): leaving=centerNext, entering=centerNow
 * ============================================================ */

/** 滑动阻力系数 */
const SLIDE_R = 2.0

/** 完成一次切换所需的有效位移距离 (px) */
const SLIDE_DISTANCE = 120

/** 松手时若进度偏移 ≥ 此阈值则自动提交 */
const COMMIT_THRESHOLD = 0.3

/** 动画时长 (秒) */
const ANIM_DURATION = 0.6

/**
 * entering 卡延迟启动参数：
 * - T_BOUNDARY: 前期"等待"阈值（0.80 = 前 80% 几乎不动）
 * - PRE_MOVE_FRAC: 等待期的微量移动（2% 行程）
 */
const T_BOUNDARY = 0.8
const PRE_MOVE_FRAC = 0.02

/**
 * z-index 切换点（步进内 frac 值）。
 * forward 时在 frac = Z_SWITCH 处切换；
 * backward 时在 frac = 1 - Z_SWITCH 处切换（镜像）。
 */
const Z_SWITCH = 0.8

/* ---------- 卡片尺寸 ---------- */
const CARD_WIDTH = 125
const CARD_HEIGHT = 167

/* ---------- 槽位关键帧 ---------- */
interface SlotKF {
  x: number
  y: number
  rotate: number
  scale: number
  shadow: number
}

/** [0]=中间, [1]=左, [2]=右 */
const SLOTS: SlotKF[] = [
  { x: 87, y: 10, rotate: 0, scale: 1, shadow: 0 },
  { x: 20, y: 20, rotate: -12, scale: 0.88, shadow: 0.15 },
  { x: 154, y: 20, rotate: 12, scale: 0.88, shadow: 0.15 },
]

/* ---------- 幻灯片数据 ---------- */
interface SlideData {
  image: string
}

const slides: SlideData[] = [
  {
    image:
      "https://wxa.wxs.qq.com/wxad-design/yijie/1779777975540-f3e26f7104652e92.png",
  },
  {
    image:
      "https://wxa.wxs.qq.com/wxad-design/yijie/1779777975548-4c717fb8f0ffc2b3.png",
  },
  {
    image:
      "https://wxa.wxs.qq.com/wxad-design/yijie/1779777975984-928d63518087dc11.png",
  },
]

/* ============================================================
 *  工具函数
 * ============================================================ */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpSlot(a: SlotKF, b: SlotKF, t: number): SlotKF {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    rotate: lerp(a.rotate, b.rotate, t),
    scale: lerp(a.scale, b.scale, t),
    shadow: lerp(a.shadow, b.shadow, t),
  }
}

/**
 * 在 state N 时，card i 位于哪个槽位？
 *
 *  state 0: card0→中间, card1→右, card2→左
 *  state 1: card1→中间, card2→右, card0→左
 *  state 2: card2→中间, card0→右, card1→左
 */
function getSlotAtState(cardIndex: number, stateIndex: number): SlotKF {
  const center = ((stateIndex % 3) + 3) % 3
  if (cardIndex === center) return SLOTS[0] // 中间
  if (cardIndex === (center + 1) % 3) return SLOTS[2] // 右
  return SLOTS[1] // 左
}

/* ---------- 角色缓动 ---------- */

/** entering 卡延迟缓动：前 T_BOUNDARY 微动，之后 easeOut 归位 */
function delayedEasing(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  if (t <= T_BOUNDARY) {
    const p = t / T_BOUNDARY
    return p * p * p * PRE_MOVE_FRAC
  }
  const p = (t - T_BOUNDARY) / (1 - T_BOUNDARY)
  return PRE_MOVE_FRAC + (1 - PRE_MOVE_FRAC) * (1 - Math.pow(1 - p, 2.5))
}

/** background 卡缓入 */
function easeInQuad(t: number): number {
  return t * t
}

/* ---------- 核心：从 progress + direction 派生卡片属性 ---------- */

type Dir = 1 | -1

function getCardProps(cardIndex: number, progress: number, dir: Dir): SlotKF {
  const floor = Math.floor(progress)
  const frac = progress - floor

  // 静止态
  if (frac < 0.001) return getSlotAtState(cardIndex, floor)

  const fromSlot = getSlotAtState(cardIndex, floor)
  const toSlot = getSlotAtState(cardIndex, floor + 1)

  const centerNow = ((floor % 3) + 3) % 3
  const centerNext = (((floor + 1) % 3) + 3) % 3

  let easedFrac: number

  if (dir === 1) {
    // ── Forward（左滑）──
    if (cardIndex === centerNow) {
      easedFrac = frac // leaving: 线性
    } else if (cardIndex === centerNext) {
      easedFrac = delayedEasing(frac) // entering: 延迟启动
    } else {
      easedFrac = easeInQuad(frac) // background: 缓入
    }
  } else {
    // ── Backward（右滑）──
    if (cardIndex === centerNext) {
      easedFrac = frac // leaving: 线性
    } else if (cardIndex === centerNow) {
      easedFrac = 1 - delayedEasing(1 - frac) // entering: 镜像延迟
    } else {
      easedFrac = 1 - easeInQuad(1 - frac) // background: 镜像缓入
    }
  }

  return lerpSlot(fromSlot, toSlot, easedFrac)
}

function getCardZ(cardIndex: number, progress: number, dir: Dir): number {
  const floor = Math.floor(progress)
  const frac = progress - floor

  const centerNow = ((floor % 3) + 3) % 3
  const centerNext = (((floor + 1) % 3) + 3) % 3

  // 静止态
  if (frac < 0.001) {
    if (cardIndex === centerNow) return 10
    if (cardIndex === (centerNow + 1) % 3) return 2 // 右
    return 1 // 左
  }

  if (dir === 1) {
    // Forward: z 在 frac = Z_SWITCH 处切换
    if (frac < Z_SWITCH) {
      if (cardIndex === centerNow) return 10
      if (cardIndex === centerNext) return 5
      return 1
    } else {
      if (cardIndex === centerNext) return 10
      if (cardIndex === centerNow) return 5
      return 1
    }
  } else {
    // Backward: z 在 frac = 1 - Z_SWITCH 处切换（镜像）
    const backwardSwitch = 1 - Z_SWITCH
    if (frac > backwardSwitch) {
      if (cardIndex === centerNext) return 10
      if (cardIndex === centerNow) return 5
      return 1
    } else {
      if (cardIndex === centerNow) return 10
      if (cardIndex === centerNext) return 5
      return 1
    }
  }
}

/* ============================================================
 *  SwipeableCards 组件
 * ============================================================ */

function SwipeableCards() {
  const progress = useMotionValue(0)
  const [, forceRender] = useState(0)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startProgressRef = useRef(0)
  const animControlRef = useRef<ReturnType<typeof animate> | null>(null)

  /** 当前运动方向：1=forward(左滑), -1=backward(右滑) */
  const directionRef = useRef<Dir>(1)

  /* 订阅 progress 变化以触发重渲染 */
  useEffect(() => {
    const unsub = progress.on("change", () => forceRender((n) => n + 1))
    return unsub
  }, [progress])

  /* ---------- 手势处理 ---------- */
  const finishDrag = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    const current = progress.get()
    const start = startProgressRef.current
    const diff = current - start

    let target: number
    if (Math.abs(diff) >= COMMIT_THRESHOLD) {
      target = diff > 0 ? Math.ceil(current) : Math.floor(current)
      if (target === Math.round(start)) {
        target = Math.round(start) + (diff > 0 ? 1 : -1)
      }
    } else {
      target = Math.round(start)
    }

    directionRef.current = target >= current ? 1 : -1

    animControlRef.current = animate(progress, target, {
      duration: ANIM_DURATION,
      ease: [0.16, 1, 0.3, 1],
    })
  }, [progress])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      animControlRef.current?.stop()
      animControlRef.current = null

      isDraggingRef.current = true
      startXRef.current = e.clientX
      startProgressRef.current = progress.get()
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    },
    [progress],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return
      if (e.buttons === 0) {
        finishDrag()
        return
      }
      const dx = e.clientX - startXRef.current
      const delta = -dx / (SLIDE_R * SLIDE_DISTANCE)
      directionRef.current = delta >= 0 ? 1 : -1
      progress.set(startProgressRef.current + delta)
    },
    [progress, finishDrag],
  )

  /* ---------- 当前帧渲染数据 ---------- */
  const p = progress.get()
  const dir = directionRef.current

  return (
    <div className="relative mx-auto h-[200px] w-[299px] shrink-0 select-none">
      {/* 卡片层（交互区域） */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
      >
        {slides.map((slide, i) => {
          const st = getCardProps(i, p, dir)
          const z = getCardZ(i, p, dir)
          return (
            <div
              key={i}
              className="absolute overflow-clip"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transform: `translate(${st.x}px, ${st.y}px) rotate(${st.rotate}deg) scale(${st.scale})`,
                transformOrigin: "center center",
                zIndex: z,
                borderRadius: 6.68,
              }}
            >
              <div
                className="absolute inset-0 bg-white"
                style={{ borderRadius: 6.68 }}
              />
              {slide.image ? (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ borderRadius: 6.68 }}
                >
                  <img
                    alt=""
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                    src={slide.image}
                    draggable={false}
                  />
                </div>
              ) : (
                /* 占位：无图时显示序号 */
                <div
                  className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-2xl font-bold text-neutral-300"
                  style={{ borderRadius: 6.68 }}
                >
                  {i + 1}
                </div>
              )}
              {/* 渐变蒙层 */}
              {st.shadow > 0.01 && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: 6.68,
                    background:
                      st.rotate < 0
                        ? `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,${st.shadow}))`
                        : `linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,${st.shadow}))`,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================================
 *  Demo 入口
 * ============================================================ */

export default function SwipeCardsDemo() {
  return (
    <DemoBox className="overflow-hidden pt-5">
      <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <svg className="size-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.25 9a7.75 7.75 0 1 1 15.5 0v6a7.75 7.75 0 0 1-15.5 0zm7-6.205A6.251 6.251 0 0 0 5.75 9v6a6.25 6.25 0 1 0 12.5 0V9a6.251 6.251 0 0 0-5.5-6.205v3.583a2.25 2.25 0 0 1 1.5 2.122v2a2.25 2.25 0 0 1-4.5 0v-2c0-.98.626-1.813 1.5-2.122zM12 7.75a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75"
            clipRule="evenodd"
          />
        </svg>
        左右拖动体验
      </div>
      <div className="flex md:hidden absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <svg className="size-4" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M196 88a27.86 27.86 0 0 0-13.35 3.39A28 28 0 0 0 144 74.7V44a28 28 0 0 0-56 0v80l-3.82-6.13A28 28 0 0 0 35.73 146l4.67 8.23C74.81 214.89 89.05 240 136 240a88.1 88.1 0 0 0 88-88v-36a28 28 0 0 0-28-28m12 64a72.08 72.08 0 0 1-72 72c-37.63 0-47.84-18-81.68-77.68l-4.69-8.27V138A12 12 0 0 1 54 121.61a11.9 11.9 0 0 1 6-1.6a12 12 0 0 1 10.41 6a2 2 0 0 0 .14.23l18.67 30A8 8 0 0 0 104 152V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0v-12a12 12 0 0 1 24 0v20a8 8 0 0 0 16 0v-4a12 12 0 0 1 24 0Z"
          />
        </svg>
        左右滑动体验
      </div>
      <div className="flex items-center justify-center py-10">
        <SwipeableCards />
      </div>
    </DemoBox>
  )
}
