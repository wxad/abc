import DemoBox from "@/components/DemoBox"
import { Pane } from "tweakpane"

import {
  motion,
  useSpring,
  useMotionValue,
  MotionValue,
  animate,
  AnimationPlaybackControls,
} from "motion/react"
import { useEffect, useImperativeHandle, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type CircularTextRef = {
  rotate: MotionValue<number>
}

const CircularText = ({
  ref,
  rotate: rotateProp,
  texts,
  charIndex,
  step,
  mode,
}: {
  ref: (el: CircularTextRef | null) => void
  rotate: MotionValue<number>
  texts: string[]
  charIndex: number
  step: number
  mode: "single" | "final"
}) => {
  const rotate = useSpring(rotateProp, {
    visualDuration: step * charIndex,
    bounce: 0,
    restDelta: 0.01,
  })

  useImperativeHandle(ref, () => ({
    rotate,
  }))

  return (
    <motion.div
      className="absolute top-1/2 -left-6 size-0 select-none font-mono text-base"
      style={{
        rotate: step * charIndex === 0 ? rotateProp : rotate,
      }}
    >
      {texts.map((text, index) => (
        <div
          key={index}
          className="absolute whitespace-nowrap top-1/2 left-25"
          style={{
            paddingLeft: `${charIndex * (mode === "final" ? 1.65 : 1)}ch`,
            transformOrigin: "-100px 50%",
            transform: `translateY(-50%) rotate(${
              (index * 360) / texts.length
            }deg)`,
          }}
        >
          {[...text].map((char, index) => (
            <span
              key={index}
              className={cn(
                "inline-block",
                mode === "final" ? "w-[1.65ch]" : "w-[1ch]"
              )}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

function splitByCharacter(arr: string[]) {
  const maxLength = Math.max(...arr.map((text) => text.length)) // 找到最大字符串长度
  const result = []

  for (let i = 0; i < maxLength; i++) {
    const tempArr = arr.map((text) => text[i] || "") // 获取每个字符串第 i 个字符，若超出则用空字符串代替
    result.push(tempArr)
  }

  return result
}

const Demo = ({
  mode,
  audio,
}: {
  mode: "single" | "final"
  audio: boolean
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const texts =
    mode === "single"
      ? [
          "Huge epic braam",
          "Horses galloping by",
          "Cat purring loudly",
          "Rock drum fill",
          "Tornado warning siren",
          "Eerie mood music",
          "A car whizzing by",
          "Brassy tuba, staccato",
          "Video game power-up",
          "Mopping a floor",
          "Small automobile weapon",
          "Tinkling revelsings",
          "Small tropical airplane",
          "Intense cinematic boom",
        ]
      : [
          "微广十一周年生日快乐",
          "超喜欢和大家一起并肩作战的感觉！",
          "祝微信广告越来越好！",
          "微广十一周年生日快乐",
          "超喜欢和大家一起并肩作战的感觉！",
          "祝微信广告越来越好！",
          "微广十一周年生日快乐",
          "超喜欢和大家一起并肩作战的感觉！",
          "祝微信广告越来越好！",
          "微广十一周年生日快乐",
          "超喜欢和大家一起并肩作战的感觉！",
          "祝微信广告越来越好！",
          "微广十一周年生日快乐",
          "超喜欢和大家一起并肩作战的感觉！",
        ]

  const splitTexts = splitByCharacter(texts)

  const rotateStart = useMotionValue(0)
  const rotate = useMotionValue(0)
  const lastAudioPlayedDeg = useRef(0)
  const animateRef = useRef<AnimationPlaybackControls | null>(null)
  const circularTextsRefs = useRef<CircularTextRef[]>([])

  const paneWrapper = useRef<HTMLDivElement | null>(null)
  const paneRef = useRef<Pane | null>(null)
  const [params, setParams] = useState({
    step: 0.008,
  })

  rotate.on("change", (value) => {
    // 每经过 360 / texts.length 的整数倍，就播放一个声音
    const nearest =
      Math.round(value / (360 / texts.length)) * (360 / texts.length)

    if (
      Math.abs(nearest - value) < 3 &&
      nearest !== lastAudioPlayedDeg.current
    ) {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          audioRef.current.play()
        } catch (error) {
          console.error("[yijie]", error)
        }
      }
      lastAudioPlayedDeg.current = nearest
    }
  })

  useEffect(() => {
    if (mode === "final") {
      paneRef.current = new Pane({
        container: paneWrapper.current,
      })

      paneRef.current.on("change", (ev) => {
        setParams((prev) => ({
          ...prev,
          // @ts-ignore
          [ev.target.label]: ev.value,
        }))
      })

      paneRef.current.addBinding(params, "step", {
        min: 0,
        max: 0.02,
        step: 0.001,
        value: 0.008,
      })
    }

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  return (
    <DemoBox className="flex items-center justify-center">
      {mode === "final" && (
        <div ref={paneWrapper} className="absolute top-1 right-1 z-1" />
      )}
      {audio && <audio ref={audioRef} src="/abc/wxad11/elevenlabs-tick.mp3" />}
      <div className="hidden md:flex absolute z-1 bottom-4 right-4 items-center gap-1 text-xs text-neutral-400 bg-white/10 backdrop-blur-[1px]">
        <svg className="size-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.25 9a7.75 7.75 0 1 1 15.5 0v6a7.75 7.75 0 0 1-15.5 0zm7-6.205A6.251 6.251 0 0 0 5.75 9v6a6.25 6.25 0 1 0 12.5 0V9a6.251 6.251 0 0 0-5.5-6.205v3.583a2.25 2.25 0 0 1 1.5 2.122v2a2.25 2.25 0 0 1-4.5 0v-2c0-.98.626-1.813 1.5-2.122zM12 7.75a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75"
            clipRule="evenodd"
          />
        </svg>
        上下拖动体验
      </div>
      <div className="flex md:hidden absolute z-1 bottom-4 right-4 items-center gap-1 text-xs text-neutral-400 bg-white/10 backdrop-blur-[1px]">
        <svg className="size-4" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M196 88a27.86 27.86 0 0 0-13.35 3.39A28 28 0 0 0 144 74.7V44a28 28 0 0 0-56 0v80l-3.82-6.13A28 28 0 0 0 35.73 146l4.67 8.23C74.81 214.89 89.05 240 136 240a88.1 88.1 0 0 0 88-88v-36a28 28 0 0 0-28-28m12 64a72.08 72.08 0 0 1-72 72c-37.63 0-47.84-18-81.68-77.68l-4.69-8.27V138A12 12 0 0 1 54 121.61a11.9 11.9 0 0 1 6-1.6a12 12 0 0 1 10.41 6a2 2 0 0 0 .14.23l18.67 30A8 8 0 0 0 104 152V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0v-12a12 12 0 0 1 24 0v20a8 8 0 0 0 16 0v-4a12 12 0 0 1 24 0Z"
          />
        </svg>
        上下滑动体验
      </div>
      <motion.div
        className="relative w-[320px] h-[360px] overflow-hidden mask-l-from-70% mask-l-to-100%"
        drag
        onDragStart={() => {
          if (animateRef.current) {
            animateRef.current.stop()
          }
          rotateStart.set(rotate.get())
        }}
        onDragEnd={(_, info) => {
          const { y: vy } = info.velocity
          if (vy === 0) {
            // 转到最靠近 360 / texts.length 的整数倍
            const nearest =
              Math.round(rotate.get() / (360 / texts.length)) *
              (360 / texts.length)
            if (animateRef.current) {
              animateRef.current.stop()
            }
            animateRef.current = animate(rotate.get(), nearest, {
              type: "spring",
              visualDuration: 0.4,
              bounce: 0,
              restDelta: 0.01,
              onUpdate: (v) => {
                rotate.jump(v)
              },
            })
          } else {
            const to = rotate.get() + vy * 0.01 * 10
            const nearest =
              Math.round(to / (360 / texts.length)) * (360 / texts.length)
            if (animateRef.current) {
              animateRef.current.stop()
            }
            animateRef.current = animate(rotate.get(), nearest, {
              type: "spring",
              visualDuration: 0.4,
              bounce: 0,
              restDelta: 0.01,
              velocity: vy,
              onUpdate: (v) => {
                rotate.jump(v)
              },
            })
          }
        }}
        onDrag={(_, info) => {
          // 20250722: motion@12.23.6 有 bug，onDrag 会触发于 onDragStart 之前
          // https://github.com/motiondivision/motion/issues/2345
          setTimeout(() => {
            const { offset } = info
            const { y } = offset
            rotate.set(rotateStart.get() + y / 4)
          }, 0)
        }}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {splitTexts.map((text, index) => (
          <CircularText
            ref={(el) => {
              if (el) {
                circularTextsRefs.current[index] = el
              }
            }}
            key={index}
            rotate={rotate}
            texts={text}
            charIndex={index}
            mode={mode}
            step={mode === "final" ? params.step : 0}
          />
        ))}
      </motion.div>
    </DemoBox>
  )
}

export default Demo
