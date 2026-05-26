"use client"

import DemoBox from "@/components/DemoBox"
import { AnimatePresence, motion } from "motion/react"
import { Check, MousePointerClick, Plus, Trash2 } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"

type EffectType = "sweep" | "fly" | "deblur" | "confirm"

const PULSE_DURATION = 0.4
const PULSE_STAGGER = 0.04
const PULSE_NEW_DELAY = 0.04
const PULSE_HEIGHT_DELAY = 0.2

interface TagDef {
  label: string
  effect: EffectType
}

interface ItemDef {
  title: string
  desc: string
  tags: TagDef[]
}

const ITEMS: ItemDef[] = [
  {
    title: "标签组一",
    desc: "锁定男性核心受众，匹配香奈儿蔚蓝男士香水的主要使用群体，同时覆盖男性送礼人群。",
    tags: [
      { label: "示例一: 简单扫光", effect: "sweep" },
      { label: "示例二: 飞到右边", effect: "fly" },
    ],
  },
  {
    title: "标签组二",
    desc: "覆盖高消费力女性群体，精准触达美妆护肤品类高频购买用户，提升转化效率。",
    tags: [
      { label: "示例三: 脉冲展开", effect: "deblur" },
      { label: "示例四: 文字右移", effect: "confirm" },
    ],
  },
]

function getEffect(label: string): EffectType {
  for (const item of ITEMS) {
    const tag = item.tags.find((t) => t.label === label)
    if (tag) return tag.effect
  }
  return "sweep"
}

// ── Flying element (offset-path arc animation) ──────────────────────

interface FlyData {
  id: string
  tag: string
  path: string
  startW: number
  startH: number
  endW: number
  endH: number
}

const FlyingElement: React.FC<{
  data: FlyData
  onDone: (id: string, tag: string) => void
}> = ({ data, onDone }) => {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setStarted(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  const active = started

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        offsetPath: `path('${data.path}')`,
        offsetRotate: "0deg",
        offsetDistance: active ? "100%" : "0%",
        width: active ? data.endW : data.startW,
        height: active ? data.endH : data.startH,
        opacity: active ? 1 : 0,
        transition: active
          ? [
              "offset-distance 0.5s cubic-bezier(0.33,1,0.68,1)",
              "width 0.5s cubic-bezier(0.33,1,0.68,1)",
              "height 0.5s cubic-bezier(0.33,1,0.68,1)",
              "background-color 0.5s cubic-bezier(0.33,1,0.68,1)",
              "border-radius 0.5s cubic-bezier(0.33,1,0.68,1)",
              "opacity 0.15s ease-out",
            ].join(",")
          : "none",
        overflow: "hidden",
        borderRadius: active ? "0 0 12px 12px" : 6,
        backgroundColor: active ? "#F5F8FF" : "#fff",
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === "offset-distance") {
          onDone(data.id, data.tag)
        }
      }}
    >
      <div style={{ padding: "8px 16px" }}>
        <div
          style={{
            fontSize: 14,
            lineHeight: "22px",
            marginBottom: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.tag}
        </div>
        <div
          style={{
            fontSize: 12,
            lineHeight: "20px",
            color: "#898B8F",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          时间范围：2025-10-16 ~ 2025-11-15；换机前：VIVO；换机后：苹果
        </div>
      </div>
    </div>
  )
}

// ── Row item in the right panel ──────────────────────────────────────

function TargetRow({ title }: { title: string }) {
  return (
    <div className="px-4 py-2">
      <div className="mb-1 text-[14px] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
      <div className="text-[12px] leading-[20px] text-[#898B8F] whitespace-nowrap overflow-hidden text-ellipsis">
        时间范围：2025-10-16 ~ 2025-11-15；换机前：VIVO；换机后：苹果
      </div>
    </div>
  )
}

function StaticGroup({ title }: { title: string }) {
  return (
    <div className="bg-[#F6F7F8] rounded-xl">
      <div className="flex items-center justify-between pl-4 pr-1.5 h-[46px]">
        <div className="text-[14px] font-semibold">{title}</div>
        <button className="flex items-center justify-center size-8 rounded-md text-neutral-500 hover:bg-neutral-100 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
      <TargetRow title="标签：用户属性/设备信息/换机人群" />
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────

export default function AutocompleteCustomize() {
  const [value, setValue] = useState("")

  const [addedTags, setAddedTags] = useState<string[]>([])
  const [flying, setFlying] = useState<FlyData[]>([])
  const [pending, setPending] = useState<Set<string>>(new Set())
  const [sweepingTags, setSweepingTags] = useState<Set<string>>(new Set())
  const [pulsingTag, setPulsingTag] = useState<string | null>(null)
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const srcRefs = useRef<Map<string, HTMLElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (label: string) => {
      if (addedTags.includes(label)) {
        setAddedTags((p) => p.filter((t) => t !== label))
        setPending((p) => {
          const s = new Set(p)
          s.delete(label)
          return s
        })
        setSweepingTags((p) => {
          const s = new Set(p)
          s.delete(label)
          return s
        })
        setFlying((p) => p.filter((f) => f.tag !== label))
        return
      }

      const effect = getEffect(label)

      if (effect === "fly") {
        const srcEl = srcRefs.current.get(label)
        const cEl = containerRef.current
        const lEl = landingRef.current
        if (!srcEl || !cEl || !lEl) return

        const sr = srcEl.getBoundingClientRect()
        const cr = cEl.getBoundingClientRect()
        const lr = lEl.getBoundingClientRect()

        const endW = cr.width
        const endH = 62

        const sx = sr.left + sr.width / 2
        const sy = sr.top + sr.height / 2
        const ex = cr.left + cr.width / 2
        const ey = lr.top + endH / 2

        const cx = (sx + ex) / 2
        const cy = Math.min(sy, ey) - 100 - Math.abs(ex - sx) * 0.15

        const path = `M ${sx},${sy} Q ${cx},${cy} ${ex},${ey}`

        setFlying((p) => [
          ...p,
          {
            id: `fly-${Date.now()}`,
            tag: label,
            path,
            startW: sr.width,
            startH: sr.height,
            endW,
            endH,
          },
        ])
        setPending((p) => new Set(p).add(label))
        setAddedTags((p) => [...p, label])
      } else if (effect === "deblur") {
        setAddedTags((p) => [...p, label])
        setPulsingTag(label)
        clearTimeout(pulseTimerRef.current)
        pulseTimerRef.current = setTimeout(() => setPulsingTag(null), 1200)
      } else if (effect === "confirm") {
        setAddedTags((p) => [...p, label])
      } else {
        setAddedTags((p) => [...p, label])
        setSweepingTags((p) => new Set(p).add(label))
      }
    },
    [addedTags],
  )

  const handleFlyDone = useCallback((id: string, tag: string) => {
    setFlying((p) => p.filter((f) => f.id !== id))
    setPending((p) => {
      const s = new Set(p)
      s.delete(tag)
      return s
    })
  }, [])

  return (
    <DemoBox className="pt-12">
      <div className="flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <MousePointerClick className="size-4" />
        点击标签体验
      </div>
      <style>{`
        @keyframes rowPulse {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(1.03); }
        }
      `}</style>
      <div className="flex min-w-[700px] gap-4 p-4">
        {/* ── Left panel ─────────────────────────────────────────── */}
        <div className="flex-1 h-[600px] bg-white rounded-xl overflow-y-auto">
          <div className="p-5 pr-4">
            {/* Search input (replacing AutoComplete) */}
            <div
              className="relative mb-4 w-full flex items-center"
              style={{
                height: 64,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                padding: "13px 24px",
                background: "#fff",
              }}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="搜索标签"
                className="flex-1 bg-transparent outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
              />
              <div className="relative -right-2 flex size-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer transition-colors flex-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clipPath="url(#clip0_5388_18893)">
                    <path
                      d="M12 12L14.5 14.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 7.49999C13.5 10.8137 10.8137 13.5 7.5 13.5C4.18629 13.5 1.5 10.8137 1.5 7.49999C1.5 4.1863 4.18629 1.5 7.5 1.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 1L11.2211 1.59746C11.5109 2.38088 11.6559 2.7726 11.9417 3.05834C12.2274 3.3441 12.6191 3.48904 13.4026 3.77894L14 4.00001L13.4026 4.22109C12.6191 4.51098 12.2274 4.65594 11.9417 4.94168C11.6559 5.22743 11.5109 5.61915 11.2211 6.40257L11 7L10.7789 6.40257C10.4891 5.61915 10.3441 5.22743 10.0583 4.94168C9.77257 4.65594 9.38086 4.51098 8.59743 4.22109L8 4.00001L8.59743 3.77894C9.38086 3.48904 9.77257 3.3441 10.0583 3.05834C10.3441 2.7726 10.4891 2.38088 10.7789 1.59746L11 1Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5388_18893">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* AI 推荐标签 panel */}
            <div className="pt-4 pr-4 pb-5 pl-5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl">
              <div className="mb-2 flex items-center justify-between">
                <div
                  className="text-[16px] leading-[24px] font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "radial-gradient(100% 108.57% at 0% 0%, #628DFF 0%, #65B7FF 30%, #00A3EC 65%, #719BF1 100%)",
                  }}
                >
                  AI 推荐标签
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {ITEMS.map((item, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <div className="mb-2 text-[16px] leading-[24px] font-semibold text-[#1E3A8A]">
                        {item.title}
                      </div>
                      <div className="mb-2 text-[12px] leading-[20px] text-[#1E40AF]/70">
                        <span className="font-semibold">推荐理由：</span>
                        <span>{item.desc}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => {
                          const added = addedTags.includes(tag.label)
                          const isConfirm = tag.effect === "confirm"

                          return isConfirm ? (
                            <motion.div
                              key={tag.label}
                              layout
                              ref={(el: HTMLElement | null) => {
                                if (el) srcRefs.current.set(tag.label, el)
                              }}
                              className="relative h-[30px] text-[11px] bg-white rounded-md cursor-pointer overflow-hidden"
                              transition={{
                                layout: {
                                  duration: 0.3,
                                  ease: [0.25, 1, 0.5, 1],
                                },
                              }}
                              onClick={() => handleClick(tag.label)}
                            >
                              {/* invisible sizer */}
                              <div
                                className="flex items-center gap-2 px-3 whitespace-nowrap"
                                style={{ height: 0, overflow: "hidden" }}
                              >
                                {added ? "已添加至 定向组合 1" : tag.label}
                                <span className="shrink-0 flex">
                                  <Check size={14} color="transparent" />
                                </span>
                              </div>
                              {/* default layer */}
                              <div
                                className="absolute inset-0 flex items-center gap-2 px-3 whitespace-nowrap"
                                style={{
                                  color: added ? "#296BEF" : "#33373D",
                                  transition:
                                    "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.2s",
                                  transform: added
                                    ? "translateX(100%)"
                                    : "translateX(0)",
                                }}
                              >
                                {tag.label}
                                <span className="shrink-0 flex">
                                  <Plus
                                    size={14}
                                    color="rgba(51, 55, 61, 0.58)"
                                  />
                                </span>
                              </div>
                              {/* confirmation layer */}
                              <div
                                className="absolute inset-0 flex items-center gap-2 px-3 whitespace-nowrap"
                                style={{
                                  color: "#296BEF",
                                  transition:
                                    "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                                  opacity: added ? 1 : 0,
                                  transform: added
                                    ? "translateX(0)"
                                    : "translateX(-100%)",
                                }}
                              >
                                已添加至 定向组合 1
                                <span className="shrink-0 flex">
                                  <Check size={14} color="#296BEF" />
                                </span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key={tag.label}
                              ref={(el: HTMLElement | null) => {
                                if (el) srcRefs.current.set(tag.label, el)
                              }}
                              className="relative flex items-center gap-2 h-[30px] px-3 text-[11px] bg-white rounded-md cursor-pointer overflow-hidden"
                              animate={{
                                color: added ? "#296BEF" : "#33373D",
                              }}
                              transition={{ duration: 0.2 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleClick(tag.label)}
                            >
                              {tag.label}
                              <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                  key={added ? "check" : "plus"}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  {added ? (
                                    <Check size={14} color="#296BEF" />
                                  ) : (
                                    <Plus
                                      size={14}
                                      color="rgba(51, 55, 61, 0.58)"
                                    />
                                  )}
                                </motion.div>
                              </AnimatePresence>
                              {sweepingTags.has(tag.label) && (
                                <motion.div
                                  className="pointer-events-none absolute inset-0"
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "200%" }}
                                  transition={{
                                    duration: 0.6,
                                    ease: "easeInOut",
                                  }}
                                  onAnimationComplete={() => {
                                    setSweepingTags((p) => {
                                      const s = new Set(p)
                                      s.delete(tag.label)
                                      return s
                                    })
                                  }}
                                  style={{
                                    background:
                                      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
                                  }}
                                />
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                    {index !== ITEMS.length - 1 && (
                      <div className="h-px bg-[#DBEAFE]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel ────────────────────────────────────────── */}
        <div className="flex-none w-[320px] h-[600px] bg-white rounded-xl flex flex-col">
          <div className="flex items-center justify-between pl-6 pr-3 h-[60px] border-b border-neutral-100 flex-none">
            <div className="text-[16px] font-semibold">设置组合规则</div>
            <button className="flex items-center gap-1 px-2 h-8 text-sm text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors">
              <Plus size={14} />
              添加组合
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 p-6">
              {/* 定向组合 1 — dynamic */}
              <div
                className="relative overflow-hidden rounded-xl"
                ref={containerRef}
              >
                <div
                  className="flex items-center justify-between pl-4 pr-1.5 h-[46px] bg-[#F5F8FF] rounded-t-xl"
                  style={
                    pulsingTag
                      ? {
                          animation: `rowPulse ${PULSE_DURATION}s ease-in-out both`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-4 bg-[#D4E1FC] rounded-full">
                      <div className="size-2 bg-[#296BEF] rounded-full" />
                    </div>
                    <div className="text-[14px] font-semibold">定向组合 1</div>
                  </div>
                  <button className="flex items-center justify-center size-8 rounded-md text-neutral-500 hover:bg-neutral-100 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div
                  className="px-4 py-2 bg-[#F5F8FF]"
                  style={{
                    borderRadius: addedTags.length > 0 ? 0 : "0 0 12px 12px",
                    transition: "border-radius 0.25s ease-out",
                    ...(pulsingTag
                      ? {
                          animation: `rowPulse ${PULSE_DURATION}s ease-in-out ${PULSE_STAGGER}s both`,
                        }
                      : {}),
                  }}
                >
                  <div className="mb-1 text-[14px] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                    标签：用户属性/设备信息/换机人群
                  </div>
                  <div className="text-[12px] leading-[20px] text-[#898B8F] whitespace-nowrap overflow-hidden text-ellipsis">
                    时间范围：2025-10-16 ~
                    2025-11-15；换机前：VIVO；换机后：苹果
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {addedTags.map((tag, index) => {
                    const effect = getEffect(tag)
                    const isFly = effect === "fly"
                    const isDeblur = effect === "deblur"
                    const isConfirm = effect === "confirm"
                    const isFlying = isFly && pending.has(tag)
                    return (
                      <motion.div
                        key={tag}
                        initial={{
                          height: 0,
                          opacity: isDeblur ? 1 : isConfirm ? 1 : 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: isFlying ? 0 : 1,
                          borderRadius:
                            index === addedTags.length - 1
                              ? "0 0 12px 12px"
                              : "0",
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.25, ease: "easeOut" },
                            opacity: { duration: 0.15, ease: "easeOut" },
                          },
                        }}
                        transition={{
                          height: {
                            duration: isDeblur
                              ? 0.65
                              : isConfirm
                                ? 0.35
                                : isFly
                                  ? 0.4
                                  : 0.25,
                            ease: isDeblur
                              ? [0.22, 1, 0.36, 1]
                              : [0.25, 1, 0.5, 1],
                            delay: isDeblur ? PULSE_HEIGHT_DELAY : 0,
                          },
                          opacity: { duration: 0 },
                          borderRadius: { duration: 0.25, ease: "easeOut" },
                        }}
                        className={`overflow-hidden select-none ${isConfirm ? "" : "bg-[#F5F8FF]"}`}
                        style={
                          pulsingTag
                            ? {
                                animation: `rowPulse ${PULSE_DURATION}s ease-in-out ${
                                  tag === pulsingTag
                                    ? (2 + index) * PULSE_STAGGER +
                                      PULSE_NEW_DELAY
                                    : (2 + index) * PULSE_STAGGER
                                }s both`,
                              }
                            : undefined
                        }
                      >
                        {isConfirm ? (
                          <motion.div
                            className="relative px-4 py-2 overflow-hidden bg-[#F5F8FF]"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 1, 0.5, 1],
                              delay: 0.05,
                            }}
                          >
                            <div className="mb-1 text-[14px] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                              {tag}
                            </div>
                            <div className="text-[12px] leading-[20px] text-[#898B8F] whitespace-nowrap overflow-hidden text-ellipsis">
                              时间范围：2025-10-16 ~
                              2025-11-15；换机前：VIVO；换机后：苹果
                            </div>
                          </motion.div>
                        ) : isDeblur && tag === pulsingTag ? (
                          <div className="relative px-4 py-2 overflow-hidden">
                            <div className="mb-1 text-[14px] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                              {tag}
                            </div>
                            <div className="text-[12px] leading-[20px] text-[#898B8F] whitespace-nowrap overflow-hidden text-ellipsis">
                              时间范围：2025-10-16 ~
                              2025-11-15；换机前：VIVO；换机后：苹果
                            </div>
                            <motion.div
                              className="pointer-events-none absolute inset-0"
                              initial={{ x: "-100%" }}
                              animate={{ x: "200%" }}
                              transition={{
                                duration: 0.8,
                                ease: "easeInOut",
                                delay: PULSE_HEIGHT_DELAY + 0.1,
                              }}
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                              }}
                            />
                          </div>
                        ) : isDeblur ? (
                          <div className="px-4 py-2">
                            <div className="mb-1 text-[14px] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                              {tag}
                            </div>
                            <div className="text-[12px] leading-[20px] text-[#898B8F] whitespace-nowrap overflow-hidden text-ellipsis">
                              时间范围：2025-10-16 ~
                              2025-11-15；换机前：VIVO；换机后：苹果
                            </div>
                          </div>
                        ) : (
                          <div className="relative px-4 py-2 overflow-hidden">
                            <div className="mb-1 text-[14px] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                              {tag}
                            </div>
                            <div className="text-[12px] leading-[20px] text-[#898B8F] whitespace-nowrap overflow-hidden text-ellipsis">
                              时间范围：2025-10-16 ~
                              2025-11-15；换机前：VIVO；换机后：苹果
                            </div>
                            {!isFly && (
                              <motion.div
                                className="pointer-events-none absolute inset-0"
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{
                                  duration: 0.6,
                                  ease: "easeInOut",
                                  delay: 0.1,
                                }}
                                style={{
                                  background:
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                                }}
                              />
                            )}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
                <div ref={landingRef} />
              </div>

              <StaticGroup title="定向组合 2" />
            </div>
          </div>
        </div>
      </div>

      {/* Flying elements rendered at portal level to avoid clipping */}
      {flying.map((data) => (
        <FlyingElement key={data.id} data={data} onDone={handleFlyDone} />
      ))}
    </DemoBox>
  )
}
