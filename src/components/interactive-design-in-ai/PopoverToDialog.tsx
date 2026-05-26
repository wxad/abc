"use client"

import DemoBox from "@/components/DemoBox"
import { MousePointer, X } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react"
import { createPortal } from "react-dom"
import {
  EXPANDED_PADDING,
  EXPANDED_W,
  FALLBACK_EXPANDED_HEIGHT,
  TALKS,
  TalkCardContent,
  type Talk,
} from "./CardToDialog"

// ─── 视觉常量 ────────────────────────────────────────────────────────────
const PREVIEW_W = 240
const PREVIEW_PADDING = 6
const PREVIEW_RADIUS = 12
const PREVIEW_GAP = 12
/** 16:9 封面 + 上下各一份 padding：高度由 (W - 2P) × 9/16 + 2P 推得，避免 padding 被图片顶掉。
 *  240 - 12 = 228；228 × 9/16 = 128.25；+ 12 = 140.25 → 向上取整 141。 */
const PREVIEW_H =
  Math.ceil(((PREVIEW_W - PREVIEW_PADDING * 2) * 9) / 16) + PREVIEW_PADDING * 2

const EXPANDED_RADIUS = 24

// ─── Spring 配置：popover/modal 复用同一套链式 spring ────────────────────
/** 容器尺寸过渡曲线：与 ScatterCollage 内部 spring 大致同档，
 *  保证「外层卡片宽高」与「内层 scatter 槽位」两个 spring 节奏匹配，避免一个先到一个后到。 */
const SIZE_SPRING = { stiffness: 250, damping: 26, mass: 1 }
/** 气球底端：紧追光标（preview）或紧追视口中心（modal） */
const SPRING_FAST = { stiffness: 460, damping: 38 }
/** 气球顶端：吊在底端下面，慢半拍 → 形成扯气球的拖尾，rotation 由 (top - bottom) 推 */
const SPRING_SLOW = { stiffness: 250, damping: 26, mass: 1 }

type Mode = "closed" | "preview" | "modal"

type EnterArgs = {
  talkId: string
  talk: Talk
  /** 鼠标 X：preview 卡片底部中心跟手 */
  clientX: number
  /** 触发元素的 boundingClientRect.top：preview 卡片底部中心 Y = anchorTop - GAP */
  anchorTop: number
}

// ─── PopoverToDialog ─────────────────────────────────────────────────────
export default function PopoverToDialog() {
  // SSR 安全：portal 需要 document.body
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [activeTalk, setActiveTalk] = useState<Talk | null>(null)
  const [mode, setModeState] = useState<Mode>("closed")
  const [hoveredId, setHoveredIdState] = useState<string | null>(null)

  // 同步 ref：命令式 handler 在事件批处理 / motion subscriber 里读「最新意图」，
  // 避免依赖 setState 异步落库（典型坑：rotate 订阅回调里要拿到「当前是否还在 preview」）
  const modeRef = useRef<Mode>("closed")
  const setMode = useCallback((next: Mode) => {
    modeRef.current = next
    setModeState(next)
  }, [])
  const setHoveredId = setHoveredIdState

  // ─── 锚点（卡片底部中心应对齐的视口点） ─────────────────────────────
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const bottomX = useSpring(mouseX, SPRING_FAST)
  const bottomY = useSpring(mouseY, SPRING_FAST)
  const topX = useSpring(bottomX, SPRING_SLOW)

  // ─── 卡片宽高（也走 spring，使容器形变与内部 scatter 同节奏） ────────
  const wTarget = useMotionValue(PREVIEW_W)
  const hTarget = useMotionValue(PREVIEW_H)
  const cardW = useSpring(wTarget, SIZE_SPRING)
  const cardH = useSpring(hTarget, SIZE_SPRING)

  // ─── 由「锚点 + 当前尺寸」推卡片左上角，使「底部中心始终对准锚点」 ──
  const cardLeft = useTransform([bottomX, cardW], (latest) => {
    const [b, w] = latest as [number, number]
    return b - w / 2
  })
  const cardTop = useTransform([bottomY, cardH], (latest) => {
    const [b, h] = latest as [number, number]
    return b - h
  })

  // rotate 手控（不走 useTransform，避免 spring 链路自动驱动）：
  // - preview：订阅 bottomX / topX / cardH，按公式推算
  // - modal：进入时 rotate.jump(0)，回调因 modeRef 守卫不再写值 → 卡片彻底不转
  const rotate = useMotionValue(0)
  const recomputePreviewRotate = useCallback(() => {
    if (modeRef.current !== "preview") return
    const b = bottomX.get()
    const t = topX.get()
    const h = cardH.get()
    const dx = t - b
    if (dx === 0) {
      rotate.set(0)
      return
    }
    const deg = 90 - (Math.atan2(h, dx) * 180) / Math.PI
    rotate.set(deg / 3)
  }, [bottomX, topX, cardH, rotate])
  useMotionValueEvent(bottomX, "change", recomputePreviewRotate)
  useMotionValueEvent(topX, "change", recomputePreviewRotate)
  useMotionValueEvent(cardH, "change", recomputePreviewRotate)

  // ─── 离屏测量：得到 modal 展开后的真实高度 ──────────────────────────
  const measureRef = useRef<HTMLDivElement>(null)
  const [expandedH, setExpandedH] = useState<number>(FALLBACK_EXPANDED_HEIGHT)
  useEffect(() => {
    const el = measureRef.current
    if (!el || !activeTalk) return
    const measure = () => {
      const h = el.offsetHeight
      if (h > 0) setExpandedH(h)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [activeTalk])

  // ─── 模式切换：拨动 spring 目标 ────────────────────────────────────
  // preview → modal：anchor 锁到视口中心 + cardH/2，宽高拉到展开尺寸；spring 自动平滑过渡
  // rotate 在切到 modal 的同一帧 jump 到 0，接管旋转 → spring 链路滞后不再传到视觉，入场不会摇晃
  useEffect(() => {
    if (mode === "modal") {
      const vw = window.innerWidth
      const vh = window.innerHeight
      wTarget.set(EXPANDED_W)
      hTarget.set(expandedH)
      mouseX.set(vw / 2)
      mouseY.set(vh / 2 + expandedH / 2)
      rotate.jump(0)
    } else if (mode === "preview") {
      wTarget.set(PREVIEW_W)
      hTarget.set(PREVIEW_H)
    }
  }, [mode, expandedH, wTarget, hTarget, mouseX, mouseY, rotate])

  // ─── 弹出 modal 时锁页面滚动 ───────────────────────────────────────
  useLayoutEffect(() => {
    if (mode !== "modal") return
    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [mode])

  // ─── 统一关闭：清掉 hover 高亮 + 切回 closed ─────────────────────────
  // 必须把 hoveredId 一起清，否则 modal 把触发元素盖住时它已收 mouseleave，
  // 关 modal 后浏览器不会给底下的元素补 mouseenter，链接会一直保持高亮色
  const closeOverlay = useCallback(() => {
    setHoveredId(null)
    setMode("closed")
  }, [setHoveredId, setMode])

  // ─── ESC 关闭 modal ───────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || modeRef.current !== "modal") return
      e.preventDefault()
      closeOverlay()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [closeOverlay])

  // ─── 命令式 API ────────────────────────────────────────────────
  const previewEnter = useCallback(
    ({ talkId, talk, clientX, anchorTop }: EnterArgs) => {
      if (modeRef.current === "modal") return
      setHoveredId(talkId)
      const anchorY = anchorTop - PREVIEW_GAP

      if (modeRef.current !== "preview") {
        // 冷启动：所有 spring 跳到当前 anchor 与 preview 尺寸，
        // 无论上一次以什么状态结束（modal 居中关闭 / exit 中），下一次都从触发元素正上方长出
        mouseX.jump(clientX)
        mouseY.jump(anchorY)
        bottomX.jump(clientX)
        bottomY.jump(anchorY)
        topX.jump(clientX)
        wTarget.jump(PREVIEW_W)
        hTarget.jump(PREVIEW_H)
        cardW.jump(PREVIEW_W)
        cardH.jump(PREVIEW_H)
        // dx = topX - bottomX = 0 → 公式给 0；先 jump rotate 防止上次 modal 残留值
        rotate.jump(0)
      } else {
        // 已在 preview，跨触发点切换：只切目标值，spring 自动平滑过渡
        mouseX.set(clientX)
        mouseY.set(anchorY)
      }

      setActiveTalk(talk)
      setMode("preview")
    },
    [
      setHoveredId,
      setMode,
      mouseX,
      mouseY,
      bottomX,
      bottomY,
      topX,
      wTarget,
      hTarget,
      cardW,
      cardH,
      rotate,
    ],
  )

  const previewMove = useCallback(
    (clientX: number) => {
      if (modeRef.current !== "preview") return
      mouseX.set(clientX)
    },
    [mouseX],
  )

  // 区域整体离开（脚注列表这种块状容器用）：直接关，不做 talkId 匹配；
  // 行间穿越、行间空白都不调它 → 单一 popover 实例的 Y 锚点保持连续 spring 过渡
  const endHoverArea = useCallback(() => {
    if (modeRef.current !== "preview") return
    closeOverlay()
  }, [closeOverlay])

  const openModal = useCallback(
    (talk: Talk) => {
      if (modeRef.current === "modal") return
      setActiveTalk(talk)
      setMode("modal")
    },
    [setMode],
  )

  // ─── 单行触发：onMouseEnter / onMouseMove / onClick，故意不绑 onMouseLeave ──
  // 行间穿越、行间空白都不应关 overlay，统一由外层 inline-block 的 onMouseLeave 兜底
  const rowHandlers = useMemo(
    () => (talk: Talk) => ({
      onMouseEnter: (e: ReactMouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        previewEnter({
          talkId: talk.id,
          talk,
          clientX: e.clientX,
          anchorTop: rect.top,
        })
      },
      onMouseMove: (e: ReactMouseEvent<HTMLElement>) => {
        if (modeRef.current === "closed") {
          // closed 兜底：modal 关闭后鼠标仍停在 row 上，浏览器不会补 mouseenter
          const rect = e.currentTarget.getBoundingClientRect()
          previewEnter({
            talkId: talk.id,
            talk,
            clientX: e.clientX,
            anchorTop: rect.top,
          })
        } else if (modeRef.current === "preview") {
          previewMove(e.clientX)
        }
      },
      onClick: () => openModal(talk),
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openModal(talk)
        }
      },
    }),
    [previewEnter, previewMove, openModal],
  )

  return (
    <DemoBox className="py-10 pt-16 px-5 overflow-visible">
      <div className="flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <MousePointer className="size-4" />
        移动到链接体验
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[520px] p-5 bg-white rounded-xl">
          <p className="mb-3 text-xs uppercase tracking-wider text-neutral-400">
            参考资料
          </p>
          {/* 内层 inline-block：宽度按最长 row 自适应收缩 → 行末右侧空白已经在容器外，
              鼠标横向移出文字才 trigger leave；行间穿越仍在容器内，overlay 不关，Y 锚点连续 spring 过渡 */}
          <div
            className="inline-block pt-3 text-[12px] leading-loose text-neutral-500"
            onMouseLeave={endHoverArea}
          >
            {TALKS.map((talk, i) => {
              const refNum = i + 1
              const isHighlighted = hoveredId === talk.id
              return (
                // 块级 <div>：每条独占一行；内层 <div className="inline-block">：hover/click 命中只覆盖文字宽度
                <div key={talk.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    {...rowHandlers(talk)}
                    // 故意不绑 onMouseLeave：行间穿越 / 行间空白都不应该关 overlay，只让 anchor Y 平滑切档
                    className={`inline-block cursor-pointer transition-colors ${
                      isHighlighted
                        ? "text-blue-500"
                        : "hover:text-blue-500 focus-visible:text-blue-500 focus-visible:outline-none"
                    }`}
                  >
                    <sup className="mr-0.5">[{refNum}]</sup>
                    NO.{talk.issueNumber}《{talk.title}》· {talk.date}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 离屏测量 + Portal 卡片 */}
      {mounted &&
        createPortal(
          <>
            {/* 离屏测量：与 modal 同套姿态（width / padding / paddingBottom）测真实展开高度 */}
            {activeTalk && (
              <div
                ref={measureRef}
                aria-hidden
                className="pointer-events-none invisible fixed left-[-9999px] top-0 flex flex-col gap-3 rounded-3xl border"
                style={{
                  width: EXPANDED_W,
                  padding: EXPANDED_PADDING,
                  paddingBottom: EXPANDED_PADDING + 20,
                }}
              >
                <TalkCardContent talk={activeTalk} measureMode />
              </div>
            )}

            {/* Modal 背景遮罩：仅 modal 模式 */}
            <AnimatePresence>
              {mode === "modal" && (
                <motion.div
                  key="ptd-backdrop"
                  onClick={closeOverlay}
                  className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {/* 唯一卡片：popover ↔ modal 全程同一个 DOM；
                x/y/width/height/rotate 都走 spring → 模式切换是「锚点 + 尺寸」目标值平移，无 mount/unmount 中断 */}
            <AnimatePresence
              onExitComplete={() => {
                // 真正退场后清掉 activeTalk，让 measure 副本卸载（释放 ResizeObserver）
                setActiveTalk(null)
              }}
            >
              {(mode === "preview" || mode === "modal") && activeTalk && (
                <motion.div
                  key="ptd-card"
                  className={`group fixed left-0 top-0 z-60 flex min-w-0 flex-col gap-3 overflow-hidden border border-neutral-200 bg-white text-left shadow-sm ${
                    mode === "preview"
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }`}
                  style={{
                    x: cardLeft,
                    y: cardTop,
                    width: cardW,
                    height: cardH,
                    rotate,
                    transformOrigin: "50% 100%",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    padding: PREVIEW_PADDING,
                    paddingBottom: PREVIEW_PADDING,
                    borderRadius: PREVIEW_RADIUS,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    padding:
                      mode === "modal" ? EXPANDED_PADDING : PREVIEW_PADDING,
                    paddingBottom:
                      mode === "modal"
                        ? EXPANDED_PADDING + 20
                        : PREVIEW_PADDING,
                    borderRadius:
                      mode === "modal" ? EXPANDED_RADIUS : PREVIEW_RADIUS,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] },
                  }}
                  transition={{
                    default: SIZE_SPRING,
                    opacity: { duration: 0.12, ease: [0.4, 0, 0.2, 1] },
                    scale: {
                      type: "spring",
                      stiffness: 600,
                      damping: 32,
                      mass: 0.7,
                    },
                  }}
                  onClick={(e) => {
                    if (modeRef.current === "modal") e.stopPropagation()
                  }}
                >
                  <TalkCardContent
                    talk={activeTalk}
                    isExpanded={mode === "modal"}
                  />

                  {/* 关闭按钮：preview 隐藏、modal 显示 */}
                  <button
                    type="button"
                    aria-label="关闭"
                    onClick={(e) => {
                      e.stopPropagation()
                      closeOverlay()
                    }}
                    className={`absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-white/80 text-neutral-500 backdrop-blur transition-all duration-200 hover:bg-white hover:text-neutral-900 ${
                      mode === "modal"
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <X className="size-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body,
        )}
    </DemoBox>
  )
}
