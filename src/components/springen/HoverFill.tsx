"use client"

import React, { forwardRef, useEffect, useRef } from "react"

const DEFAULT_HOVER_COLOR = "rgba(33, 34, 38, 0.05)"
const DEFAULT_ACTIVE_COLOR = "rgba(33, 34, 38, 0.08)"

export interface HoverFillProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @description hover 颜色
   * @default 'rgba(33, 34, 38, 0.05)'
   */
  hoverColor?: string
  /**
   * @description active 颜色
   * @default 'rgba(33, 34, 38, 0.08)'
   */
  activeColor?: string
  /**
   * @description 背景类名，在这里加圆角
   */
  bgClassName?: string
  /**
   * @description 背景样式，在这里加圆角
   */
  bgStyle?: React.CSSProperties
}

export interface HoverFillState {
  timer: number
  bgVisible: boolean
  baseNode?: HTMLDivElement | null
  bgNode?: HTMLDivElement | null
  bgX: number
  bgY: number
  bgScale: number
}

declare global {
  interface Window {
    springenHoverFillState: HoverFillState
  }
}

const HoverFill = forwardRef(
  (
    {
      bgClassName = "",
      bgStyle = {},
      children,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      hoverColor = DEFAULT_HOVER_COLOR,
      activeColor = DEFAULT_ACTIVE_COLOR,
      ...props
    }: HoverFillProps,
    outerRef: any
  ) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const ref = outerRef || innerRef
    const bgRef = useRef<HTMLDivElement>(null)
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      e.persist()
      if (window.springenHoverFillState?.timer) {
        clearTimeout(window.springenHoverFillState.timer)
      }

      const root = ref.current || e.currentTarget

      if (onMouseEnter) {
        onMouseEnter(e)
      }

      if (!root) {
        return
      }

      const { x, y } = root.getBoundingClientRect()

      if (
        window.springenHoverFillState &&
        window.springenHoverFillState.bgVisible &&
        window.springenHoverFillState.bgNode &&
        window.springenHoverFillState.baseNode &&
        window.springenHoverFillState.baseNode !== root &&
        window.springenHoverFillState.baseNode?.parentNode === root.parentNode
      ) {
        const { bgX, bgY, bgScale, baseNode } = window.springenHoverFillState
        const { x: originX, y: originY } = baseNode.getBoundingClientRect()
        window.springenHoverFillState.bgNode.style.transformOrigin = "0 0"
        window.springenHoverFillState.bgNode.style.width =
          root.offsetWidth + "px"
        window.springenHoverFillState.bgNode.style.transform = `translate3d(${
          x - originX
        }px, ${y - originY}px, 0) scale(${bgScale})`
        window.springenHoverFillState.bgNode.style.background = hoverColor
      } else {
        if (
          window.springenHoverFillState &&
          window.springenHoverFillState.bgVisible &&
          window.springenHoverFillState.bgNode
        ) {
          window.springenHoverFillState.bgNode.style.background = "transparent"
          // window.springenHoverFillState.bgNode.style.transform = 'scale(var(--odn-hoverfill-scale-start))';
          window.springenHoverFillState.bgNode.style.transition = ""
        }

        const { clientX, clientY } = e
        if (bgRef.current) {
          bgRef.current.style.width = root.offsetWidth + "px"
          bgRef.current.style.transformOrigin = `${clientX - x}px ${
            clientY - y
          }px`
          bgRef.current.style.background = hoverColor
          bgRef.current.style.transform = "scale(1)"
          bgRef.current.style.transition = ""
        }
        window.springenHoverFillState = {
          bgVisible: true,
          bgX: clientX - x,
          bgY: clientY - y,
          bgScale: 1,
          baseNode: root,
          bgNode: bgRef.current,
          timer: 0,
        }
      }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      e.persist()
      if (window.springenHoverFillState?.timer) {
        clearTimeout(window.springenHoverFillState.timer)
      }

      const root = ref.current || e.currentTarget

      if (onMouseLeave) {
        onMouseLeave(e)
      }

      if (!root) {
        return
      }

      window.springenHoverFillState.timer = window.setTimeout(() => {
        if (window.springenHoverFillState.bgNode) {
          window.springenHoverFillState.bgNode.style.transformOrigin = ""
          window.springenHoverFillState.bgNode.style.background = "transparent"
          window.springenHoverFillState.bgNode.style.width = ""
          window.springenHoverFillState.bgNode.style.transform = ""
          window.springenHoverFillState.bgNode.style.transition = "0s"
        }

        if (bgRef.current) {
          bgRef.current.style.background = hoverColor
          bgRef.current.style.transform = "scale(1)"
          bgRef.current.style.transition = "0s"
        }

        setTimeout(() => {
          const { clientX, clientY } = e
          const { x, y } = root.getBoundingClientRect()

          let originX = clientX - x
          let originY = clientY - y

          if (originX < 0) {
            originX = 0
          } else if (originX > root.offsetWidth) {
            originX = root.offsetWidth
          }

          if (originY < 0) {
            originY = 0
          } else if (originY > root.offsetHeight) {
            originY = root.offsetHeight
          }

          if (bgRef.current) {
            bgRef.current.style.transformOrigin = `${originX}px ${originY}px`
            bgRef.current.style.background = "transparent"
            bgRef.current.style.transform =
              "scale(var(--odn-hoverfill-scale-start))"
            bgRef.current.style.transition = ""
          }
          window.springenHoverFillState = {
            timer: 0,
            bgVisible: false,
            bgX: 0,
            bgY: 0,
            bgScale: 0,
            baseNode: null,
            bgNode: null,
          }
        }, 0)
      }, 100)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.persist()

      if (
        window.springenHoverFillState.bgVisible &&
        window.springenHoverFillState.bgNode
      ) {
        window.springenHoverFillState.bgNode.style.background =
          hoverColor === DEFAULT_HOVER_COLOR ||
          activeColor !== DEFAULT_ACTIVE_COLOR
            ? activeColor
            : hoverColor
      }

      if (onMouseDown) {
        onMouseDown(e)
      }

      window.addEventListener("mouseup", handleMouseUp, false)
    }

    const handleMouseUp = () => {
      window.removeEventListener("mouseup", handleMouseUp, false)
      if (window.springenHoverFillState.bgNode) {
        window.springenHoverFillState.bgNode.style.background = window
          .springenHoverFillState.bgVisible
          ? hoverColor
          : "transparent"
      }
    }

    useEffect(() => {
      if (!window.springenHoverFillState) {
        window.springenHoverFillState = {
          bgVisible: false,
          bgX: 0,
          bgY: 0,
          bgScale: 0,
          baseNode: null,
          bgNode: null,
          timer: 0,
        }
      }

      return () => {
        window.removeEventListener("mouseup", handleMouseUp, false)
      }
    }, [])

    return (
      <div
        ref={ref}
        data-springen-hover-fill
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <div data-springen-hover-fill-content>{children}</div>
        <i
          ref={bgRef}
          data-springen-hover-fill-bg
          className={bgClassName}
          style={{
            ...(bgStyle || {}),
          }}
        />
      </div>
    )
  }
)

HoverFill.displayName = "HoverFill"

export default HoverFill
