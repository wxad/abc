import DemoBox from "@/components/DemoBox"
import { Wxad12MorphSlider } from "@/components/wxad12/Wxad12MorphSlider"
import { WXAD12_MORPH } from "@/components/wxad12/wxad12MorphConfig"
import {
  N_PATH_1_FROM,
  N_PATH_1_TO,
  N_PATH_2_FROM,
  N_PATH_2_TO,
} from "@/components/wxad12/wordMorphPaths"
import {
  animate,
  motion,
  useMotionValue,
  type AnimationPlaybackControls,
} from "motion/react"
import { interpolate } from "flubber"
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

const Wxad12WordMorph = () => {
  const uid = useId().replace(/:/g, "")
  const grad0 = `wxad12-n-0-${uid}`
  const grad1 = `wxad12-n-1-${uid}`

  const black1 = useRef<SVGPathElement>(null)
  const black2 = useRef<SVGPathElement>(null)
  const grad1Ref = useRef<SVGPathElement>(null)
  const grad2Ref = useRef<SVGPathElement>(null)
  const blackLayer = useRef<SVGGElement>(null)
  const gradLayer = useRef<SVGGElement>(null)

  const morphProgress = useMotionValue(0)
  const nScale = useMotionValue(1)
  const morphCtrl = useRef<AnimationPlaybackControls | null>(null)
  const scaleCtrl = useRef<AnimationPlaybackControls | null>(null)
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const draggingRef = useRef(false)

  const [sliderValue, setSliderValue] = useState(0)

  const mix = useMemo(
    () => ({
      mix1: interpolate(N_PATH_1_FROM, N_PATH_1_TO, { maxSegmentLength: 1 }),
      mix2: interpolate(N_PATH_2_FROM, N_PATH_2_TO, { maxSegmentLength: 1 }),
    }),
    []
  )

  const applyMorph = useCallback(
    (p: number) => {
      const d1 = mix.mix1(p)
      const d2 = mix.mix2(p)
      black1.current?.setAttribute("d", d1)
      black2.current?.setAttribute("d", d2)
      grad1Ref.current?.setAttribute("d", d1)
      grad2Ref.current?.setAttribute("d", d2)
      if (blackLayer.current) blackLayer.current.style.opacity = String(1 - p)
      if (gradLayer.current) gradLayer.current.style.opacity = String(p)
    },
    [mix]
  )

  const clearPause = useCallback(() => {
    if (pauseTimer.current) {
      clearTimeout(pauseTimer.current)
      pauseTimer.current = null
    }
  }, [])

  const stopAuto = useCallback(() => {
    morphCtrl.current?.stop()
    morphCtrl.current = null
    scaleCtrl.current?.stop()
    scaleCtrl.current = null
    clearPause()
  }, [clearPause])

  const legDuration = useCallback((target: number) => {
    const from = morphProgress.get()
    const span = Math.abs(target - from)
    return span > 0 ? WXAD12_MORPH.duration * span : WXAD12_MORPH.duration
  }, [morphProgress])

  const animateLeg = useCallback(
    (target: 0 | 1, onComplete: () => void) => {
      const from = morphProgress.get()
      if (Math.abs(target - from) < 1e-4) {
        onComplete()
        return
      }
      const duration = legDuration(target)
      morphCtrl.current = animate(morphProgress, target, {
        duration,
        ease: WXAD12_MORPH.ease,
        onComplete,
      })
      scaleCtrl.current = animate(
        nScale,
        target === 1 ? WXAD12_MORPH.scaleTo : 1,
        { duration, ease: WXAD12_MORPH.ease }
      )
    },
    [legDuration, morphProgress, nScale]
  )

  const continueLoopFrom = useCallback(
    (at: 0 | 1) => {
      if (draggingRef.current) return
      if (at === 1) {
        pauseTimer.current = setTimeout(() => {
          if (draggingRef.current) return
          animateLeg(0, () => {
            if (draggingRef.current) return
            pauseTimer.current = setTimeout(() => {
              runLoopRef.current()
            }, WXAD12_MORPH.pauseMs)
          })
        }, WXAD12_MORPH.pauseMs)
      } else {
        pauseTimer.current = setTimeout(() => {
          runLoopRef.current()
        }, WXAD12_MORPH.pauseMs)
      }
    },
    [animateLeg]
  )

  const runLoopRef = useRef<() => void>(() => {})

  runLoopRef.current = () => {
    if (draggingRef.current) return
    animateLeg(1, () => {
      if (draggingRef.current) return
      pauseTimer.current = setTimeout(() => {
        if (draggingRef.current) return
        animateLeg(0, () => {
          if (draggingRef.current) return
          pauseTimer.current = setTimeout(() => {
            runLoopRef.current()
          }, WXAD12_MORPH.pauseMs)
        })
      }, WXAD12_MORPH.pauseMs)
    })
  }

  const startAlternate = useCallback(() => {
    if (draggingRef.current) return
    stopAuto()
    runLoopRef.current()
  }, [stopAuto])

  const resumeAlternateFromCurrent = useCallback(() => {
    if (draggingRef.current) return
    stopAuto()
    const p = morphProgress.get()
    const toward: 0 | 1 = p <= 0.5 ? 1 : 0
    animateLeg(toward, () => {
      if (draggingRef.current) return
      continueLoopFrom(toward)
    })
  }, [animateLeg, continueLoopFrom, morphProgress, stopAuto])

  const setProgress = useCallback(
    (p: number) => {
      morphProgress.set(p)
      nScale.set(1 + p * (WXAD12_MORPH.scaleTo - 1))
    },
    [morphProgress, nScale]
  )

  const [rootRef, { entry }] = useIntersectionObserver({ threshold: 0.35 })
  const inView = entry?.isIntersecting

  useEffect(() => {
    const unsub = morphProgress.on("change", (v) => {
      applyMorph(v)
      setSliderValue(v)
    })
    applyMorph(morphProgress.get())
    return unsub
  }, [applyMorph, morphProgress])

  useEffect(() => {
    if (!inView) {
      stopAuto()
      setProgress(0)
      return
    }
    startAlternate()
    return () => stopAuto()
  }, [inView, setProgress, startAlternate, stopAuto])

  return (
    <DemoBox
      ref={rootRef}
      className="flex flex-col items-center justify-center gap-10 py-12 min-h-[220px]"
    >
      <motion.div style={{ scale: nScale }}>
        <svg
          className="block h-[93px] w-[48px]"
          viewBox="0 0 32 62"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={grad0}
              x1="6.59991"
              y1="23.1397"
              x2="15.3213"
              y2="30.8021"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00F57A" />
              <stop offset="1" stopColor="#00DB75" />
            </linearGradient>
            <linearGradient
              id={grad1}
              x1="12.8774"
              y1="23.8706"
              x2="34.5925"
              y2="42.3599"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#98FF92" />
              <stop offset="0.25" stopColor="#07F667" />
              <stop offset="1" stopColor="#00EA6F" />
            </linearGradient>
          </defs>
          <g ref={blackLayer}>
            <path ref={black1} d={N_PATH_1_FROM} fill="black" />
            <path ref={black2} d={N_PATH_2_FROM} fill="black" />
          </g>
          <g ref={gradLayer} style={{ opacity: 0 }}>
            <path ref={grad1Ref} d={N_PATH_1_FROM} fill={`url(#${grad0})`} />
            <path ref={grad2Ref} d={N_PATH_2_FROM} fill={`url(#${grad1})`} />
          </g>
        </svg>
      </motion.div>

      <Wxad12MorphSlider
        value={sliderValue}
        onChange={setProgress}
        onInteractionStart={() => {
          draggingRef.current = true
          stopAuto()
        }}
        onInteractionEnd={() => {
          draggingRef.current = false
          resumeAlternateFromCurrent()
        }}
      />
    </DemoBox>
  )
}

export default Wxad12WordMorph
