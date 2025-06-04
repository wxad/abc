import React, { useEffect, useRef } from "react"
export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  totalSize: number
  pageSize?: number
  onChange?: (
    e: React.MouseEvent<HTMLDivElement>,
    value: number,
    pageSize: number
  ) => void
  onPageSizeChange?: (newPageSize: number, pageSize: number) => void
  showPrevNext?: boolean
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const Pagination: React.FC<PaginationProps> = ({
  value = 1,
  totalSize,
  pageSize = 10,
  onChange,
  onPageSizeChange,
  onMouseEnter,
  onMouseLeave,
  showPrevNext = true,
  ...props
}) => {
  const hoverFillRef = useRef<HTMLDivElement>(null)
  const hoverFillBgRef = useRef<HTMLDivElement>(null)
  const activeIndicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverFillVisibleRef = useRef(false)
  const itemLeaveTimer = useRef(0)

  const pageNumber = Math.ceil(totalSize / pageSize)
  const isPrevDisabled = value === 1
  const isNextDisabled = value === pageNumber

  const handleItemMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist()
    clearTimeout(itemLeaveTimer.current)

    if (!hoverFillBgRef.current || !hoverFillRef.current) {
      return
    }

    hoverFillRef.current.style.left = `${e.currentTarget.offsetLeft}px`
    hoverFillBgRef.current.style.transform = "scale(1)"
    hoverFillBgRef.current.style.background = "rgba(33, 34, 38, 0.05)"

    if (!hoverFillVisibleRef.current) {
      hoverFillVisibleRef.current = true
      hoverFillRef.current.style.transitionDuration = "0s"

      const { clientX, clientY } = e
      const { x, y } = e.currentTarget.getBoundingClientRect()
      hoverFillBgRef.current.style.transformOrigin = `${clientX - x}px ${
        clientY - y
      }px`
    } else {
      hoverFillRef.current.style.transitionDuration =
        "var(--odn-hoverfill-duration)"
    }
  }

  const handleItemMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist()
    clearTimeout(itemLeaveTimer.current)

    if (!hoverFillBgRef.current || !hoverFillRef.current) {
      return
    }

    const { clientX, clientY } = e
    const { x, y } = e.currentTarget.getBoundingClientRect()

    itemLeaveTimer.current = window.setTimeout(() => {
      hoverFillVisibleRef.current = false
      if (hoverFillBgRef.current) {
        hoverFillBgRef.current.style.transformOrigin = `${clientX - x}px ${
          clientY - y
        }px`
        hoverFillBgRef.current.style.transform = "scale(0.8)"
        hoverFillBgRef.current.style.background = "rgba(33, 34, 38, 0)"
      }
    }, 100)
  }

  useEffect(() => {
    setTimeout(() => {
      if (
        !activeIndicatorRef.current ||
        !containerRef.current ||
        !hoverFillRef.current
      ) {
        return
      }

      const currentEl = containerRef.current.querySelector(
        `[data-springen-pagination-item-page='${value}']`
      ) as HTMLDivElement

      if (!currentEl) {
        // 可能改变了 pageSize 后导致 value 超出范围，这时隐藏 activeIndicator
        activeIndicatorRef.current.style.opacity = "0"
      } else {
        activeIndicatorRef.current.style.transform = `translate3d(${currentEl.offsetLeft}px, 0, 0)`
        activeIndicatorRef.current.style.opacity = "1"

        // 当 value 为 1 时，hoverFill 这时可能处于 0 的位置，但按钮已 disabled，这时需将 hoverFill 隐藏；尾页同理
        if (
          hoverFillBgRef.current &&
          ((value === 1 && hoverFillRef.current.offsetLeft === 0) ||
            (value === pageNumber &&
              hoverFillRef.current.offsetLeft +
                hoverFillRef.current.offsetWidth >=
                containerRef.current.offsetWidth))
        ) {
          hoverFillBgRef.current.style.background = "rgba(33, 34, 38, 0)"
        }
      }
    }, 0)
  }, [value, pageNumber, showPrevNext])

  const boundaryCount = 1
  const siblingCount = 1

  const startPages = range(1, Math.min(boundaryCount, pageNumber))
  const endPages = range(
    Math.max(pageNumber - boundaryCount + 1, boundaryCount + 1),
    pageNumber
  )

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      value - siblingCount,
      // Lower boundary when page is high
      pageNumber - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      value + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    pageNumber - boundaryCount - 1
  )

  const itemList = [
    ...(showPrevNext && pageNumber > 1 ? ["previous"] : []),
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < pageNumber - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < pageNumber - boundaryCount - 1
      ? ["end-ellipsis"]
      : pageNumber - boundaryCount > boundaryCount
      ? [pageNumber - boundaryCount]
      : []),

    ...endPages,
    ...(showPrevNext && pageNumber > 1 ? ["next"] : []),
  ]

  return (
    <div ref={containerRef} data-springen-pagination {...props}>
      <i data-springen-pagination-hover-fill ref={hoverFillRef}>
        <i data-springen-pagination-hover-fill-bg ref={hoverFillBgRef} />
      </i>
      <i data-springen-pagination-active-indicator ref={activeIndicatorRef} />
      {itemList.map((item) => {
        if (item === "previous") {
          return (
            <div
              key={item}
              data-springen-pagination-item
              data-springen-pagination-item-prev
              data-springen-pagination-item-disabled={isPrevDisabled}
              onMouseEnter={(e) => {
                if (!isPrevDisabled) {
                  handleItemMouseEnter(e)
                }
              }}
              onMouseLeave={(e) => {
                if (!isPrevDisabled) {
                  handleItemMouseLeave(e)
                }
              }}
              onClick={(e) => {
                if (!isPrevDisabled) {
                  onChange?.(e, value - 1, pageSize)
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.677 12.9832C9.57937 13.0808 9.42107 13.0808 9.32344 12.9832L4.51512 8.17489C4.41749 8.07726 4.41749 7.91897 4.51512 7.82134L9.32344 3.01301C9.42107 2.91538 9.57937 2.91538 9.677 3.01301L10.2427 3.5787C10.3403 3.67633 10.3403 3.83462 10.2427 3.93225L6.17682 7.99812L10.2427 12.064C10.3403 12.1616 10.3403 12.3199 10.2427 12.4175L9.677 12.9832Z"
                />
              </svg>
            </div>
          )
        }
        if (item === "next") {
          return (
            <div
              key={item}
              data-springen-pagination-item
              data-springen-pagination-item-next
              data-springen-pagination-item-disabled={isNextDisabled}
              onMouseEnter={(e) => {
                if (!isNextDisabled) {
                  handleItemMouseEnter(e)
                }
              }}
              onMouseLeave={(e) => {
                if (!isNextDisabled) {
                  handleItemMouseLeave(e)
                }
              }}
              onClick={(e) => {
                if (!isNextDisabled) {
                  onChange?.(e, value + 1, pageSize)
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.32299 3.01677C6.42062 2.91913 6.57891 2.91913 6.67654 3.01677L11.4849 7.82509C11.5825 7.92272 11.5825 8.08101 11.4849 8.17865L6.67654 12.987C6.57891 13.0846 6.42062 13.0846 6.32299 12.987L5.75731 12.4213C5.65967 12.3237 5.65967 12.1654 5.75731 12.0677L9.82317 8.00187L5.75731 3.936C5.65968 3.83837 5.65968 3.68008 5.75731 3.58245L6.32299 3.01677Z"
                />
              </svg>
            </div>
          )
        }
        if (item === "start-ellipsis" || item === "end-ellipsis") {
          return (
            <div
              key={item}
              data-springen-pagination-item
              data-springen-pagination-item-ellipsis
              onMouseEnter={handleItemMouseEnter}
              onMouseLeave={handleItemMouseLeave}
              onClick={(e) => {
                onChange?.(
                  e,
                  Math.min(
                    Math.max(
                      1,
                      item === "start-ellipsis" ? value - 5 : value + 5
                    ),
                    pageNumber
                  ),
                  pageSize
                )
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                data-springen-pagination-item-ellipsis-icon
              >
                <path d="M4.00312 8.0002C4.00312 8.55248 3.55541 9.0002 3.00313 9.0002C2.45084 9.0002 2.00313 8.55248 2.00313 8.0002C2.00313 7.44791 2.45084 7.0002 3.00313 7.0002C3.55541 7.0002 4.00312 7.44791 4.00312 8.0002Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.30312 8.0002C4.30312 8.71817 3.7211 9.3002 3.00313 9.3002C2.28516 9.3002 1.70312 8.71817 1.70312 8.0002C1.70312 7.28223 2.28516 6.7002 3.00313 6.7002C3.7211 6.7002 4.30312 7.28223 4.30312 8.0002ZM3.00313 9.0002C3.55541 9.0002 4.00312 8.55248 4.00312 8.0002C4.00312 7.44791 3.55541 7.0002 3.00313 7.0002C2.45084 7.0002 2.00313 7.44791 2.00313 8.0002C2.00313 8.55248 2.45084 9.0002 3.00313 9.0002Z"
                />
                <path d="M9.00313 8.0002C9.00313 8.55248 8.55541 9.0002 8.00313 9.0002C7.45084 9.0002 7.00312 8.55248 7.00312 8.0002C7.00312 7.44791 7.45084 7.0002 8.00313 7.0002C8.55541 7.0002 9.00313 7.44791 9.00313 8.0002Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.30313 8.0002C9.30313 8.71817 8.7211 9.3002 8.00313 9.3002C7.28515 9.3002 6.70312 8.71817 6.70312 8.0002C6.70312 7.28223 7.28515 6.7002 8.00313 6.7002C8.7211 6.7002 9.30313 7.28223 9.30313 8.0002ZM8.00313 9.0002C8.55541 9.0002 9.00313 8.55248 9.00313 8.0002C9.00313 7.44791 8.55541 7.0002 8.00313 7.0002C7.45084 7.0002 7.00312 7.44791 7.00312 8.0002C7.00312 8.55248 7.45084 9.0002 8.00313 9.0002Z"
                />
                <path d="M14.0031 8.0002C14.0031 8.55248 13.5554 9.0002 13.0031 9.0002C12.4508 9.0002 12.0031 8.55248 12.0031 8.0002C12.0031 7.44791 12.4508 7.0002 13.0031 7.0002C13.5554 7.0002 14.0031 7.44791 14.0031 8.0002Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.3031 8.0002C14.3031 8.71817 13.7211 9.3002 13.0031 9.3002C12.2851 9.3002 11.7031 8.71817 11.7031 8.0002C11.7031 7.28223 12.2851 6.7002 13.0031 6.7002C13.7211 6.7002 14.3031 7.28223 14.3031 8.0002ZM13.0031 9.0002C13.5554 9.0002 14.0031 8.55248 14.0031 8.0002C14.0031 7.44791 13.5554 7.0002 13.0031 7.0002C12.4508 7.0002 12.0031 7.44791 12.0031 8.0002C12.0031 8.55248 12.4508 9.0002 13.0031 9.0002Z"
                />
              </svg>
              {item === "start-ellipsis" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  data-springen-pagination-item-ellipsis-icon-hover
                >
                  <path d="M7.77293 11.7123C7.87056 11.6147 7.87056 11.4564 7.77293 11.3587L4.41418 7.99999L7.77293 4.64123C7.87056 4.5436 7.87056 4.38531 7.77293 4.28768L7.41938 3.93412C7.32175 3.83649 7.16346 3.83649 7.06583 3.93412L3.17674 7.82321C3.07911 7.92084 3.07911 8.07913 3.17674 8.17676L7.06583 12.0659C7.16346 12.1635 7.32175 12.1635 7.41938 12.0659L7.77293 11.7123Z" />
                  <path d="M12.2729 11.7123C12.3706 11.6147 12.3706 11.4564 12.2729 11.3587L8.91418 7.99999L12.2729 4.64123C12.3706 4.5436 12.3706 4.38531 12.2729 4.28768L11.9194 3.93412C11.8217 3.83649 11.6635 3.83649 11.5658 3.93412L7.67674 7.82321C7.57911 7.92084 7.57911 8.07913 7.67674 8.17676L11.5658 12.0659C11.6635 12.1635 11.8217 12.1635 11.9194 12.0659L12.2729 11.7123Z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  data-springen-pagination-item-ellipsis-icon-hover
                >
                  <path d="M8.21238 4.28769C8.11475 4.38532 8.11475 4.54362 8.21238 4.64125L11.5711 8L8.21238 11.3588C8.11475 11.4564 8.11475 11.6147 8.21238 11.7123L8.56594 12.0659C8.66357 12.1635 8.82186 12.1635 8.91949 12.0659L12.8086 8.17678C12.9062 8.07915 12.9062 7.92086 12.8086 7.82323L8.91949 3.93414C8.82186 3.83651 8.66357 3.83651 8.56594 3.93414L8.21238 4.28769Z" />
                  <path d="M3.71238 4.28769C3.61475 4.38532 3.61475 4.54362 3.71238 4.64125L7.07114 8L3.71238 11.3588C3.61475 11.4564 3.61475 11.6147 3.71238 11.7123L4.06594 12.0659C4.16357 12.1635 4.32186 12.1635 4.41949 12.0659L8.30858 8.17678C8.40621 8.07915 8.40621 7.92086 8.30858 7.82323L4.41949 3.93414C4.32186 3.83651 4.16357 3.83651 4.06594 3.93414L3.71238 4.28769Z" />
                </svg>
              )}
            </div>
          )
        }
        return (
          <div
            key={item}
            data-springen-pagination-item
            data-springen-pagination-item-page={item}
            data-springen-pagination-item-active={item === value}
            onMouseEnter={handleItemMouseEnter}
            onMouseLeave={handleItemMouseLeave}
            onClick={(e) => {
              if (onChange) {
                onChange(e, Number(item), pageSize)
              }
            }}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default Pagination
