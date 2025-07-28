"use client"

import React, { useState, useRef, useEffect } from "react"
import DemoBox from "../DemoBox"
import TextSwap from "./TextSwap"

const Basics = ({ reverse = false }: { reverse?: boolean }) => {
  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  const [text, setText] = useState("yesterday")
  const [date, setDate] = useState(yesterday.toLocaleDateString())
  const timerCount = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerCount.current % 3 === 0) {
        setText("today")
        setDate(today.toLocaleDateString())
      } else if (timerCount.current % 3 === 1) {
        setText("tomorrow")
        setDate(tomorrow.toLocaleDateString())
      } else {
        setText("yesterday")
        setDate(yesterday.toLocaleDateString())
      }
      timerCount.current++
    }, 2000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div>
      <DemoBox className="flex justify-center p-10">
        <div className="flex flex-col items-center">
          <TextSwap className="text-xl font-semibold">{date}</TextSwap>
          <TextSwap className="text-base text-neutral-400">{text}</TextSwap>
        </div>
      </DemoBox>
    </div>
  )
}

export default Basics
