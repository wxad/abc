"use client"

import DemoBox from "@/components/DemoBox"
import { Link as LinkIcon, MousePointerClick, Play, Users, X } from "lucide-react"
import { motion } from "motion/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export const SPRING_TRANSITION = {
  type: "spring" as const,
  visualDuration: 0.3,
  bounce: 0.17,
  restDelta: 0.001,
}

export const FADE_TRANSITION = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as const,
}

export type Talk = {
  id: string
  title: string
  issueNumber: number
  date: string
  speakers: string[]
  tags: string[]
  materialItems: { title: string; url: string }[]
  meetingReplayUrl: string
  images: string[]
}

export const TALKS: Talk[] = [
  {
    id: "issue-40",
    title: "新创意设计分享",
    issueNumber: 40,
    date: "2025-07-25",
    speakers: ["宇威", "Qing"],
    tags: ["项目小结", "实操交流", "AI"],
    materialItems: [
      {
        title: "新创意设计分享",
        url: "https://drive.weixin.qq.com/s?k=AJEAIQdfAAo8O7YczN",
      },
    ],
    meetingReplayUrl:
      "https://meeting.tencent.com/wework/cloud-record/share?id=900750fa-af2c-4a3a-8d36-49fafff4ac31&record_type=2&hide_more_btn=true&from=qywx",
    images: [
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/1779709431509-31c4dddceff84598.png",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709436773-1ebe244793801ed7.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709438255-d5351dc49349fd5c.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709439528-e805f739b3c291c3.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709440906-02138671456dbc71.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709442394-099c9f1845d987c5.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709444035-10f8d69a36f31ea6.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-40/1779709445220-ceaef4b79935c1bb.webp",
    ],
  },
  {
    id: "issue-30",
    title: "2024 评选 & 榜单项目设计分享",
    issueNumber: 30,
    date: "2025-03-20",
    speakers: ["子豪", "赤子", "毅杰"],
    tags: ["项目小结", "AI", "实操交流"],
    materialItems: [
      {
        title: "2024 评选 & 榜单项目设计分享",
        url: "https://drive.weixin.qq.com/s?k=AJEAIQdfAAo2BVKtgx",
      },
    ],
    meetingReplayUrl:
      "https://meeting.tencent.com/wework/cloud-record/share?id=abd1db08-5c77-4c29-8a15-251860f7bb93&hide_more_btn=true",
    images: [
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/1779709851882-157c0ea8af4a6870.png",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-30/1779709853313-cf9acf91e55b5af0.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-30/1779709854354-b101b5eac335f1de.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-30/1779709855901-d61d960b78c1d48c.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-30/1779709856937-deb2727528004dfa.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-30/1779709858689-644c0f267744e005.webp",
      "https://wxa.wxs.qq.com/wxad-design/yijie/interactive-design-in-ai/talks/no-30/1779709859381-6e7618d3a348e1f2.webp",
    ],
  },
]

const detailLinkClass =
  "inline-flex items-center gap-1 text-sm font-medium underline decoration-neutral-900/25 underline-offset-2 hover:text-neutral-500 hover:decoration-neutral-900/45"

// ─── Scatter 坐标系（550 设计画布，16:9） ───
const DESIGN_W = 550
const DESIGN_H = (DESIGN_W * 9) / 16
const PADDING_BOTTOM_PCT = (9 / 16) * 100

const SLOTS: ReadonlyArray<{
  x: number
  y: number
  w: number
  r: number
  z: number
}> = [
  { x: 132, y: 90, w: 264, r: -7, z: 9 },
  { x: -13.5, y: -20.71875, w: 231, r: -83, z: 5 },
  { x: -183.5, y: 229.28125, w: 231, r: -33, z: 4 },
  { x: 151.5, y: -89.78125, w: 121, r: 30, z: 6 },
  { x: 162.5, y: 266.40625, w: 99, r: 10, z: 6 },
  { x: 367.5, y: -14.53125, w: 209, r: -30, z: 7 },
  { x: 465, y: 180.9375, w: 154, r: 20, z: 4 },
  { x: 417, y: 313.3125, w: 110, r: -37, z: 6 },
]

const EXPANDED_CARD_W = SLOTS[0].w
const CENTER_CARD_EXPAND = 1.3

function expandedCenterSlotPose() {
  const slot = SLOTS[0]
  const baseW = slot.w
  const w = baseW * CENTER_CARD_EXPAND
  const cx = slot.x + baseW / 2
  const cy = slot.y + (baseW * 9) / 32
  return { width: w, x: cx - w / 2, y: cy - (w * 9) / 32, rotate: slot.r }
}

function expandedPoseFromSlot(slot: {
  x: number
  y: number
  w: number
  r: number
}) {
  const dw = slot.w - EXPANDED_CARD_W
  return {
    width: EXPANDED_CARD_W,
    x: slot.x + dw / 2,
    y: slot.y + (dw * 9) / 32,
    rotate: slot.r,
  }
}

function scatterSlotSrc(images: string[], index: number): string | null {
  if (index === 0) return images[0] ?? null
  if (images.length <= 1) return null
  const n = images.length - 1
  return images[1 + ((index - 1) % n)] ?? null
}

const TRIPLE_SLOT_X = {
  x: -33.5,
  y: -240.71875,
  w: 231,
  r: -103,
  z: 5,
} as const

type TriplePos = "x" | "2" | "3"
const TRIPLE_RING: readonly TriplePos[] = ["x", "2", "3"]

function triplePosFor(cardIx: number): TriplePos {
  return TRIPLE_RING[cardIx % 3]!
}

function tripleZForPos(pos: TriplePos): number {
  if (pos === "x") return TRIPLE_SLOT_X.z
  if (pos === "2") return SLOTS[1].z
  return SLOTS[2].z
}

const TRIPLE_POSES: Record<
  TriplePos,
  ReturnType<typeof expandedPoseFromSlot>
> = {
  x: expandedPoseFromSlot(TRIPLE_SLOT_X),
  "2": expandedPoseFromSlot(SLOTS[1]),
  "3": expandedPoseFromSlot(SLOTS[2]),
}

// ─── ScatterCollage ───
function ScatterCollage({
  images,
  isExpanded = false,
  measureMode = false,
  className,
}: {
  images: string[]
  isExpanded?: boolean
  measureMode?: boolean
  className?: string
}) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(0)

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return
    const read = () => {
      const w = el.offsetWidth
      setContainerW((prev) => (Math.abs(prev - w) < 1 ? prev : w))
    }
    read()
    const ro = new ResizeObserver(() => read())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (!images.length) return null

  const expanded = isExpanded || measureMode
  const scale = containerW > 0 ? containerW / DESIGN_W : 1
  // measureMode 下立刻渲染拼贴，保证测高不为 0
  const showCollage = measureMode || containerW > 0

  const slots = SLOTS.map((slot, i) => ({
    ...slot,
    src: scatterSlotSrc(images, i),
  }))

  const url2 = scatterSlotSrc(images, 1)
  const url3 = scatterSlotSrc(images, 2)
  const tripleGroupActive = url2 !== null && url3 !== null

  const tripleCards = useMemo(() => {
    if (!url2 || !url3) return []
    return [
      { id: "triple-a", cardIx: 0 as const, src: url3 },
      { id: "triple-b", cardIx: 1 as const, src: url2 },
      { id: "triple-c", cardIx: 2 as const, src: url3 },
    ]
  }, [url2, url3])

  const tripleTransition = expanded
    ? SPRING_TRANSITION
    : {
        opacity: FADE_TRANSITION,
        x: { duration: 0 },
        y: { duration: 0 },
        rotate: { duration: 0 },
        width: { duration: 0 },
      }

  return (
    <div ref={measureRef} className={`min-w-0 rounded-xl ${className || ""}`}>
      {!showCollage ? (
        <div
          aria-hidden
          className="relative w-full overflow-hidden rounded-xl"
          style={{ paddingBottom: `${PADDING_BOTTOM_PCT}%` }}
        >
          <img
            src={images[0]}
            alt=""
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      ) : (
        <motion.div
          initial={false}
          className="overflow-hidden"
          animate={{
            marginLeft: expanded ? -30 : 0,
            marginRight: expanded ? -30 : 0,
            marginTop: expanded ? -30 : 0,
          }}
          transition={SPRING_TRANSITION}
        >
          <div
            className="relative w-full"
            style={{ paddingBottom: `${PADDING_BOTTOM_PCT}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div
                className="relative shrink-0"
                style={{
                  width: DESIGN_W,
                  height: DESIGN_H,
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                }}
              >
                {slots.map((slot, i) => {
                  if (slot.src == null) return null
                  if (tripleGroupActive && (i === 1 || i === 2)) return null

                  const isFirst = i === 0
                  const dw = slot.w - EXPANDED_CARD_W
                  const xAligned = slot.x + dw / 2
                  const yAligned = slot.y + (dw * 9) / 32

                  const expandedPose = isFirst
                    ? expandedCenterSlotPose()
                    : {
                        width: EXPANDED_CARD_W,
                        x: xAligned,
                        y: yAligned,
                        rotate: slot.r,
                      }

                  return (
                    <motion.img
                      key={i}
                      src={slot.src}
                      alt=""
                      draggable={false}
                      className={`absolute left-0 top-0 max-w-none rounded-xl object-cover ring ${
                        expanded ? "ring-black/10" : "ring-transparent"
                      }`}
                      style={{
                        aspectRatio: "16 / 9",
                        zIndex: expanded ? slot.z : isFirst ? 10 : 0,
                        pointerEvents: isFirst || expanded ? "auto" : "none",
                        willChange: isFirst
                          ? "transform"
                          : expanded
                            ? "transform, opacity"
                            : "auto",
                      }}
                      initial={false}
                      animate={
                        isFirst
                          ? expanded
                            ? { ...expandedPose, opacity: 1 }
                            : {
                                width: DESIGN_W,
                                x: 0,
                                y: 0,
                                rotate: 0,
                                opacity: 1,
                              }
                          : {
                              ...expandedPose,
                              opacity: expanded ? 1 : 0,
                            }
                      }
                      transition={
                        isFirst
                          ? SPRING_TRANSITION
                          : {
                              opacity: FADE_TRANSITION,
                              x: { duration: 0 },
                              y: { duration: 0 },
                              rotate: { duration: 0 },
                              width: { duration: 0 },
                            }
                      }
                    />
                  )
                })}

                {tripleGroupActive &&
                  tripleCards.map((card) => {
                    const pos = triplePosFor(card.cardIx)
                    const pose = TRIPLE_POSES[pos]
                    return (
                      <motion.img
                        key={card.id}
                        src={card.src}
                        alt=""
                        draggable={false}
                        className={`absolute left-0 top-0 max-w-none rounded-xl object-cover ring ${
                          expanded ? "ring-black/10" : "ring-transparent"
                        }`}
                        style={{
                          aspectRatio: "16 / 9",
                          zIndex: expanded ? tripleZForPos(pos) : 0,
                          pointerEvents: expanded ? "auto" : "none",
                          willChange: expanded ? "transform, opacity" : "auto",
                        }}
                        initial={false}
                        animate={{
                          ...pose,
                          opacity: expanded ? 1 : 0,
                        }}
                        transition={tripleTransition}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─── TalkCardContent ───
// measureMode：渲染在离屏元素里，详情区参与布局，用于测得展开真实高度
export function TalkCardContent({
  talk,
  isExpanded = false,
  measureMode = false,
}: {
  talk: Talk
  isExpanded?: boolean
  measureMode?: boolean
}) {
  const expanded = isExpanded || measureMode
  const hasMultipleImages = talk.images.length > 1

  return (
    <>
      <ScatterCollage
        images={talk.images}
        isExpanded={isExpanded}
        measureMode={measureMode}
      />
      <div
        className="relative mx-1 min-w-0 transition-[transform,opacity] duration-300"
        style={{
          transform:
            isExpanded && hasMultipleImages ? "translateY(20px)" : undefined,
          willChange: isExpanded ? "transform" : "auto",
        }}
      >
        <h3 className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold">
          {talk.title}
        </h3>
        <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
          <span className="shrink-0">
            NO.{talk.issueNumber} · {talk.date}
          </span>
          <div className="flex min-w-0 flex-nowrap items-center justify-end gap-1">
            <span className="shrink-0 whitespace-nowrap rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              {talk.tags[0]}
            </span>
            {talk.tags.length > 1 && (
              <motion.div
                initial={false}
                animate={{
                  width: expanded ? "auto" : 0,
                  opacity: expanded ? 1 : 0,
                  marginLeft: expanded ? 0 : -4,
                }}
                transition={SPRING_TRANSITION}
                className="flex shrink-0 items-center gap-1 overflow-hidden"
              >
                {talk.tags.slice(1).map((tag) => (
                  <span
                    key={tag}
                    className="shrink-0 whitespace-nowrap rounded bg-neutral-100 px-1.5 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* 详情区：默认 absolute 紧贴标题行下方（不占位，由卡片 overflow-hidden 裁剪）；
            测量模式下改为 static 参与布局，用于测得展开真实高度 */}
        <div
          className={
            measureMode
              ? "mt-3 space-y-4"
              : "absolute inset-x-0 top-full mt-3 space-y-4 transition-opacity duration-200"
          }
          style={
            measureMode
              ? undefined
              : {
                  opacity: isExpanded ? 1 : 0,
                  pointerEvents: isExpanded ? "auto" : "none",
                  willChange: isExpanded ? "opacity" : "auto",
                }
          }
        >
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 size-4 shrink-0 text-neutral-500" />
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                分享人
              </p>
              <p className="mt-0.5 text-sm font-medium">
                {talk.speakers.join("、")}
              </p>
            </div>
          </div>

          {talk.materialItems.length > 0 && (
            <div className="flex items-start gap-3">
              <LinkIcon className="mt-0.5 size-4 shrink-0 text-neutral-500" />
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400">
                  微盘资料
                </p>
                <div className="mt-0.5 flex flex-col gap-1.5">
                  {talk.materialItems.map((item, idx) => (
                    <a
                      key={`${item.url}-${idx}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={detailLinkClass}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {talk.meetingReplayUrl && (
            <div className="flex items-start gap-3">
              <Play className="mt-0.5 size-4 shrink-0 text-neutral-500" />
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400">
                  会议回放
                </p>
                <a
                  href={talk.meetingReplayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-0.5 ${detailLinkClass}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  观看回放
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Card dimensions（与 tadabase 对齐） ───
const CARD_W = 290
export const EXPANDED_W = 550
export const EXPANDED_PADDING = 30
export const FALLBACK_EXPANDED_HEIGHT = 568

// ─── TalkCard：占位 + 离屏测量 + motion 卡片，单卡片自洽 ───
function TalkCard({
  talk,
  isExpanded,
  isActive,
  onOpen,
  onClose,
  onSettled,
}: {
  talk: Talk
  isExpanded: boolean
  /** 由父级根据 `lastActiveId` 决定，控制 zIndex / willChange；
   *  保证「切换到另一张卡时」上一张能立刻让位 */
  isActive: boolean
  onOpen: () => void
  onClose: () => void
  /** 归位动画跑完通知父级，用于清理 lastActiveId */
  onSettled: () => void
}) {
  const placeholderRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [collapsedSize, setCollapsedSize] = useState({ w: 0, h: 0 })
  const [expandedHeight, setExpandedHeight] = useState<number>(
    FALLBACK_EXPANDED_HEIGHT,
  )

  // 测量展开真实高度（依赖 talk 内容）
  useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const measure = () => {
      const h = el.offsetHeight
      if (h > 0) setExpandedHeight(h)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [talk])

  // 计算占位元素到 viewport 中心的位移
  useEffect(() => {
    const el = placeholderRef.current
    if (!el) return

    const compute = () => {
      const rect = el.getBoundingClientRect()
      setCollapsedSize({ w: rect.width, h: rect.height })
      if (isExpanded) {
        setOffset({
          x: window.innerWidth / 2 - (rect.left + EXPANDED_W / 2),
          y: window.innerHeight / 2 - (rect.top + expandedHeight / 2),
        })
      } else {
        setOffset({ x: 0, y: 0 })
      }
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [isExpanded, expandedHeight])

  return (
    <div
      ref={placeholderRef}
      className="relative"
      style={{ width: CARD_W, maxWidth: "100%" }}
    >
      {/* 占位：不可见内容撑起自然高度，保持网格流 */}
      <div
        aria-hidden
        className="invisible flex min-w-0 flex-col gap-3 rounded-3xl border p-2.5"
      >
        <TalkCardContent talk={talk} />
      </div>

      {/* 离屏测量元素：完全按展开尺寸/padding 渲染，详情区 static 参与布局，
          用于测得真实展开高度。不可见、不可交互、不影响布局 */}
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
        <TalkCardContent talk={talk} measureMode />
      </div>

      {/* 真正的卡片：始终 absolute；尺寸 & 位移 & padding 全部交给 motion 统一驱动 */}
      <motion.div
        onClick={isExpanded ? undefined : onOpen}
        initial={false}
        animate={{
          width: isExpanded ? EXPANDED_W : collapsedSize.w || "100%",
          height: isExpanded ? expandedHeight : collapsedSize.h || "100%",
          x: offset.x,
          y: offset.y,
          padding: isExpanded ? EXPANDED_PADDING : 10,
          paddingBottom: isExpanded ? EXPANDED_PADDING + 20 : 10,
          gap: 12,
        }}
        transition={{
          ...SPRING_TRANSITION,
          // 打开时 x 先到位、y 随后落向中央 → 下弧；
          // 关闭时 x 先归位、y 随后回到网格 → 上弧
          y: { ...SPRING_TRANSITION, visualDuration: 0.4 },
        }}
        onAnimationComplete={() => {
          // 归位动画跑完通知父级，把 lastActiveId 落回 null；
          // 父级如果在期间已经切到另一张卡，则会忽略本次通知
          if (!isExpanded) onSettled()
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: isActive ? 60 : 1,
          willChange: isActive ? "transform, width, height" : "auto",
        }}
        className={`group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white text-left transition-shadow ${
          isExpanded ? "cursor-default" : "cursor-pointer hover:shadow-sm"
        }`}
      >
        <TalkCardContent talk={talk} isExpanded={isExpanded} />

        {/* 右上角 X 按钮，仅展开时显示 */}
        <button
          type="button"
          aria-label="关闭"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className={`absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-white/80 text-neutral-500 backdrop-blur transition-all duration-200 hover:bg-white hover:text-neutral-900 ${
            isExpanded ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <X className="size-4" />
        </button>
      </motion.div>
    </div>
  )
}

// ─── CardToDialog demo ───
export default function CardToDialog() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  // 最近一次被激活（点击打开）的卡片 id；
  // - 关闭时不清空：让正在归位的卡片保持高 zIndex，避免钻到遮罩下面
  // - 切到另一张时立即更新：上一张归位中的卡片同帧让出 zIndex，给新卡片让位
  const [lastActiveId, setLastActiveId] = useState<string | null>(null)

  const handleOpen = useCallback((id: string) => {
    setExpandedId(id)
    setLastActiveId(id)
  }, [])

  const handleClose = useCallback(() => {
    setExpandedId(null)
  }, [])

  // 某张卡的归位动画跑完。如果它仍是 lastActiveId，说明用户没再切到别的卡，
  // 可以安全清空；否则忽略（lastActiveId 已经指向新卡片）
  const handleSettled = useCallback((id: string) => {
    setLastActiveId((prev) => (prev === id ? null : prev))
  }, [])

  // ESC 关闭
  const expandedIdRef = useRef(expandedId)
  expandedIdRef.current = expandedId

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !expandedIdRef.current) return
      e.preventDefault()
      setExpandedId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const isAnyExpanded = expandedId !== null

  // 弹出时禁止页面滚动；同时把消失的滚动条宽度补成 body padding-right，
  // 避免内容因滚动条收起而产生横向位移（影响卡片到屏幕中心的位移计算）
  // 用 useLayoutEffect 保证锁定先于 TalkCard 的 offset 计算（useEffect）发生
  useLayoutEffect(() => {
    if (!isAnyExpanded) return
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
  }, [isAnyExpanded])

  return (
    <DemoBox className="overflow-visible">
      <div className="flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <MousePointerClick className="size-4" />
        点击卡片体验
      </div>
      <div className="relative flex h-full items-center justify-center p-6 pt-16">
        <div className="flex flex-wrap items-start justify-center gap-6">
          {TALKS.map((talk) => (
            <TalkCard
              key={talk.id}
              talk={talk}
              isExpanded={expandedId === talk.id}
              isActive={lastActiveId === talk.id}
              onOpen={() => handleOpen(talk.id)}
              onClose={handleClose}
              onSettled={() => handleSettled(talk.id)}
            />
          ))}
        </div>
      </div>

      {/* 遮罩：fixed 覆盖全屏 */}
      <div
        onClick={handleClose}
        style={{ willChange: isAnyExpanded ? "opacity" : "auto" }}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isAnyExpanded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </DemoBox>
  )
}
