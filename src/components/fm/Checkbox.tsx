import { useEffect, useRef, useState } from "react"

const Checkbox = ({
  checked = false,
  hover = false,
  active = false,
  shortAnimation = false,
  longAnimation = false,
  children,
}: {
  hover?: boolean
  checked?: boolean
  children?: React.ReactNode
  active?: boolean
  shortAnimation?: boolean
  longAnimation?: boolean
}) => {
  const indicatorRef = useRef<HTMLDivElement>(null)

  let indicatorBgClass = "bg-white"
  let indicatorBorderClass = "border-neutral-300"
  let indicatorLeftOpacityClass = "opacity-0"
  let indicatorRightOpacityClass = "opacity-0"
  let indicatorLeftBgClass = "bg-black"
  let indicatorRightBgClass = "bg-black"

  if (checked) {
    indicatorBgClass = "bg-neutral-900"
    indicatorBorderClass = "border-neutral-900"
    indicatorLeftOpacityClass = "opacity-100"
    indicatorRightOpacityClass = "opacity-100"
    indicatorLeftBgClass = "bg-white"
    indicatorRightBgClass = "bg-white"

    if (hover) {
      indicatorBgClass = "bg-neutral-600"
      indicatorBorderClass = "border-neutral-600"
    }

    if (active) {
      indicatorRightOpacityClass = "opacity-0"
    }
  } else {
    if (hover) {
      indicatorBorderClass = "border-neutral-900"
    }
    if (active) {
      indicatorLeftOpacityClass = "opacity-100"
    }
  }

  useEffect(() => {
    if (shortAnimation) {
      if (checked) {
        indicatorRef.current!.style.animation =
          "aduiCheckboxIndicatorScale ease 0.2s both"
      } else {
        indicatorRef.current!.style.animation = ""
      }
    }
  }, [shortAnimation, checked])

  return (
    <div className="inline-flex items-center cursor-pointer">
      <div
        className={`relative mr-1 w-4 h-4 border rounded-sm ${indicatorBorderClass} ${indicatorBgClass} ${
          shortAnimation ? "transition-all duration-300" : ""
        }`}
        ref={indicatorRef}
      >
        <div
          className={`absolute top-[2.5px] left-[4.5px] w-[5px] h-2 rotate-45 ${
            checked || active ? "scale-100" : "scale-0"
          }`}
          style={{
            transition:
              shortAnimation && checked
                ? "300ms cubic-bezier(0.36, 1.46, 0.38, 1.01) all"
                : undefined,
          }}
        >
          <div
            className={`absolute bottom-0 left-0 w-full h-[2px] ${indicatorLeftOpacityClass} ${indicatorLeftBgClass} ${
              longAnimation
                ? `transition-all duration-300 origin-left ${
                    checked || active ? "scale-x-100" : "scale-x-0"
                  }`
                : ""
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 w-[2px] h-full ${indicatorRightOpacityClass} ${indicatorRightBgClass} ${
              longAnimation
                ? `transition-all duration-300 origin-left ${
                    checked ? "scale-y-100" : "scale-y-0"
                  }`
                : ""
            }`}
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Checkbox
