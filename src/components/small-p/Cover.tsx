"use client"

import { useEffect, useId, useState } from "react"
import { motion } from "motion/react"

/**
 * Playground 默认箭头（与 playground/src/cursors/default.svg 路径一致；热点 15×15）。
 * 名称条应对热点 +13/+13（见 MultiplayerCursors），勿用 SVG 原点 13/13，否则会盖住箭头。
 */
function PlaygroundDefaultCursorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.35))" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9394 14.9394C15.3553 14.5235 15.976 14.389 16.5267 14.5955L27.5267 18.7205C28.1416 18.9511 28.535 19.5548 28.4976 20.2103C28.4603 20.8659 28.0009 21.421 27.3638 21.5803L22.737 22.737L21.5803 27.3638C21.421 28.0009 20.8659 28.4603 20.2103 28.4976 19.5548 28.535 18.9511 28.1416 18.7205 27.5267L14.5955 16.5267C14.389 15.976 14.5235 15.3553 14.9394 14.9394Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1756 15.5319C15.992 15.463 15.7851 15.5078 15.6465 15.6465C15.5078 15.7851 15.463 15.992 15.5319 16.1756L19.6569 27.1756C19.7337 27.3805 19.935 27.5117 20.1535 27.4992C20.372 27.4868 20.557 27.3337 20.6101 27.1213L21.9124 21.9124L27.1213 20.6101C27.3337 20.557 27.4868 20.372 27.4992 20.1535C27.5117 19.935 27.3805 19.7337 27.1756 19.6569L16.1756 15.5319Z"
        fill="black"
      />
    </svg>
  )
}

/** 24×24 笔尖光标（用户提供的 SVG）；热点取路径起点附近 (8, 5) */
function PenNib24CursorIcon({ className }: { className?: string }) {
  const fid = useId().replace(/:/g, "")
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter
          id={fid}
          x="4"
          y="0.585785"
          width="17.4142"
          height="23.4142"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
      <g filter={`url(#${fid})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 5V17L11 14L13.5 19H14.5C14.5 19 15.1457 18.3496 15 18C14.3123 16.3496 12.5 13 12.5 13H16L8 5Z"
          fill="black"
        />
        <path
          fill="none"
          d="M17.207 13.5H13.333C13.5014 13.8181 13.712 14.2166 13.9365 14.6514C14.4749 15.6939 15.1092 16.961 15.4619 17.8076C15.5695 18.0659 15.5099 18.3186 15.4531 18.4746C15.3923 18.6419 15.299 18.7962 15.2158 18.916C15.1301 19.0395 15.0407 19.1473 14.9746 19.2227C14.9413 19.2607 14.9124 19.2914 14.8916 19.3135C14.8812 19.3246 14.8725 19.3344 14.8662 19.3408L14.8555 19.3516V19.3525H14.8545L14.708 19.5H13.1914L13.0527 19.2236L10.8623 14.8438L8.35352 17.3535L7.5 18.207V3.79297L17.207 13.5Z"
          stroke="white"
        />
      </g>
    </svg>
  )
}

/** 24×24 十字轴光标（用户提供的 SVG）；热点取几何中心 (12, 12) */
function AxisCross24CursorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.25))" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.004 12.96L11.004 11.976H12.006L12.006 5.97501H12.992L12.992 11.976H13.99V12.96H12.992V17.968H12.006V12.96H11.004Z"
        fill="black"
      />
      <path
        fill="none"
        d="M12.5059 6.7134C12.6729 6.2134 13.2429 5.4434 13.6129 5.1884C13.9629 4.9454 14.3229 4.7384 14.6669 4.6294C15.0879 4.4944 15.9749 4.5354 15.9749 4.5354"
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <path
        fill="none"
        d="M12.4717 6.7153C12.3187 6.1903 11.6877 5.3853 11.4067 5.1663C11.0707 4.9063 10.6977 4.7383 10.3537 4.6293C9.9317 4.4943 9.0447 4.5353 9.0447 4.5353"
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <path
        fill="none"
        d="M12.5059 17.2598C12.6729 17.7598 13.2429 18.5288 13.6129 18.7828C13.9629 19.0268 14.3229 19.2338 14.6669 19.3408C15.0879 19.4768 15.9749 19.4358 15.9749 19.4358"
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <path
        fill="none"
        d="M12.4717 17.2559C12.3187 17.7809 11.6877 18.5849 11.4067 18.8049C11.0707 19.0659 10.6977 19.2339 10.3537 19.3419C9.9317 19.4779 9.0447 19.4369 9.0447 19.4369"
        stroke="black"
        strokeWidth={1}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Playpad 画笔（CURSOR_MARKER_SVG）；热点 15×21 */
function PlaypadMarkerCursorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 35 34"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.35))" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5858 21.2929L15.0005 21.2929C13.6198 21.2929 12.5005 20.1736 12.5005 18.7929L12.5005 16.2071C12.5005 15.4115 12.8166 14.6484 13.3792 14.0858M13.3792 14.0858L24.7327 2.73223C25.709 1.75592 27.2919 1.75592 28.2683 2.73223L31.0611 5.52512C32.0375 6.50144 32.0375 8.08438 31.0611 9.06069L19.7071 20.4143C19.1445 20.9769 18.3814 21.2929 17.5858 21.2929"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5858 20.2929L15.0005 20.2929C14.1721 20.2929 13.5005 19.6213 13.5005 18.7929L13.5005 16.2071C13.5005 15.6767 13.7112 15.168 14.0863 14.7929L25.4398 3.43934C26.0256 2.85355 26.9754 2.85355 27.5611 3.43934L30.354 6.23223C30.9398 6.81802 30.9398 7.76778 30.354 8.35357L19 19.7072C18.6249 20.0822 18.1162 20.2929 17.5858 20.2929ZM29.6469 6.93933L26.854 4.14645C26.6588 3.95118 26.3422 3.95118 26.1469 4.14645L23.6039 6.6895L27.1038 10.1894L29.6469 7.64645C29.8422 7.45119 29.8422 7.1346 29.6469 6.93933ZM26.3967 10.8965L22.8968 7.39661L14.7934 15.5C14.6058 15.6875 14.5005 15.9419 14.5005 16.2071L14.5005 18.7929C14.5005 19.069 14.7243 19.2929 15.0005 19.2929L17.5858 19.2929C17.851 19.2929 18.1054 19.1876 18.2929 19L26.3967 10.8965Z"
        fill="black"
      />
    </svg>
  )
}

/** 名称条：白字、纯黑底；叠在箭头之上（z-1） */
function CursorNameBubble({
  name,
  labelLeft,
  labelTop,
}: {
  name: string
  labelLeft: number
  labelTop: number
}) {
  return (
    <div
      className="pointer-events-none absolute z-1 flex w-max flex-col overflow-hidden rounded bg-black px-1.5 py-px shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
      style={{ left: labelLeft, top: labelTop }}
    >
      <span className="text-[11px] leading-4 font-[550] tracking-[0.005em] text-white whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

type SlotKind = "default" | "marker" | "nib24" | "axis24"

/**
 * 名称条左上角 = 热点 + offset；画笔用更小 offset，让「小 p」更贴图标。
 * 其余与 Playground CursorBubble (+13,+13) 一致。
 */
const LABEL_FROM_HOTSPOT: Record<SlotKind, { dx: number; dy: number }> = {
  default: { dx: 13, dy: 13 },
  marker: { dx: 6, dy: 6 },
  nib24: { dx: 13, dy: 13 },
  axis24: { dx: 13, dy: 13 },
}

/** 画笔 viewBox 35×34、原热点 (15,21)；外框缩到 ≈32×31 与默认箭头体量对齐 */
const MARKER_VB = { vw: 35, vh: 34, vhx: 15, vhy: 21 }
const markerDisplay = { w: 32, h: 31 }
const markerHot = {
  w: markerDisplay.w,
  h: markerDisplay.h,
  hx: (MARKER_VB.vhx * markerDisplay.w) / MARKER_VB.vw,
  hy: (MARKER_VB.vhy * markerDisplay.h) / MARKER_VB.vh,
}

const SLOT_LAYOUT: Record<
  SlotKind,
  { w: number; h: number; hx: number; hy: number }
> = {
  default: { w: 32, h: 33, hx: 15, hy: 15 },
  marker: markerHot,
  nib24: { w: 24, h: 24, hx: 8, hy: 5 },
  axis24: { w: 24, h: 24, hx: 12, hy: 12 },
}

/** 左上起：1 默认、2 画笔、3 笔尖 24、4 十字轴 24 */
const SLOTS: { kind: SlotKind; name: string }[] = [
  { kind: "default", name: "小 p" },
  { kind: "marker", name: "小 p" },
  { kind: "nib24", name: "小 p" },
  { kind: "axis24", name: "小 p" },
]

const DRIFT = [
  {
    x: [0, 5, -4, 2, 0],
    y: [0, -4, 4, -2, 0],
    rotate: [0, 3.2, -2, 1.3, 0],
    duration: 13,
    delay: 0,
  },
  {
    x: [0, -4, 6, -2, 0],
    y: [0, 4, -5, 2, 0],
    rotate: [0, -2.4, 3, -1.2, 0],
    duration: 11,
    delay: 0.9,
  },
  {
    x: [0, 4, -5, 2, 0],
    y: [0, 5, -2, -3, 0],
    rotate: [0, 1.8, -3, 1.6, 0],
    duration: 14,
    delay: 1.8,
  },
  {
    x: [0, -5, 2, 4, 0],
    y: [0, -2, 5, -4, 0],
    rotate: [0, -2.8, 1.8, 2.2, 0],
    duration: 12,
    delay: 0.55,
  },
] as const

function SlotCursorIcon({
  kind,
  className,
}: {
  kind: SlotKind
  className: string
}) {
  if (kind === "default") {
    return <PlaygroundDefaultCursorIcon className={className} />
  }
  if (kind === "marker") {
    return <PlaypadMarkerCursorIcon className={className} />
  }
  if (kind === "nib24") {
    return <PenNib24CursorIcon className={className} />
  }
  return <AxisCross24CursorIcon className={className} />
}

const Cover = () => {
  /** `cellOrder[c]` = 第 c 个格子当前展示第几个光标（SLOTS 下标） */
  const [cellOrder, setCellOrder] = useState<number[]>([0, 1, 2, 3])

  useEffect(() => {
    const tick = () => {
      if (Math.random() > 0.42) return
      setCellOrder((prev) => {
        const a = Math.floor(Math.random() * 4)
        let b = Math.floor(Math.random() * 4)
        if (b === a) b = (a + 1) % 4
        const next = [...prev]
        ;[next[a], next[b]] = [next[b], next[a]]
        return next
      })
    }
    const id = window.setInterval(tick, 9500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative">
      <div className="pt-[100%]" />
      <div className="absolute inset-0 overflow-hidden rounded-full bg-neutral-200/50">
        <div className="absolute top-[10%] bottom-[12%] left-[5.5%] right-[14.5%] grid grid-cols-2 grid-rows-2">
          {[0, 1, 2, 3].map((cell) => {
            const slotIdx = cellOrder[cell]
            const slot = SLOTS[slotIdx]
            const cfg = DRIFT[slotIdx]
            const L = SLOT_LAYOUT[slot.kind]
            const lab = LABEL_FROM_HOTSPOT[slot.kind]
            const labelLeft = L.hx + lab.dx
            const labelTop = L.hy + lab.dy
            return (
              <div key={cell} className="relative min-h-0 min-w-0">
                <motion.div
                  key={slotIdx}
                  className="pointer-events-none absolute left-1/2 top-1/2"
                  style={{
                    width: L.w,
                    height: L.h,
                    marginLeft: -L.hx,
                    marginTop: -L.hy,
                    transformOrigin: `${L.hx}px ${L.hy}px`,
                  }}
                  animate={{
                    x: [...cfg.x],
                    y: [...cfg.y],
                    rotate: [...cfg.rotate],
                  }}
                  transition={{
                    duration: cfg.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: cfg.delay,
                  }}
                >
                  <div className="relative size-full overflow-visible">
                    <SlotCursorIcon
                      kind={slot.kind}
                      className="absolute left-0 top-0 z-0 size-full"
                    />
                    <CursorNameBubble
                      name={slot.name}
                      labelLeft={labelLeft}
                      labelTop={labelTop}
                    />
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cover
