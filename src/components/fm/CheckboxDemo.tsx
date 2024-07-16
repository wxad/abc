import DemoBox from "@/components/DemoBox"
import { useEffect, useRef, useState } from "react"
import Checkbox from "./Checkbox"

const CheckboxShort = () => {
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
      <Checkbox
        hover={state === "hover"}
        active={state === "active"}
        checked={checked}
        shortAnimation
      >
        短按演示
      </Checkbox>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-medium text-neutral-500 text-xs">
        {checked ? "checked" : state === "hover" ? "hover" : ""}
      </div>
    </div>
  )
}

const CheckboxLong = () => {
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
      <Checkbox
        hover={!!state}
        active={state === "active"}
        checked={checked}
        longAnimation
      >
        长按演示
      </Checkbox>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-medium text-neutral-500 text-xs">
        {text}
      </div>
    </div>
  )
}

const Demo = (props: {}) => {
  return (
    <DemoBox className="py-16 overflow-hidden">
      <div className="flex items-center justify-center gap-16 text-sm scale-110">
        <CheckboxShort />
        <CheckboxLong />
      </div>
    </DemoBox>
  )
}

export default Demo
