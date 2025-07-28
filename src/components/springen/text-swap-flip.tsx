"use client"

import React, { useState, useRef, useEffect } from "react"
import { ArrowRight } from 'lucide-react';
import DemoBox from "../DemoBox"
import TextSwap from "./TextSwap"
import { Pane } from "tweakpane"

const Basics = ({ reverse = false }: { reverse?: boolean }) => {
  const [flipped, setFlipped] = useState(false)
  const [params, setParams] = useState({
    delay: 30,
    duration: 700,
    reversed: true,
    blur: 3,
    y: 13,
  })

  const tweakpaneContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const pane = new Pane({
      container: tweakpaneContainerRef.current as HTMLElement,
    })

    pane.addBinding(params, "delay", {
      min: 0,
      max: 100,
      step: 10,
    })

    pane.addBinding(params, "duration", {
      min: 100,
      max: 1000,
      step: 100,
    })

    pane.addBinding(params, "blur", {
      min: 0,
      max: 10,
      step: 1,
    })

    pane.addBinding(params, "y", {
      min: 0,
      max: 30,
      step: 1,
    })

    pane.addBinding(params, "reversed")

    pane.on("change", (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.key]: ev.value,
      }))
    })

    return () => {
      pane.dispose()
    }
  }, [])

  return (
    <div>
      <DemoBox className="flex flex-col pt-2 px-2 pb-12 gap-12">
        <div ref={tweakpaneContainerRef} className="opacity-90 self-end" />
        <div className="flex flex-col gap-2 items-center">
          <TextSwap.Flip
            className="text-xl font-semibold"
            flipped={flipped}
            originalText="轻量变化"
            swappedText="翻转效果"
            {...params}
          />
          <TextSwap.Flip
            className="text-xl font-semibold"
            flipped={flipped}
            originalText="TextSwap.Flip"
            swappedText="TextSwap.Flip"
            {...params}
          />
        </div>
      </DemoBox>
      <DemoBox className="flex justify-center items-center p-10">
        <div className="flex items-center justify-between px-3 w-[260px] h-12 bg-white border border-neutral-200 rounded-full">
          <TextSwap.Flip
            className="text-xl font-semibold"
            flipped={flipped}
            originalText="Start Deploying"
            swappedText="Start Deploying"
          />
          <div className="flex items-center justify-center size-7 rounded-full bg-black">
            <ArrowRight className="text-white size-5" />
          </div>
        </div>
      </DemoBox>
    </div>
  )
}

export default Basics
