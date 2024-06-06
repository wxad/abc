import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"
import { Item } from "./DialogOld"

const DialogNew = () => {
  const [show0, setShow0] = useState(false)
  const [show1, setShow1] = useState(false)
  const interval = useRef(0)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setShow0((prev) => !prev)

      setTimeout(() => {
        setShow1((prev) => !prev)
      }, 1000)

      setTimeout(() => {
        setShow1((prev) => !prev)
      }, 2000)

      setTimeout(() => {
        setShow0((prev) => !prev)
      }, 3000)
    }, 4000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="h-[420px] overflow-hidden">
      <Item show={show0} stacked={show1} />
      <Item show={show1} bg={false} />
    </DemoBox>
  )
}

export default DialogNew
