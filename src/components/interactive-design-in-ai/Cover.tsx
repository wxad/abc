"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { motion } from "motion/react"

/* ─── 静态 Cover：代码卡 + 双光标 + 3D 平台 ─────────────────────── */

/**
 * 箭头光标（复用 small-p PlaygroundDefaultCursorIcon）
 * 白色填充 + 黑色描边，带 drop-shadow
 * 热点在 SVG 坐标 (15, 15)，即像素 (15, 15)
 */
function CursorArrow() {
  return (
    <svg
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
        d="M14.9394 14.9394C15.3553 14.5235 15.976 14.389 16.5267 14.5955L27.5267 18.7205C28.1416 18.9511 28.535 19.5548 28.4976 20.2103C28.4603 20.8659 28.0009 21.421 27.3638 21.5803L22.737 22.737L21.5803 27.3638C21.421 28.0009 20.8659 28.4603 20.2103 28.4976C19.5548 28.535 18.9511 28.1416 18.7205 27.5267L14.5955 16.5267C14.389 15.976 14.5235 15.3553 14.9394 14.9394Z"
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

/**
 * 光标 + 名称气泡
 * 结构与 small-p 一致：箭头 + absolute 定位的黑底名称条
 * 名称条偏移 = 热点(15,15) + (13,13) = (28, 28) from SVG top-left
 */
function Cursor({
  name,
  flipped,
}: {
  name: string
  /** 水平翻转箭头，名称条移到左下角 */
  flipped?: boolean
}) {
  return (
    <div
      className="relative"
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      <CursorArrow />
      <div
        className="absolute z-1 w-max rounded bg-black px-1.5 py-px shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
        style={
          flipped
            ? { left: 28, top: 28, transform: "scaleX(-1)" }
            : { left: 28, top: 28 }
        }
      >
        <span className="text-[11px] leading-4 font-[550] tracking-[0.005em] text-white whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  )
}

/* ─── 代码内容（模拟语法高亮） ─── */
function CodeBlock() {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-neutral-100 px-5 py-4 font-mono text-[13px] leading-[1.7] shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm">
      <Line>
        <Kw>const</Kw> spring <Op>=</Op> <Fn>useSpring</Fn>
        <Pn>(</Pn>targetX<Pn>,</Pn> <Pn>{"{"}</Pn>
      </Line>
      <Line indent={1}>
        stiffness<Op>:</Op> <Num>260</Num>
        <Pn>,</Pn> damping<Op>:</Op> <Num>26</Num>
      </Line>
      <Line>
        <Pn>{"}"}</Pn>
        <Pn>)</Pn>
        <Pn>;</Pn>
      </Line>
      <Line />
      <Line>
        <Kw>const</Kw> indicator <Op>=</Op> <Fn>measure</Fn>
        <Pn>(</Pn>activeTab<Pn>)</Pn>
        <Pn>;</Pn>
      </Line>
      <Line>
        <Fn>animate</Fn>
        <Pn>(</Pn>progress<Pn>,</Pn> target<Pn>,</Pn> <Pn>{"{"}</Pn>
      </Line>
      <Line indent={1}>
        duration<Op>:</Op> <Num>0.6</Num>
        <Pn>,</Pn>
      </Line>
      <Line indent={1}>
        ease<Op>:</Op> <Pn>[</Pn>
        <Num>0.16</Num>
        <Pn>,</Pn> <Num>1</Num>
        <Pn>,</Pn> <Num>0.3</Num>
        <Pn>,</Pn> <Num>1</Num>
        <Pn>]</Pn>
      </Line>
      <Line>
        <Pn>{"}"}</Pn>
        <Pn>)</Pn>
        <Pn>;</Pn>
      </Line>
    </div>
  )
}

function Line({
  children,
  indent = 0,
}: {
  children?: React.ReactNode
  indent?: number
}) {
  return (
    <div style={{ paddingLeft: indent * 16 }}>
      {children || <span>&nbsp;</span>}
    </div>
  )
}
function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-purple-600">{children} </span>
}
function Fn({ children }: { children: React.ReactNode }) {
  return <span className="text-blue-600">{children}</span>
}
function Num({ children }: { children: React.ReactNode }) {
  return <span className="text-amber-600">{children}</span>
}
function Op({ children }: { children: React.ReactNode }) {
  return <span className="text-neutral-500"> {children} </span>
}
function Pn({ children }: { children: React.ReactNode }) {
  return <span className="text-neutral-400">{children}</span>
}

/* ─── 3D 平台（浅灰调） ─── */
function Platform() {
  return (
    <div className="relative mx-auto h-[48px] w-[380px]">
      <div
        className="absolute inset-x-0 top-0 h-[32px] rounded-lg"
        style={{
          background:
            "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 50%, #d4d4d8 100%)",
          transform: "perspective(400px) rotateX(28deg)",
          boxShadow: "0 8px 0 0 #d4d4d8, 0 10px 20px -4px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  )
}

/* ─── 设计稿基准宽度 ─── */
const DESIGN_W = 540

/* ─── Cover 主体 ─── */
const Cover = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      setScale(w / DESIGN_W)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <div className="pt-[100%]" />
      {/* 背景圆 */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full border border-neutral-200 bg-size-[40px_40px]"
        style={{ backgroundImage: "url(/abc/grid.svg)" }}
      />
      {/* 内容层：在圆内居中，整体按容器宽度 / DESIGN_W 缩放 */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
        <div
          className="flex w-[413px] flex-col items-center gap-4"
          style={{
            transform: `scale(${scale ?? 1})`,
            transformOrigin: "center center",
            opacity: scale === null ? 0 : 1,
          }}
        >
          {/* 代码卡 */}
          <div className="relative z-10">
            <CodeBlock />
          </div>

          {/* 3D 平台 */}
          <Platform />
        </div>
      </div>
      {/* 光标层：不跟随 scale，保持原始大小 */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        style={{ opacity: scale === null ? 0 : 1 }}
      >
        {/* Aragakey. 光标 - 左下 */}
        <motion.div
          className="absolute"
          style={{ bottom: "36%", left: "24%" }}
          animate={{
            x: [0, 4, -3, 2, 0],
            y: [0, -3, 4, -2, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cursor name="Aragakey." flipped />
        </motion.div>
        {/* Cursor 光标 - 右上 */}
        <motion.div
          className="absolute"
          style={{ top: "28%", right: "24%" }}
          animate={{
            x: [0, -3, 5, -2, 0],
            y: [0, 4, -3, 2, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Cursor name="Claude" />
        </motion.div>
      </div>
    </div>
  )
}

export default Cover
