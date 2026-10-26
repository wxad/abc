import DemoBox from "@/components/DemoBox"
import {
  N_PATH_1_FROM,
  N_PATH_1_TO,
  N_PATH_2_FROM,
  N_PATH_2_TO,
  TWO_CLIP_PATH,
  TWO_GRADIENT_STOPS,
  TWO_STROKE_PATH,
} from "@/components/wxad12/wordMorphPaths"
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react"
import { interpolate } from "flubber"
import { Pane } from "tweakpane"
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

/** 与 Sites/wxad12 handleStart 相同的一对词，三种字母角色都在 */
const FROM_WORD = "yijie"
const TO_WORD = "notice"
const MEANING = "洞察"
const MESSAGE = "发现别人忽略的细节，\n就是创造价值的开始。"

/** 手机端把 390 画面缩到 300，md 及以上保持原尺寸 */

const SPREAD = 5
const Y_MAG = 88
const JITTER = 3
const MOVE = { type: "spring" as const, visualDuration: 2, bounce: 0 }
const FADE = { type: "spring" as const, visualDuration: 0.25, bounce: 0 }
const EASE_ARC = ["easeOut", [0.58, 0.09, 0.32, 0.95]] as [
  "easeOut",
  [number, number, number, number],
]

const LETTER = {
  svgW: 27,
  ghostN: 34,
  fontSize: 48,
  lineHeight: 62,
  spaceW: 16,
}

function splitChars(text: string) {
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].map(
    (part) => part.segment
  )
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function computeLetterMapping(from: string, to: string) {
  const fromChars = splitChars(from)
  const toChars = splitChars(to)
  const usedFrom = new Set<number>()
  const toMappings: (number | null)[] = []

  for (let ti = 0; ti < toChars.length; ti++) {
    let found = -1
    for (let fi = 0; fi < fromChars.length; fi++) {
      if (!usedFrom.has(fi) && fromChars[fi] === toChars[ti]) {
        found = fi
        break
      }
    }
    if (found >= 0) {
      usedFrom.add(found)
      toMappings.push(found)
    } else {
      toMappings.push(null)
    }
  }

  return {
    toMappings,
    flyAway: fromChars.map((_, fi) => !usedFrom.has(fi)),
  }
}

const WORD_BANK: { word: string; meaning: string; message: string }[] = [
  { word: "notice", meaning: "洞察", message: "发现别人忽略的细节，\n就是创造价值的开始。" },
  { word: "novel", meaning: "创新", message: "保持对创新的追求，\n让生活的馈赠，\n降落在有趣的灵魂上。" },
  { word: "nova", meaning: "新兴", message: "新的故事正在发生，\n属于你的高光，\n来自持续积累后的爆发。" },
  { word: "nourish", meaning: "滋养", message: "相信你的能量，\n既能向内扎根，\n又能滋养身边的人。" },
  { word: "noted", meaning: "被记住", message: "一路同行，\n真正被记住的，\n是持续交付的可靠。" },
  { word: "notable", meaning: "出众", message: "繁星点点中，\n那是你的光芒，\n那是源于真实与坚持。" },
  { word: "north", meaning: "方向", message: "成为方向，\n而不仅是答案。" },
  { word: "noble", meaning: "高尚", message: "做难而正确的事，\n长期主义终会发光。" },
  { word: "nimble", meaning: "敏捷", message: "灵活应变，\n步履不停。" },
  { word: "nifty", meaning: "灵巧", message: "只要轻巧地出手，\n就把难题变得有章法。" },
  { word: "nice", meaning: "友善", message: "替彼此解开心中的孤单，\n情同两手共患难，\n不怕荆棘铺满路。" },
  { word: "nexus", meaning: "纽带", message: "成为连接人与创意、\n现在与未来的那个节点。" },
  { word: "network", meaning: "相互连接", message: "每一次连接，\n都让未来多一种可能。" },
  { word: "neighbor", meaning: "在身边", message: "与彼此靠近，\n信任和灵感更容易发生。" },
  { word: "near", meaning: "靠近", message: "从不相识，\n开始心接近，\n默默以真挚待人" },
  { word: "natural", meaning: "自然", message: "自然的真挚，\n最经得起时间。" },
  { word: "next", meaning: "下一程", message: "繁星流动，\n和你同路，\n一起向更广阔的远方。" },
  { word: "new", meaning: "新篇章", message: "更新自己，\n世界也会随之焕然一新。" },
  { word: "now", meaning: "就现在", message: "最好的时机，\n就是现在，\n冲！" },
  { word: "neon", meaning: "光芒", message: "保持自己的光，\n你的独特色彩，\n就能照亮身边的人。" },
  { word: "friend", meaning: "有朋友", message: "有朋友，没忧愁\n人生如梦，用真心换真心" },
  { word: "keen", meaning: "热忱", message: "热忱是你可靠的伙伴，\n保持对世界的好奇，\n以炽热之心奔赴热爱。" },
  { word: "join", meaning: "参与", message: "每一次参与，\n都在共同创造，\n属于我们的成就。" },
  { word: "pin", meaning: "精准", message: "细微之处，\n更见功力。" },
]

function toLatinName(raw: string) {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
}

function pickWord(from: string, avoid?: string) {
  const letters = new Set(splitChars(from))
  const matching = WORD_BANK.filter((item) =>
    splitChars(item.word).some((char) => letters.has(char))
  )
  const pool = matching.length > 0 ? matching : WORD_BANK
  const choices = pool.filter((item) => item.word !== avoid)
  const list = choices.length > 0 ? choices : pool
  return list[Math.floor(Math.random() * list.length)]
}

type MorphNode = {
  black1: SVGPathElement | null
  black2: SVGPathElement | null
  grad1: SVGPathElement | null
  grad2: SVGPathElement | null
  blackLayer: SVGGElement | null
  gradLayer: SVGGElement | null
}

function MorphN({
  morphable,
  width,
  height,
  nodeRef,
}: {
  morphable: boolean
  width: number
  height: number
  nodeRef: RefObject<MorphNode | null>
}) {
  const uid = useId()
  const g0 = `choreo-n0-${uid}`
  const g1 = `choreo-n1-${uid}`
  const black1 = useRef<SVGPathElement>(null)
  const black2 = useRef<SVGPathElement>(null)
  const grad1 = useRef<SVGPathElement>(null)
  const grad2 = useRef<SVGPathElement>(null)
  const blackLayer = useRef<SVGGElement>(null)
  const gradLayer = useRef<SVGGElement>(null)

  useLayoutEffect(() => {
    if (gradLayer.current) gradLayer.current.style.opacity = "0"
    if (!morphable) {
      nodeRef.current = null
      return
    }
    nodeRef.current = {
      black1: black1.current,
      black2: black2.current,
      grad1: grad1.current,
      grad2: grad2.current,
      blackLayer: blackLayer.current,
      gradLayer: gradLayer.current,
    }
  }, [morphable, nodeRef])

  return (
    <svg className="block" style={{ width, height }} viewBox="0 0 32 62" fill="none">
      <defs>
        <linearGradient id={g0} x1="6.59991" y1="23.1397" x2="15.3213" y2="30.8021" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F57A" />
          <stop offset="1" stopColor="#00DB75" />
        </linearGradient>
        <linearGradient id={g1} x1="12.8774" y1="23.8706" x2="34.5925" y2="42.3599" gradientUnits="userSpaceOnUse">
          <stop stopColor="#98FF92" />
          <stop offset="0.25" stopColor="#07F667" />
          <stop offset="1" stopColor="#00EA6F" />
        </linearGradient>
      </defs>
      <g ref={blackLayer}>
        <path ref={black1} d={N_PATH_1_FROM} fill="black" />
        <path ref={black2} d={N_PATH_2_FROM} fill="black" />
      </g>
      <g ref={gradLayer}>
        <path ref={grad1} d={N_PATH_1_FROM} fill={`url(#${g0})`} />
        <path ref={grad2} d={N_PATH_2_FROM} fill={`url(#${g1})`} />
      </g>
    </svg>
  )
}

const textStyle = {
  fontSize: LETTER.fontSize,
  lineHeight: `${LETTER.lineHeight}px`,
}
const svgWrapStyle = {
  width: LETTER.svgW,
  height: LETTER.lineHeight,
}
const ghostNStyle = {
  width: LETTER.ghostN,
  height: LETTER.lineHeight,
}

const Wxad12Choreo = ({
  mode,
  note,
}: {
  mode: "flat" | "letters" | "full" | "play"
  note?: string
}) => {
  const uid = useId().replace(/:/g, "")
  const showSequence = mode === "full" || mode === "play"
  const [name, setName] = useState(FROM_WORD)
  const [tune, setTune] = useState({ spread: SPREAD, rotate: 5 })
  const tuneRef = useRef(tune)
  const paneHost = useRef<HTMLDivElement>(null)
  const [picked, setPicked] = useState<{
    word: string
    meaning: string
    message: string
  } | null>(null)
  const fromWord = mode === "play" ? name || FROM_WORD : FROM_WORD
  const toWord = picked?.word ?? TO_WORD
  const meaning = picked?.meaning ?? MEANING
  const message = picked?.message ?? MESSAGE
  const fromChars = useMemo(() => splitChars(fromWord), [fromWord])
  const toChars = useMemo(() => splitChars(toWord), [toWord])
  const mapping = useMemo(
    () => computeLetterMapping(fromWord, toWord),
    [fromWord, toWord]
  )
  const firstN = toWord.indexOf("n")
  const mappedN = firstN >= 0 ? mapping.toMappings[firstN] : null
  const firstNFrom = typeof mappedN === "number" ? mappedN : -1
  const firstNNew = firstN >= 0 && mappedN == null ? firstN : -1

  const letterRefs = useRef<(HTMLElement | null)[]>([])
  const stageRef = useRef<HTMLDivElement>(null)
  const ghostRefs = useRef<(HTMLElement | null)[]>([])
  const newLetterRefs = useRef<(HTMLElement | null)[]>([])
  const morphNode = useRef<MorphNode | null>(null)
  const randRef = useRef<{
    y: number[]
    rotate: number[]
    jitter: number[]
    yTo: number[]
    rotateTo: number[]
    jitterTo: number[]
  } | null>(null)

  const titleOpacity = useMotionValue(showSequence ? 0 : 0)
  const titleY = useMotionValue(showSequence ? 20 : 0)
  const titleBlur = useMotionValue(showSequence ? 4 : 0)
  const bodyOpacity = useMotionValue(0)
  const bodyY = useMotionValue(showSequence ? 20 : 0)
  const bodyBlur = useMotionValue(showSequence ? 4 : 0)
  const titleFilter = useTransform(titleBlur, [0, 4], ["blur(0px)", "blur(4px)"])
  const bodyFilter = useTransform(bodyBlur, [0, 4], ["blur(0px)", "blur(4px)"])
  const twoOpacity = useMotionValue(mode === "letters" ? 1 : 0)
  const twoPathLength = useMotionValue(mode === "letters" ? 1 : 0)
  const buttonOpacity = useMotionValue(showSequence ? 0 : 1)
  const cardScale = useMotionValue(1)
  const svgScale = useMotionValue(1)

  const controls = useRef<AnimationPlaybackControls[]>([])
  const timers = useRef<number[]>([])
  const playGen = useRef(0)

  const [rootRef, { entry }] = useIntersectionObserver({ threshold: 0.35 })
  const inView = entry?.isIntersecting
  const inViewRef = useRef(inView)
  inViewRef.current = inView

  const stop = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    controls.current.forEach((control) => control.stop())
    controls.current = []
  }, [])

  const later = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  const run = useCallback((control: AnimationPlaybackControls) => {
    controls.current.push(control)
    return control
  }, [])

  const resetMorph = useCallback(() => {
    const node = morphNode.current
    if (!node) return
    node.black1?.setAttribute("d", N_PATH_1_FROM)
    node.black2?.setAttribute("d", N_PATH_2_FROM)
    node.grad1?.setAttribute("d", N_PATH_1_FROM)
    node.grad2?.setAttribute("d", N_PATH_2_FROM)
    if (node.blackLayer) {
      node.blackLayer.style.transition = ""
      node.blackLayer.style.opacity = "1"
    }
    if (node.gradLayer) {
      node.gradLayer.style.transition = ""
      node.gradLayer.style.opacity = "0"
    }
    svgScale.set(1)
  }, [svgScale])

  const play = useCallback(() => {
    stop()
    const gen = ++playGen.current
    if (
      !randRef.current ||
      randRef.current.y.length !== fromChars.length ||
      randRef.current.yTo.length !== toChars.length
    ) {
      randRef.current = {
        y: fromChars.map(() => rand(0.8, 1)),
        rotate: fromChars.map(() => rand(-1, 1)),
        jitter: fromChars.map(() => rand(-1, 1)),
        yTo: toChars.map(() => rand(0.8, 1)),
        rotateTo: toChars.map(() => rand(-1, 1)),
        jitterTo: toChars.map(() => rand(-1, 1)),
      }
    }
    const randPack = randRef.current

    fromChars.forEach((_, i) => {
      const el = letterRefs.current[i]
      if (!el) return
      animate(el, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }, { duration: 0 })
    })
    newLetterRefs.current.forEach((el) => {
      if (!el) return
      animate(el, { x: 0, y: 0, rotate: 0, opacity: 0, filter: "blur(2px)" }, { duration: 0 })
    })
    resetMorph()
    titleOpacity.set(0)
    titleY.set(20)
    titleBlur.set(4)
    bodyOpacity.set(0)
    bodyY.set(20)
    bodyBlur.set(4)
    cardScale.set(1)
    if (mode === "letters") {
      twoOpacity.set(1)
      twoPathLength.set(1)
      buttonOpacity.set(0)
    } else {
      twoOpacity.set(0)
      twoPathLength.set(0)
      buttonOpacity.set(showSequence ? 0 : 1)
    }

    const cx = (el: Element) => {
      const rect = el.getBoundingClientRect()
      const stage = stageRef.current
      const scale =
        stage && stage.offsetWidth
          ? stage.getBoundingClientRect().width / stage.offsetWidth
          : 1
      return (rect.left + rect.width / 2) / (scale || 1)
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (gen !== playGen.current || !inViewRef.current) return

    const spreadNow = tuneRef.current.spread
    const rotateNow = tuneRef.current.rotate
    const fts = fromChars.map((_, i) => ({
      x: (i - (fromChars.length - 1) / 2) * spreadNow + randPack.jitter[i] * JITTER,
      y: -randPack.y[i] * Y_MAG,
      rotate: randPack.rotate[i] * rotateNow,
    }))
    const ftsTo = toChars.map((_, ti) => ({
      x: (ti - (toChars.length - 1) / 2) * spreadNow + randPack.jitterTo[ti] * JITTER,
      y: -randPack.yTo[ti] * Y_MAG,
      rotate: randPack.rotateTo[ti] * rotateNow,
    }))
    const finalY = ftsTo.reduce((sum, item) => sum + item.y, 0) / ftsTo.length

    const runMorph = (delayMs: number, duration = 0.2) => {
      if (!morphNode.current) return
      const mix1 = interpolate(N_PATH_1_FROM, N_PATH_1_TO, { maxSegmentLength: 1 })
      const mix2 = interpolate(N_PATH_2_FROM, N_PATH_2_TO, { maxSegmentLength: 1 })
      later(delayMs, () => {
        if (gen !== playGen.current || !inViewRef.current) return
        run(
          animate(0, 1, {
            duration,
            ease: "linear",
            onUpdate: (p: number) => {
              const node = morphNode.current
              if (!node) return
              const d1 = mix1(p)
              const d2 = mix2(p)
              node.black1?.setAttribute("d", d1)
              node.black2?.setAttribute("d", d2)
              node.grad1?.setAttribute("d", d1)
              node.grad2?.setAttribute("d", d2)
            },
          })
        )
        const node = morphNode.current
        if (node?.blackLayer) {
          node.blackLayer.style.transition = `opacity ${duration}s linear`
          node.blackLayer.style.opacity = "0"
        }
        if (node?.gradLayer) {
          node.gradLayer.style.transition = `opacity ${duration}s linear`
          node.gradLayer.style.opacity = "1"
        }
        run(animate(svgScale, [1, 1.2], { duration }))
      })
    }

    if (mode === "flat") {
      toChars.forEach((_, ti) => {
        const fi = mapping.toMappings[ti]
        const ghost = ghostRefs.current[ti]
        if (!ghost) return
        if (fi !== null) {
          const el = letterRefs.current[fi]
          if (!el) return
          const destX = cx(ghost) - cx(el)
          run(animate(el, { x: destX, y: finalY, rotate: 0 }, { duration: 0.7, ease: "easeOut" }))
        } else {
          const el = newLetterRefs.current[ti]
          if (!el) return
          const destX = cx(ghost) - cx(el)
          run(
            animate(el, { x: destX, y: finalY, opacity: 1, filter: "blur(0px)" }, { duration: 0.7, ease: "easeOut" })
          )
        }
      })
      fromChars.forEach((_, i) => {
        if (!mapping.flyAway[i]) return
        const el = letterRefs.current[i]
        if (!el) return
        run(animate(el, { opacity: 0, y: -24 }, { duration: 0.7, ease: "easeOut" }))
      })
      run(animate(titleOpacity, 1, { duration: 0.7 }))
      run(animate(titleY, 0, { duration: 0.7 }))
      run(animate(titleBlur, 0, { duration: 0.7 }))
      run(animate(bodyOpacity, 1, { duration: 0.7 }))
      run(animate(bodyY, 0, { duration: 0.7 }))
      run(animate(bodyBlur, 0, { duration: 0.7 }))
      run(animate(twoOpacity, 1, { duration: 0.7, ease: "easeOut" }))
      run(animate(twoPathLength, 1, { duration: 0.7, ease: "easeInOut" }))
      runMorph(0, 0.7)
      later(2200, () => {
        if (inViewRef.current) play()
      })
      return
    }

    toChars.forEach((_, ti) => {
      const fi = mapping.toMappings[ti]
      if (fi === null) return
      const el = letterRefs.current[fi]
      const ghost = ghostRefs.current[ti]
      if (!el || !ghost) return
      const destX = cx(ghost) - cx(el)
      run(
        animate(el, { x: [0, destX + ftsTo[ti].x, destX] }, { duration: 2.3, times: [0, 0.5, 1], ease: EASE_ARC })
      )
      run(animate(el, { y: finalY }, { duration: 2, ease: "linear" }))
      run(
        animate(el, { rotate: [0, ftsTo[ti].rotate, 0] }, { duration: 2.3, times: [0, 0.5, 1], ease: EASE_ARC })
      )
    })

    toChars.forEach((_, ti) => {
      if (mapping.toMappings[ti] !== null) return
      const el = newLetterRefs.current[ti]
      const ghost = ghostRefs.current[ti]
      if (!el || !ghost) return
      const destX = cx(ghost) - cx(el)
      run(animate(el, { opacity: [0, 1] }, { duration: 1, delay: 0.6 }))
      run(animate(el, { filter: ["blur(2px)", "blur(0px)"] }, { duration: 0.35, delay: 0.15 }))
      run(
        animate(el, { x: [destX, destX + ftsTo[ti].x, destX] }, { duration: 2.3, times: [0, 0.5, 1], ease: EASE_ARC })
      )
      run(animate(el, { y: finalY }, { duration: 2, ease: "linear" }))
      run(
        animate(el, { rotate: [0, ftsTo[ti].rotate, 0] }, { duration: 2.3, times: [0, 0.5, 1], ease: EASE_ARC })
      )
    })

    fromChars.forEach((_, i) => {
      if (!mapping.flyAway[i]) return
      const el = letterRefs.current[i]
      if (!el) return
      run(animate(el, { x: fts[i].x, y: fts[i].y, rotate: fts[i].rotate }, MOVE))
      run(animate(el, { opacity: 0, scale: 0.85 }, FADE))
      run(animate(el, { filter: "blur(4px)" }, FADE))
    })

    runMorph(1600)

    if (showSequence) {
      const scaleUp = run(animate(cardScale, 1.05, { duration: 2.3 * 0.6, ease: "easeOut" }))
      scaleUp.finished.then(() => {
        if (gen !== playGen.current || !inViewRef.current) return
        run(animate(cardScale, 1, { duration: 2.3 * 0.4, ease: [0.58, 0.09, 0.32, 0.95] }))
      })

      const fadeIn = { duration: 0.5, delay: 1.7 }
      run(animate(titleOpacity, 1, fadeIn))
      run(animate(titleY, 0, fadeIn))
      run(animate(titleBlur, 0, fadeIn))
      run(animate(bodyOpacity, 1, { ...fadeIn, delay: 1.75 }))
      run(animate(bodyY, 0, { ...fadeIn, delay: 1.8 }))
      run(animate(bodyBlur, 0, { ...fadeIn, delay: 1.8 }))
      later(1700, () => {
        run(animate(twoOpacity, 1, { type: "spring", visualDuration: 1, bounce: 0 }))
        run(animate(twoPathLength, 1, { duration: 1, ease: "easeInOut" }))
      })
      later(1900, () => {
        buttonOpacity.set(1)
      })
    }

        later(3400, () => {
          if (gen !== playGen.current || !inViewRef.current) return
          if (mode === "play") {
            const next = pickWord(fromWord, toWord)
            if (next.word === toWord) play()
            else setPicked(next)
            return
          }
          play()
        })
      })
    })
  }, [
    bodyBlur,
    bodyOpacity,
    bodyY,
    buttonOpacity,
    cardScale,
    fromChars,
    fromWord,
    later,
    mode,
    resetMorph,
    run,
    showSequence,
    stop,
    svgScale,
    titleBlur,
    titleOpacity,
    titleY,
    toChars,
    toWord,
    mapping,
    twoOpacity,
    twoPathLength,
  ])

  useEffect(() => {
    if (!inView) {
      playGen.current += 1
      stop()
      return
    }
    const frame = requestAnimationFrame(() => play())
    return () => {
      cancelAnimationFrame(frame)
      playGen.current += 1
      stop()
    }
  }, [inView, play, stop])

  const nameReady = useRef(false)

  useEffect(() => {
    if (mode !== "play") return
    if (!nameReady.current) {
      nameReady.current = true
      return
    }
    setPicked(name ? pickWord(name) : null)
  }, [mode, name])

  useEffect(() => {
    if (mode !== "play" || !inView) return
    play()
  }, [tune, mode, inView, play])

  useEffect(() => {
    if (mode !== "play" || !paneHost.current) return
    const params = {
      name: FROM_WORD,
      spread: tuneRef.current.spread,
      rotate: tuneRef.current.rotate,
    }
    const pane = new Pane({ container: paneHost.current })
    const nameBinding = pane.addBinding(params, "name", { label: "英文名" })
    nameBinding.element.querySelector("input")?.setAttribute("placeholder", "仅支持西文")
    pane.addBinding(params, "spread", { label: "散开", min: 0, max: 40, step: 1 })
    pane.addBinding(params, "rotate", { label: "旋转", min: 0, max: 30, step: 1 })
    pane.on("change", (ev) => {
      const key = (ev.target as { key?: string }).key
      if (key === "name") {
        const latin = toLatinName(String(ev.value ?? ""))
        if (params.name !== latin) {
          params.name = latin
          nameBinding.refresh()
        }
        setName(latin)
        return
      }
      if (key !== "spread" && key !== "rotate") return
      tuneRef.current = { ...tuneRef.current, [key]: Number(ev.value) }
      if (ev.last) setTune({ ...tuneRef.current })
    })
    return () => pane.dispose()
  }, [mode])

  const showCopy = mode !== "letters"

  return (
    <DemoBox
      ref={rootRef}
      className={
        mode === "play"
          ? "flex flex-col items-center pt-24 pb-4"
          : "flex flex-col items-center py-4"
      }
    >
      <style>{`
        @font-face {
          font-family: "Wxad12Weixin";
          src: url("/abc/fonts/weixin/Weixin-Medium.ttf") format("truetype");
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: "Wxad12WeixinRegular";
          src: url("/abc/fonts/weixin/Weixin.otf") format("opentype");
          font-weight: 400;
          font-display: swap;
        }
      `}</style>
      {mode === "play" ? (
        <div ref={paneHost} className="absolute top-2 right-2 z-10" />
      ) : null}
      <div className="relative h-[434px] w-[300px] overflow-hidden bg-[#fafafa] md:h-[564px] md:w-[390px]">
      <div
        ref={stageRef}
        className="relative h-[564px] w-[390px] origin-top-left scale-[calc(300/390)] overflow-hidden bg-[#fafafa] md:scale-100"
      >
        <div className="absolute top-[52px] left-1/2 h-[436px] w-[294px] -translate-x-1/2">
          <motion.svg
            className="absolute top-[-79px] left-[-108px] rotate-[-14deg]"
            width="757"
            height="516"
            viewBox="0 0 757 516"
            fill="none"
            style={{ opacity: twoOpacity }}
          >
            <defs>
              <clipPath id={`${uid}-two-clip`}>
                <path d={TWO_CLIP_PATH} />
              </clipPath>
              <linearGradient id={`${uid}-two`} x1="494.665" y1="8.07324" x2="570.988" y2="493.65" gradientUnits="userSpaceOnUse">
                {TWO_GRADIENT_STOPS.map((stop, index) => (
                  <stop
                    key={index}
                    stopColor={stop.color}
                    offset={"offset" in stop ? stop.offset : undefined}
                  />
                ))}
              </linearGradient>
            </defs>
            <motion.path
              d={TWO_STROKE_PATH}
              stroke={`url(#${uid}-two)`}
              strokeWidth={160}
              strokeLinecap="round"
              fill="none"
              clipPath={`url(#${uid}-two-clip)`}
              style={{ pathLength: twoPathLength }}
            />
          </motion.svg>
        </div>

        <motion.div
          style={{ scale: cardScale }}
          className="absolute top-[52px] left-1/2 h-[436px] w-[294px] -translate-x-1/2 rounded-[20px] bg-white shadow-[0px_19px_59px_rgba(0,0,0,0.05)]"
        >
          <img
            src="https://wxa.wxs.qq.com/wxad-design/wxad-12/card-logo.svg"
            alt=""
            className="absolute bottom-14 left-1/2 w-[90px] -translate-x-1/2"
          />
          <div className="absolute bottom-[31px] left-0 w-full text-center text-xs leading-[160%] tracking-[0.05em] text-black/30">
            微信广告12周年，感谢有你
          </div>

          <motion.div
            className="absolute top-[150px] left-0 w-full text-center text-[20px] leading-[22px] tracking-[0.05em] text-black"
            style={{
              fontFamily: "Wxad12Weixin, sans-serif",
              opacity: showCopy ? titleOpacity : 0,
              y: titleY,
              filter: titleFilter,
            }}
          >
            「{meaning}」
          </motion.div>
          <motion.div
            className="absolute top-[191px] left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-1 text-[13px] text-black/30"
            style={{
              fontFamily: "Wxad12WeixinRegular, sans-serif",
              opacity: showCopy ? buttonOpacity : 0,
              y: titleY,
            }}
          >
            <svg className="size-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            换一换
          </motion.div>
          <motion.div
            className="absolute top-[226px] left-0 w-full text-center text-[15px] leading-[180%] text-black/60"
            style={{
              fontFamily: "Wxad12WeixinRegular, sans-serif",
              opacity: showCopy ? bodyOpacity : 0,
              y: bodyY,
              filter: bodyFilter,
            }}
          >
            <p>to {fromWord}</p>
            {message.split("\n").map((line) => (
              <p key={line}>{line}</p>
            ))}
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute top-[146px] left-1/2 flex -translate-x-1/2 items-center justify-center gap-px opacity-0"
            style={{ fontFamily: "Wxad12Weixin, sans-serif" }}
          >
            {toChars.map((char, ti) =>
              char === "n" && ti === firstN ? (
                <div key={ti} ref={(el) => { ghostRefs.current[ti] = el }} style={ghostNStyle} />
              ) : (
                <span key={ti} ref={(el) => { ghostRefs.current[ti] = el }} className="inline-block" style={textStyle}>
                  {char}
                </span>
              )
            )}
          </div>

          <div
            className="absolute top-[146px] left-1/2 flex -translate-x-1/2 items-center justify-center gap-px"
            style={{ fontFamily: "Wxad12Weixin, sans-serif" }}
          >
            {toChars.map((char, ti) => {
              if (mapping.toMappings[ti] !== null) return null
              if (char === "n" && ti === firstNNew) {
                return (
                  <motion.div
                    key={`new-${ti}`}
                    ref={(el) => { newLetterRefs.current[ti] = el }}
                    className="pointer-events-none absolute left-1/2 inline-block -translate-x-1/2"
                    style={{ opacity: 0, ...svgWrapStyle }}
                  >
                    <motion.div className="h-full w-full" style={{ scale: svgScale }}>
                      <MorphN morphable width={LETTER.svgW} height={LETTER.lineHeight} nodeRef={morphNode} />
                    </motion.div>
                  </motion.div>
                )
              }
              return (
                <span
                  key={`new-${ti}`}
                  ref={(el) => { newLetterRefs.current[ti] = el }}
                  className="pointer-events-none absolute left-1/2 inline-block -translate-x-1/2 text-black"
                  style={{ opacity: 0, ...textStyle }}
                >
                  {char}
                </span>
              )
            })}

            {fromChars.map((char, index) =>
              char === "n" && index === firstNFrom ? (
                <motion.div
                  key={index}
                  ref={(el) => { letterRefs.current[index] = el }}
                  className="inline-block"
                  style={svgWrapStyle}
                >
                  <motion.div className="h-full w-full" style={{ scale: svgScale }}>
                    <MorphN morphable width={LETTER.svgW} height={LETTER.lineHeight} nodeRef={morphNode} />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.span
                  key={index}
                  ref={(el) => { letterRefs.current[index] = el }}
                  className="inline-block text-black"
                  style={textStyle}
                >
                  {char}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
      </div>
      {note ? (
        <p className="mt-3 mb-1 text-sm text-neutral-400">{note}</p>
      ) : null}
    </DemoBox>
  )
}

export default Wxad12Choreo
