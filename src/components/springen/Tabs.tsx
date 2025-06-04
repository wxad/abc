import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import React, { useEffect, useRef } from "react"

export const MOTION_CONFIG = {
  // visualDuration: 0.15,
  // bounce: 0,
  stiffness: 1754.4,
  damping: 83.776,
} as const

export type SpringenItemValue = string | number

export interface SpringenItem<T extends SpringenItemValue = SpringenItemValue> {
  value: T
  label:
    | React.ReactNode
    | ((
        item: SpringenItem<T>,
        index: number,
        active: boolean
      ) => React.ReactNode)
  disabled?: boolean
}

export interface SpringenBaseProps<
  T extends SpringenItemValue = SpringenItemValue
> extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | "onChange"
    | "onAnimationStart"
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onDragEndCapture"
    | "onDragCapture"
  > {
  gap?: number
  items?: SpringenItem<T>[]
  value?: T
  onChange?: (e: React.MouseEvent<HTMLDivElement>, value: T) => void
  itemClassName?: string | ((item: SpringenItem<T>, index: number) => string)
  itemStyle?:
    | React.CSSProperties
    | ((item: SpringenItem<T>, index: number) => React.CSSProperties)
  activeItemClassName?:
    | string
    | ((item: SpringenItem<T>, index: number) => string)
  activeItemStyle?:
    | React.CSSProperties
    | ((item: SpringenItem<T>, index: number) => React.CSSProperties)
}

export interface SpringenVerticalProps<
  T extends SpringenItemValue = SpringenItemValue
> extends SpringenBaseProps<T> {
  indicatorWrapperClassName?: string
  indicatorWrapperStyle?: React.CSSProperties
  indicatorClassName?: string
  indicatorStyle?: React.CSSProperties
}

export interface SpringenDividerProps<
  T extends SpringenItemValue = SpringenItemValue
> extends SpringenBaseProps<T> {
  dividerClassName?: string
  dividerStyle?: React.CSSProperties
}

export interface SpringenButtonGroupProps<
  T extends SpringenItemValue = SpringenItemValue
> extends SpringenBaseProps<T> {
  indicatorClassName?: string
  indicatorStyle?: React.CSSProperties
}

export interface SpringenTabsProps<
  T extends SpringenItemValue = SpringenItemValue
> extends SpringenBaseProps<T> {
  indicatorClassName?: string
  indicatorStyle?: React.CSSProperties
}

export interface SpringenTagProps<
  T extends SpringenItemValue = SpringenItemValue
> extends SpringenBaseProps<T> {}

export interface SpringenHoverFillProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hoverColor?: string
  activeColor?: string
  bgClassName?: string
  bgStyle?: React.CSSProperties
}

const Default = <T extends SpringenItemValue>({
  gap = 32,
  items = [],
  value,
  onChange,
  itemClassName = "",
  itemStyle = {},
  activeItemClassName = "",
  activeItemStyle = {},
  indicatorClassName = "",
  indicatorStyle = {},
  style = {},
  ...props
}: SpringenTabsProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const clipStart = useSpring(0, MOTION_CONFIG)
  const clipEnd = useSpring(0, MOTION_CONFIG)
  const indicatorWidth = useSpring(0, MOTION_CONFIG)
  const indicatorVisible = useMotionValue("hidden")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const clipPath = useTransform(
    [clipStart, clipEnd],
    ([start, end]) => `inset(0 ${end}px 0 ${start}px round 6px)`
  )

  const reStyle = () => {
    setTimeout(() => {
      if (!wrapperRef.current) {
        return
      }
      const currentIndex = items.findIndex((item) => item.value === value)
      const currentEl = itemRefs.current[currentIndex]

      if (currentEl) {
        const newStart = currentEl.offsetLeft
        const newEnd =
          wrapperRef.current.offsetWidth - newStart - currentEl.offsetWidth

        if (indicatorVisible.get() === "visible") {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorWidth.set(currentEl.offsetWidth)
        } else {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorWidth.set(currentEl.offsetWidth)
          indicatorVisible.set("visible")
        }
      }
    }, 0)
  }

  useEffect(() => {
    reStyle()
  }, [value, items.length])

  return (
    <motion.div
      ref={wrapperRef}
      data-springen-tabs
      style={{ gap, ...style }}
      {...props}
    >
      {items?.map((item, index) => {
        const itemClass =
          typeof itemClassName === "function"
            ? itemClassName(item, index)
            : itemClassName
        const itemCSS =
          typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle

        return (
          <React.Fragment key={item.value}>
            <div
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-springen-tabs-item
              data-springen-tabs-item-disabled={item.disabled}
              className={itemClass}
              style={{
                ...(itemCSS || {}),
              }}
              onClick={(e) => {
                if (onChange && !item.disabled) {
                  onChange(e, item.value)
                }
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, false)
                : item.label}
            </div>
          </React.Fragment>
        )
      })}

      <motion.div data-springen-tabs-layer style={{ clipPath, gap }}>
        {items?.map((item, index) => {
          const itemClass =
            typeof itemClassName === "function"
              ? itemClassName(item, index)
              : itemClassName
          const activeItemClass =
            typeof activeItemClassName === "function"
              ? activeItemClassName(item, index)
              : activeItemClassName
          const itemCSS =
            typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle
          const activeItemCSS =
            typeof activeItemStyle === "function"
              ? activeItemStyle(item, index)
              : activeItemStyle

          return (
            <div
              key={item.value}
              data-springen-tabs-item
              data-springen-tabs-item-layer
              className={`${itemClass} ${activeItemClass}`}
              style={{
                ...(itemCSS || {}),
                ...(activeItemCSS || {}),
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, true)
                : item.label}
            </div>
          )
        })}
      </motion.div>

      <motion.div
        data-springen-tabs-indicator
        style={{
          x: clipStart,
          width: indicatorWidth,
          visibility: indicatorVisible,
          ...indicatorStyle,
        }}
        className={indicatorClassName}
      />
    </motion.div>
  )
}

const ButtonGroup = <T extends SpringenItemValue>({
  gap = 0,
  items = [],
  value,
  onChange,
  itemClassName = "",
  itemStyle = {},
  activeItemClassName = "",
  activeItemStyle = {},
  indicatorClassName = "",
  indicatorStyle = {},
  style = {},
  ...props
}: SpringenButtonGroupProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const clipStart = useSpring(0, MOTION_CONFIG)
  const clipEnd = useSpring(0, MOTION_CONFIG)
  const indicatorWidth = useSpring(0, MOTION_CONFIG)
  const indicatorVisible = useMotionValue("hidden")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const clipPath = useTransform(
    [clipStart, clipEnd],
    ([start, end]) => `inset(0 ${end}px 0 ${start}px)`
  )

  const reStyle = () => {
    setTimeout(() => {
      if (!wrapperRef.current) {
        return
      }
      const currentIndex = items.findIndex((item) => item.value === value)
      const currentEl = itemRefs.current[currentIndex]

      if (currentEl) {
        const newStart = currentEl.offsetLeft
        const newEnd =
          wrapperRef.current.offsetWidth - newStart - currentEl.offsetWidth

        if (indicatorVisible.get() === "visible") {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorWidth.set(currentEl.offsetWidth)
        } else {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorWidth.set(currentEl.offsetWidth)
          indicatorVisible.set("visible")
        }
      }
    }, 0)
  }

  useEffect(() => {
    reStyle()
  }, [value, items.length])

  return (
    <motion.div
      ref={wrapperRef}
      data-springen-button-group
      style={{ gap, ...style }}
      {...props}
    >
      {items?.map((item, index) => {
        const itemClass =
          typeof itemClassName === "function"
            ? itemClassName(item, index)
            : itemClassName
        const itemCSS =
          typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle

        return (
          <React.Fragment key={item.value}>
            <div
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-springen-button-group-item
              data-springen-button-group-item-disabled={item.disabled}
              className={itemClass}
              style={{
                ...(itemCSS || {}),
              }}
              onClick={(e) => {
                if (onChange && !item.disabled) {
                  onChange(e, item.value)
                }
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, false)
                : item.label}
            </div>
          </React.Fragment>
        )
      })}

      <motion.div data-springen-button-group-layer style={{ clipPath, gap }}>
        {items?.map((item, index) => {
          const itemClass =
            typeof itemClassName === "function"
              ? itemClassName(item, index)
              : itemClassName
          const activeItemClass =
            typeof activeItemClassName === "function"
              ? activeItemClassName(item, index)
              : activeItemClassName
          const itemCSS =
            typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle
          const activeItemCSS =
            typeof activeItemStyle === "function"
              ? activeItemStyle(item, index)
              : activeItemStyle

          return (
            <div
              key={item.value}
              data-springen-button-group-item
              data-springen-button-group-item-layer
              className={`${itemClass} ${activeItemClass}`}
              style={{
                ...(itemCSS || {}),
                ...(activeItemCSS || {}),
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, true)
                : item.label}
            </div>
          )
        })}
      </motion.div>
      <motion.div
        data-springen-button-group-indicator
        style={{
          x: clipStart,
          width: indicatorWidth,
          visibility: indicatorVisible,
          ...indicatorStyle,
        }}
        className={indicatorClassName}
      />
    </motion.div>
  )
}

const Vertical = <T extends SpringenItemValue>({
  gap = 14,
  items = [],
  value,
  onChange,
  itemClassName = "",
  itemStyle = {},
  activeItemClassName = "",
  activeItemStyle = {},
  indicatorWrapperClassName = "",
  indicatorWrapperStyle = {},
  indicatorClassName = "",
  indicatorStyle = {},
  ...props
}: SpringenVerticalProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const clipStart = useSpring(0, MOTION_CONFIG)
  const clipEnd = useSpring(0, MOTION_CONFIG)
  const indicatorHeight = useSpring(0, MOTION_CONFIG)
  const indicatorVisible = useMotionValue("hidden")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const clipPath = useTransform(
    [clipStart, clipEnd],
    ([start, end]) => `inset(${start}px 0 ${end}px)`
  )

  const reStyle = () => {
    setTimeout(() => {
      if (!wrapperRef.current) {
        return
      }
      const currentIndex = items.findIndex((item) => item.value === value)
      const currentEl = itemRefs.current[currentIndex]

      if (currentEl) {
        const newStart = currentEl.offsetTop
        const newEnd =
          wrapperRef.current.offsetHeight - newStart - currentEl.offsetHeight

        if (indicatorVisible.get() === "visible") {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorHeight.set(currentEl.offsetHeight)
        } else {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorHeight.set(currentEl.offsetHeight)
          indicatorVisible.set("visible")
        }
      }
    }, 0)
  }

  useEffect(() => {
    reStyle()
  }, [value, items.length])

  return (
    <motion.div ref={wrapperRef} data-springen-vertical {...props}>
      {items?.map((item, index) => {
        const itemClass =
          typeof itemClassName === "function"
            ? itemClassName(item, index)
            : itemClassName
        const itemCSS =
          typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle

        return (
          <React.Fragment key={item.value}>
            <div
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-springen-vertical-item
              data-springen-vertical-item-disabled={item.disabled}
              className={itemClass}
              style={{
                marginBottom: index === items.length - 1 ? 0 : gap,
                ...(itemCSS || {}),
              }}
              onClick={(e) => {
                if (onChange && !item.disabled) {
                  onChange(e, item.value)
                }
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, false)
                : item.label}
            </div>
          </React.Fragment>
        )
      })}

      <motion.div data-springen-vertical-layer style={{ clipPath }}>
        {items?.map((item, index) => {
          const itemClass =
            typeof itemClassName === "function"
              ? itemClassName(item, index)
              : itemClassName
          const activeItemClass =
            typeof activeItemClassName === "function"
              ? activeItemClassName(item, index)
              : activeItemClassName
          const itemCSS =
            typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle
          const activeItemCSS =
            typeof activeItemStyle === "function"
              ? activeItemStyle(item, index)
              : activeItemStyle

          return (
            <div
              key={item.value}
              data-springen-vertical-item
              data-springen-vertical-item-layer
              className={`${itemClass} ${activeItemClass}`}
              style={{
                marginBottom: index === items.length - 1 ? 0 : gap,
                ...(itemCSS || {}),
                ...(activeItemCSS || {}),
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, true)
                : item.label}
            </div>
          )
        })}
      </motion.div>

      <div
        data-springen-vertical-indicator-wrapper
        className={indicatorWrapperClassName}
        style={indicatorWrapperStyle}
      >
        <motion.div
          data-springen-vertical-indicator
          style={{
            y: clipStart,
            height: indicatorHeight,
            visibility: indicatorVisible,
            ...indicatorStyle,
          }}
          className={indicatorClassName}
        />
      </div>
    </motion.div>
  )
}

const Divider = <T extends SpringenItemValue>({
  gap = 25,
  items = [],
  value,
  onChange,
  itemClassName = "",
  itemStyle = {},
  activeItemClassName = "",
  activeItemStyle = {},
  dividerClassName = "",
  dividerStyle = {},
  style = {},
  className = "",
  ...props
}: SpringenDividerProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const clipStart = useSpring(0, MOTION_CONFIG)
  const clipEnd = useSpring(0, MOTION_CONFIG)
  const indicatorVisible = useMotionValue("hidden")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const layerClipPath = useTransform(
    [clipStart, clipEnd],
    ([start, end]) => `inset(0 ${end}px 0 ${start}px)`
  )

  const reStyle = () => {
    setTimeout(() => {
      if (!wrapperRef.current) {
        return
      }
      const currentIndex = items.findIndex((item) => item.value === value)
      const currentEl = itemRefs.current[currentIndex]

      if (currentEl) {
        const newStart = currentEl.offsetLeft
        const newEnd =
          wrapperRef.current.offsetWidth - newStart - currentEl.offsetWidth

        if (indicatorVisible.get() === "visible") {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
        } else {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorVisible.set("visible")
        }
      }
    }, 0)
  }

  useEffect(() => {
    reStyle()
  }, [value, items.length])

  return (
    <div ref={wrapperRef} data-springen-divider style={style} {...props}>
      {items?.map((item, index) => {
        const itemClass =
          typeof itemClassName === "function"
            ? itemClassName(item, index)
            : itemClassName
        const itemCSS =
          typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle

        return (
          <React.Fragment key={item.value}>
            <div
              data-springen-divider-item
              data-springen-divider-item-disabled={item.disabled}
              className={itemClass}
              style={{
                ...(itemCSS || {}),
              }}
              onClick={(e) => {
                if (onChange && !item.disabled) {
                  onChange(e, item.value)
                }
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, false)
                : item.label}
            </div>
            {index < items.length - 1 && (
              <div
                className={dividerClassName}
                data-springen-divider-divider
                style={{
                  marginLeft: (gap - 1) / 2,
                  marginRight: (gap - 1) / 2,
                  ...dividerStyle,
                }}
              />
            )}
          </React.Fragment>
        )
      })}
      <motion.div
        data-springen-divider-layer
        style={{
          clipPath: layerClipPath,
        }}
      >
        {items?.map((item, index) => {
          const itemClass =
            typeof itemClassName === "function"
              ? itemClassName(item, index)
              : itemClassName
          const itemCSS =
            typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle
          const itemLayerClass =
            typeof activeItemClassName === "function"
              ? activeItemClassName(item, index)
              : activeItemClassName
          const itemLayerCSS =
            typeof activeItemStyle === "function"
              ? activeItemStyle(item, index)
              : activeItemStyle

          return (
            <div
              key={item.value}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-springen-divider-item
              data-springen-divider-item-layer
              className={`${itemClass} ${itemLayerClass}`}
              style={{
                ...(itemCSS || {}),
                ...(itemLayerCSS || {}),
                marginLeft: index === 0 ? 0 : gap / 2,
                marginRight: index === items.length - 1 ? 0 : gap / 2,
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, true)
                : item.label}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

const Tag = <T extends SpringenItemValue>({
  gap = 8,
  items = [],
  value,
  onChange,
  itemClassName = "",
  itemStyle = {},
  activeItemClassName = "",
  activeItemStyle = {},
  style = {},
  ...props
}: SpringenTagProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const clipStart = useSpring(0, MOTION_CONFIG)
  const clipEnd = useSpring(0, MOTION_CONFIG)
  const indicatorWidth = useSpring(0, MOTION_CONFIG)
  const indicatorVisible = useMotionValue("hidden")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const clipPath = useTransform(
    [clipStart, clipEnd],
    ([start, end]) => `inset(0 ${end}px 0 ${start}px)`
  )

  const reStyle = () => {
    setTimeout(() => {
      if (!wrapperRef.current) {
        return
      }
      const currentIndex = items.findIndex((item) => item.value === value)
      const currentEl = itemRefs.current[currentIndex]

      if (currentEl) {
        const newStart = currentEl.offsetLeft
        const newEnd =
          wrapperRef.current.offsetWidth - newStart - currentEl.offsetWidth

        if (indicatorVisible.get() === "visible") {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorWidth.set(currentEl.offsetWidth)
        } else {
          clipStart.set(newStart)
          clipEnd.set(newEnd)
          indicatorWidth.set(currentEl.offsetWidth)
          indicatorVisible.set("visible")
        }
      }
    }, 0)
  }

  useEffect(() => {
    reStyle()
  }, [value, items.length])

  return (
    <motion.div
      ref={wrapperRef}
      data-springen-tag
      style={{ gap, ...style }}
      {...props}
    >
      {items?.map((item, index) => {
        const itemClass =
          typeof itemClassName === "function"
            ? itemClassName(item, index)
            : itemClassName
        const itemCSS =
          typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle

        return (
          <React.Fragment key={item.value}>
            <div
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-springen-tag-item
              data-springen-tag-item-disabled={item.disabled}
              className={itemClass}
              style={{
                ...(itemCSS || {}),
              }}
              onClick={(e) => {
                if (onChange && !item.disabled) {
                  onChange(e, item.value)
                }
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, false)
                : item.label}
            </div>
          </React.Fragment>
        )
      })}

      <motion.div data-springen-tag-layer style={{ clipPath, gap }}>
        {items?.map((item, index) => {
          const itemClass =
            typeof itemClassName === "function"
              ? itemClassName(item, index)
              : itemClassName
          const activeItemClass =
            typeof activeItemClassName === "function"
              ? activeItemClassName(item, index)
              : activeItemClassName
          const itemCSS =
            typeof itemStyle === "function" ? itemStyle(item, index) : itemStyle
          const activeItemCSS =
            typeof activeItemStyle === "function"
              ? activeItemStyle(item, index)
              : activeItemStyle

          return (
            <div
              key={item.value}
              data-springen-tag-item
              data-springen-tag-item-layer
              className={`${itemClass} ${activeItemClass}`}
              style={{
                ...(itemCSS || {}),
                ...(activeItemCSS || {}),
              }}
            >
              {typeof item.label === "function"
                ? item.label(item, index, true)
                : item.label}
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

const Tabs = () => <></>

Tabs.Default = Default
Tabs.ButtonGroup = ButtonGroup
Tabs.Vertical = Vertical
Tabs.Divider = Divider
Tabs.Tag = Tag

export default Tabs
