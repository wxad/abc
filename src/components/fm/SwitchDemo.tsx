import DemoBox from "@/components/DemoBox"
import { useEffect, useRef, useState } from "react"

const Switch = ({
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
  let indicatorBgClass = "bg-neutral-300"
  let indicatorInnerClass = ""

  if (checked) {
    indicatorBgClass = "bg-neutral-900"

    if (active) {
    }
  } else {
    if (active) {
    }

    if (hover) {
      indicatorBgClass = "bg-neutral-400"
    }
  }

  return (
    <div className="inline-flex items-center cursor-pointer">
      <div
        className={`relative mr-1 w-9 h-5 ${indicatorBgClass} transition-all duration-300 rounded-2xl`}
      >
        <div
          className={`absolute top-[2px] left-[2px] h-4 bg-white rounded-xl ${indicatorInnerClass} ${
            longAnimation && active ? "w-5" : "w-4"
          }`}
          style={{
            transform: checked
              ? "translate3d(16px, 0, 0)"
              : "translate3d(0, 0, 0)",
            transition: shortAnimation
              ? "300ms cubic-bezier(0.36, 1.46, 0.38, 1.01) all"
              : "300ms ease all",
          }}
        />
      </div>
      <div>{children}</div>
    </div>
  )
}

const SwitchShort = () => {
  const interval = useRef<number>(0)
  const [state, setState] = useState<undefined | "hover" | "active">()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setState("hover")

      setTimeout(() => {
        setChecked(true)
      }, 1000)

      setTimeout(() => {
        setChecked(false)
        setState(undefined)
      }, 3000)
    }, 4000)
    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <div className="relative">
      <Switch
        hover={state === "hover"}
        active={state === "active"}
        checked={checked}
        shortAnimation
      >
        短按演示
      </Switch>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-medium text-neutral-500 text-xs">
        {checked ? "checked" : state === "hover" ? "hover" : ""}
      </div>
    </div>
  )
}

const SwitchLong = () => {
  const interval = useRef<number>(0)
  const [state, setState] = useState<undefined | "hover" | "active">()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setState("hover")

      setTimeout(() => {
        setState("active")
      }, 1000)

      setTimeout(() => {
        setState("hover")
        setChecked(true)
      }, 2000)

      setTimeout(() => {
        setChecked(false)
        setState(undefined)
      }, 3000)
    }, 4000)
    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  let text = ""

  if (checked) {
    text = "checked"
  } else if (state === "active") {
    text = "active"
  } else if (state === "hover") {
    text = "hover"
  }

  return (
    <div className="relative">
      <Switch
        hover={!!state}
        active={state === "active"}
        checked={checked}
        longAnimation
      >
        长按演示
      </Switch>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-medium text-neutral-500 text-xs">
        {text}
      </div>
    </div>
  )
}

const Demo = (props: {}) => {
  return (
    <DemoBox className="py-10">
      <div className="flex items-center justify-center gap-12 text-sm">
        <SwitchShort />
        <SwitchLong />
      </div>
    </DemoBox>
  )
}

export default Demo
