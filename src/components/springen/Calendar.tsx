import React, { useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import { enUS, zhCN } from "react-day-picker/locale"

const DEFAULT_HOVER_COLOR = "rgba(33, 34, 38, 0.05)"

import {
  MONTHS,
  getDefaultMaxDate,
  getDefaultMinDate,
  isDayAfter,
  isDayBefore,
} from "./date"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  lang?: "zhCN" | "enUS"
  minDate?: Date
  maxDate?: Date
  /**
   * @description 禁用日期
   */
  disabledDays?: (date: Date) => boolean
}

const Calendar = ({
  lang = "zhCN",
  disabledDays,
  month: monthProp,
  onMonthChange,
  minDate = getDefaultMinDate(),
  maxDate = getDefaultMaxDate(),
  className,
  components,
  ...otherProps
}: CalendarProps) => {
  const navHoverFillRef = useRef<HTMLDivElement>(null)
  const navHoverFillInnerRef = useRef<HTMLDivElement>(null)
  const navHoverFillTimer = useRef(0)
  const navHoverFillVisible = useRef(false)

  const tdHoverFillRef = useRef<HTMLDivElement>(null)
  const tdHoverFillInnerRef = useRef<HTMLDivElement>(null)
  const tdHoverFillTimer = useRef(0)
  const tdHoverFillVisible = useRef(false)

  const [month, setMonth] = useState(monthProp)

  const handleMonthChange = (date: Date) => {
    if (monthProp === undefined) {
      setMonth(date)
    }

    if (onMonthChange) {
      onMonthChange(date)
    }
  }

  const handleCaptionChange = (date: Date) => {
    const newDate = date
    if (minDate && isDayBefore(date, minDate)) {
      newDate.setMonth(minDate.getMonth())
    } else if (maxDate && isDayAfter(date, maxDate)) {
      newDate.setMonth(maxDate.getMonth())
    }
    setMonth(newDate)
  }

  const handleSelectYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.currentTarget.value, 10)
    const newDate = new Date(month!.getTime())
    newDate.setFullYear(newYear)
    handleCaptionChange(newDate)
  }

  const handleSelectMonthChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.currentTarget.value, 10)
    const newDate = new Date(month!.getTime())
    newDate.setMonth(newMonth)
    handleCaptionChange(newDate)
  }

  const handleCaptionHoverEnter = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.persist()
    clearTimeout(navHoverFillTimer.current)

    if (!navHoverFillInnerRef.current || !navHoverFillRef.current) {
      return
    }

    const { offsetLeft, offsetWidth } = e.currentTarget
    const parentOffsetLeft = e.currentTarget.parentElement?.offsetLeft || 0

    setTimeout(() => {
      if (!navHoverFillRef.current || !navHoverFillInnerRef.current) {
        return
      }

      navHoverFillRef.current.style.width = `${offsetWidth}px`
      navHoverFillRef.current.style.left = `${offsetLeft + parentOffsetLeft}px`
      navHoverFillInnerRef.current.style.transform = "scale(1)"
      navHoverFillInnerRef.current.style.background = DEFAULT_HOVER_COLOR
    }, 0)

    if (!navHoverFillVisible.current) {
      navHoverFillVisible.current = true
      navHoverFillRef.current.style.transitionDuration = "0s"

      const { clientX, clientY } = e
      const { x, y } = e.currentTarget.getBoundingClientRect()
      navHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${
        clientY - y
      }px`
    } else {
      navHoverFillRef.current.style.transitionDuration =
        "var(--odn-hoverfill-duration)"
    }
  }

  const handleCaptionHoverLeave = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.persist()
    clearTimeout(navHoverFillTimer.current)

    if (!navHoverFillInnerRef.current || !navHoverFillRef.current) {
      return
    }

    const { clientX, clientY } = e
    const { x, y } = e.currentTarget.getBoundingClientRect()

    navHoverFillTimer.current = window.setTimeout(() => {
      navHoverFillVisible.current = false
      if (navHoverFillInnerRef.current) {
        navHoverFillInnerRef.current.style.transformOrigin = `${
          clientX - x
        }px ${clientY - y}px`
        navHoverFillInnerRef.current.style.transform = "scale(0.8)"
        navHoverFillInnerRef.current.style.background = "transparent"
      }
    }, 100)
  }

  const resetNavHoverFill = () => {
    navHoverFillVisible.current = false
    if (navHoverFillRef.current && navHoverFillInnerRef.current) {
      navHoverFillInnerRef.current.style.transformOrigin = ""
      navHoverFillInnerRef.current.style.background = "transparent"
      navHoverFillInnerRef.current.style.transform = "scale(0.8)"
    }
  }

  const handleTdHoverEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist()
    clearTimeout(tdHoverFillTimer.current)

    if (!tdHoverFillInnerRef.current || !tdHoverFillRef.current) {
      return
    }

    const target = e.currentTarget

    const { offsetLeft, offsetTop } =
      target.parentElement as HTMLTableCellElement

    setTimeout(() => {
      if (!tdHoverFillRef.current || !tdHoverFillInnerRef.current) {
        return
      }

      tdHoverFillRef.current.style.left = `${offsetLeft}px`
      tdHoverFillRef.current.style.top = `${offsetTop}px`
      tdHoverFillInnerRef.current.style.transform = "scale(1)"
      tdHoverFillInnerRef.current.style.background = DEFAULT_HOVER_COLOR
    }, 0)

    if (!tdHoverFillVisible.current) {
      tdHoverFillVisible.current = true
      tdHoverFillRef.current.style.transitionDuration = "0s"

      const { clientX, clientY } = e
      const { x, y } = target.getBoundingClientRect()
      tdHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${
        clientY - y
      }px`
    } else {
      tdHoverFillRef.current.style.transitionDuration =
        "var(--odn-hoverfill-duration)"
    }
  }

  const handleTdHoverLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist()
    clearTimeout(tdHoverFillTimer.current)

    if (!tdHoverFillInnerRef.current || !tdHoverFillRef.current) {
      return
    }

    const target = e.currentTarget

    const { clientX, clientY } = e
    const { x, y } = target.getBoundingClientRect()

    tdHoverFillTimer.current = window.setTimeout(() => {
      tdHoverFillVisible.current = false
      if (tdHoverFillInnerRef.current) {
        tdHoverFillInnerRef.current.style.transformOrigin = `${clientX - x}px ${
          clientY - y
        }px`
        tdHoverFillInnerRef.current.style.transform = "scale(0.8)"
        tdHoverFillInnerRef.current.style.background = "rgba(33, 34, 38, 0)"
      }
    }, 100)
  }

  return (
    <div data-springen-calendar-wrapper className={className}>
      <div data-spross-date-picker-caption-nav-hover-fill ref={navHoverFillRef}>
        <div
          data-spross-date-picker-caption-nav-hover-fill-inner
          ref={navHoverFillInnerRef}
        />
      </div>
      <div data-spross-date-picker-td-hover-fill ref={tdHoverFillRef}>
        <div
          data-spross-date-picker-td-hover-fill-inner
          ref={tdHoverFillInnerRef}
        />
      </div>
      <DayPicker
        locale={lang === "zhCN" ? zhCN : enUS}
        weekStartsOn={0}
        month={month}
        onMonthChange={handleMonthChange}
        captionLayout="dropdown"
        data-spross-date-picker
        data-spross-date-picker-locale={lang}
        disabled={[{ before: minDate, after: maxDate }, disabledDays || []]}
        startMonth={minDate}
        endMonth={maxDate}
        components={{
          YearsDropdown: ({ value, options = [] }) => {
            const optionsFiltered = options
              .filter((o) => !o.disabled)
              .map((o) => ({
                ...o,
                label: o.value,
              }))
            return (
              <div
                data-hover-fill-target="year"
                data-spross-date-picker-caption-select
                data-spross-date-picker-caption-select-year
                onMouseEnter={handleCaptionHoverEnter}
                onMouseLeave={handleCaptionHoverLeave}
              >
                <select
                  data-spross-date-picker-caption-select-input
                  name="year"
                  onChange={handleSelectYearChange}
                  onClick={resetNavHoverFill}
                  data-value={value}
                  value={value}
                >
                  {optionsFiltered.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                      {lang === "zhCN" ? "年" : ""}
                    </option>
                  ))}
                </select>
                <svg
                  data-spross-date-picker-caption-icon
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M12.3501 7.81235C12.6121 7.48497 12.379 7 11.9597 7H6.04034C5.62109 7 5.388 7.48497 5.6499 7.81235L8.60959 11.512C8.80975 11.7622 9.1903 11.7622 9.39046 11.512L12.3501 7.81235Z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            )
          },
          MonthsDropdown: ({ value, options = [] }) => {
            const optionsFiltered = options
              .filter((o) => !o.disabled)
              .map((o) => ({
                ...o,
                label:
                  lang === "zhCN" ? MONTHS[o.value].zhCN : MONTHS[o.value].enUS,
              }))
            return (
              <div
                data-hover-fill-target="month"
                data-spross-date-picker-caption-select
                data-spross-date-picker-caption-select-month
                onMouseEnter={handleCaptionHoverEnter}
                onMouseLeave={handleCaptionHoverLeave}
              >
                <select
                  data-spross-date-picker-caption-select-input
                  name="month"
                  onChange={handleSelectMonthChange}
                  value={value}
                  data-value={value}
                  onClick={resetNavHoverFill}
                >
                  {optionsFiltered.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <svg
                  data-spross-date-picker-caption-icon
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M12.3501 7.81235C12.6121 7.48497 12.379 7 11.9597 7H6.04034C5.62109 7 5.388 7.48497 5.6499 7.81235L8.60959 11.512C8.80975 11.7622 9.1903 11.7622 9.39046 11.512L12.3501 7.81235Z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            )
          },
          Nav: ({ onPreviousClick, onNextClick, previousMonth, nextMonth }) => (
            <div data-spross-date-picker-caption-nav>
              <button
                data-spross-date-picker-caption-nav-button
                data-spross-date-picker-caption-nav-button-prev
                data-spross-date-picker-caption-nav-button-disabled={
                  !previousMonth
                }
                data-hover-fill-target="prev"
                onClick={onPreviousClick}
                disabled={!previousMonth}
                onMouseEnter={handleCaptionHoverEnter}
                onMouseLeave={handleCaptionHoverLeave}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  data-spross-date-picker-caption-nav-icon
                >
                  <path
                    fillRule="evenodd"
                    d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z"
                  />
                </svg>
              </button>
              <button
                data-spross-date-picker-caption-nav-button
                data-spross-date-picker-caption-nav-button-next
                data-spross-date-picker-caption-nav-button-disabled={!nextMonth}
                data-hover-fill-target="next"
                onClick={onNextClick}
                disabled={!nextMonth}
                onMouseEnter={handleCaptionHoverEnter}
                onMouseLeave={handleCaptionHoverLeave}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  data-spross-date-picker-caption-nav-icon
                >
                  <path
                    fillRule="evenodd"
                    d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z"
                  />
                </svg>
              </button>
            </div>
          ),
          DayButton: ({
            day,
            modifiers,
            onMouseEnter,
            onMouseLeave,
            ...props
          }) => {
            const { focus, today, disabled, outside, selected } = modifiers

            return (
              <button
                data-spross-date-picker-day
                data-spross-date-picker-day-disabled={disabled}
                data-spross-date-picker-day-today={today}
                data-spross-date-picker-day-selected={selected}
                data-spross-date-picker-day-focus={focus}
                data-spross-date-picker-day-outside={outside}
                onMouseEnter={(e) => {
                  onMouseEnter?.(e)
                  handleTdHoverEnter(e)
                }}
                onMouseLeave={(e) => {
                  onMouseLeave?.(e)
                  handleTdHoverLeave(e)
                }}
                {...props}
              >
                {day.date.getDate()}
              </button>
            )
          },
          ...components,
        }}
        {...otherProps}
      />
    </div>
  )
}

export default Calendar
