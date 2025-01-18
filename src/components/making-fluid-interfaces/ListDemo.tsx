import DemoBox from "@/components/DemoBox"
import { SpringValue, useSprings, a } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import {
  AnimationPlaybackControls,
  useMotionValue,
  animate,
  useMotionValueEvent,
  MotionValue,
} from "motion/react"
import { memo, useEffect, useRef } from "react"
import { Pane } from "tweakpane"

const applyRubberBand = (x: number, edge: number, dimension: number) => {
  const c = 0.55 // 你可以调整这个值来改变橡皮筋的紧度
  return (
    (1.0 - 1.0 / ((Math.abs(x - edge) * c) / dimension + 1.0)) *
      dimension *
      Math.sign(x - edge) +
    edge
  )
}

const tags = [
  {
    name: "唤醒感官",
  },
  {
    name: "眼前一亮",
  },
  {
    name: "有互动",
  },
  {
    name: "贴近生活",
  },
  {
    name: "诚实",
  },
  {
    name: "匹配场景",
  },
  {
    name: "推得准",
  },
  {
    name: "善良",
  },
  {
    name: "超越时间",
  },
  {
    name: "新",
  },
  {
    name: "引发思考",
  },
  {
    name: "有观点",
  },
  {
    name: "够深刻",
  },
  {
    name: "有洞察",
  },
  {
    name: "反映现实",
  },
  {
    name: "有激情",
  },
  {
    name: "破格",
  },
  {
    name: "满足幻想",
  },
  {
    name: "有故事",
  },
  {
    name: "直白",
  },
  {
    name: "学到东西",
  },
  {
    name: "主题明确",
  },
  {
    name: "有格局",
  },
  {
    name: "说人话",
  },
  {
    name: "破圈",
  },
  {
    name: "结合热点",
  },
  {
    name: "优雅",
  },
  {
    name: "简约",
  },
  {
    name: "品味独特",
  },
  {
    name: "有对的人",
  },
  {
    name: "有共鸣",
  },
  {
    name: "有情怀",
  },
  {
    name: "打动我",
  },
  {
    name: "巧妙",
  },
  {
    name: "有趣",
  },
  {
    name: "有温度",
  },
  {
    name: "愉悦",
  },
  {
    name: "Wow",
  },
  {
    name: "引发想象",
  },
  {
    name: "记得住",
  },
  {
    name: "唤醒感官",
  },
]

const ITEM_COUNT = 40
const ITEM_HEIGHT = 50
const ITEM_MARGIN = 16
const scrollMax = (ITEM_COUNT - 7) * (ITEM_HEIGHT + ITEM_MARGIN)

const TagItem = memo(
  ({
    index,
    y,
  }: {
    index: number
    y: SpringValue<number>
    centerIndex: MotionValue<number>
  }) => {
    return (
      <a.div
        className="absolute top-8 left-0 flex items-center w-[150px] rounded-[8px] will-change-transform bg-white"
        style={{
          y,
          height: ITEM_HEIGHT,
        }}
      >
        <div className="relative flex items-center w-full pr-[16px] pl-[16px]">
          <div className="flex-1 text-[16px] leading-[50px] text-black font-semibold">
            {tags[index].name}
          </div>
          <div className="text-[12px] scale-[0.83] origin-right gilroy-semibold text-black">
            73
            <span className="ml-[2px]">k</span>
          </div>
        </div>
      </a.div>
    )
  }
)

const Demo = (props: {}) => {
  const animating = useRef(false)
  const currentTranslateY = useMotionValue(0)
  const startTranslateY = useRef(0)
  const animationRef = useRef<AnimationPlaybackControls | null>(null)
  const lastTranslateY = useRef(0)
  const centerIndex = useMotionValue(0)

  const paneWrapper = useRef<HTMLDivElement>(null)
  const paneRef = useRef<Pane | null>(null)
  const paramsRef = useRef({
    timeConstant: 150,
    stiffnessGap: 15,
    dampingGap: 5,
  })

  const bind = useDrag(
    ({
      movement: [, my],
      down,
      velocity: [, vy],
      first,
      direction: [, dy],
      cancel,
    }) => {
      if (animating.current) {
        cancel()
        return
      }
      if (first) {
        startTranslateY.current = currentTranslateY.get()
        animationRef.current?.stop()
      }

      if (down) {
        let finalY = startTranslateY.current + my
        const thirdPage = document.querySelector(
          ".third-page"
        ) as HTMLDivElement
        if (finalY > 0) {
          finalY = applyRubberBand(finalY, 0, 200)
          // setStatus("到达上边界，橡皮筋效果")
          currentTranslateY.set(finalY)
        } else {
          if (finalY < -scrollMax) {
            finalY = applyRubberBand(finalY, -scrollMax, 200)
            // setStatus("到达下边界，橡皮筋效果")
          } else {
            // setStatus("跟手滚动中")
          }
          currentTranslateY.set(finalY)
        }
      } else {
        if (
          currentTranslateY.get() > 0 ||
          currentTranslateY.get() < -scrollMax
        ) {
          // setStatus("从边界外拉回")
          animationRef.current?.stop()
          const to = currentTranslateY.get() > 0 ? 0 : -scrollMax
          animationRef.current = animate(currentTranslateY.get(), to, {
            type: "spring",
            stiffness: 200,
            damping: 40,
            restDelta: 0.01,
            onUpdate: (latest) => {
              currentTranslateY.set(latest)
            },
          })
        } else if (vy !== 0) {
          let finalTarget = vy * 280 * 0.35 + currentTranslateY.get()
          animationRef.current?.stop()
          animationRef.current = animate(currentTranslateY.get(), finalTarget, {
            bounceDamping: 40,
            bounceStiffness: 200,
            max: 0,
            min: -scrollMax,
            restDelta: 0.01,
            restSpeed: 30,
            timeConstant: paramsRef.current.timeConstant,
            type: "inertia",
            velocity: vy * 280 * dy,
            modifyTarget: (target) => {
              // modify 到 (ITEM_HEIGHT + ITEM_MARGIN) 的整数倍
              finalTarget =
                Math.round(target / (ITEM_HEIGHT + ITEM_MARGIN)) *
                (ITEM_HEIGHT + ITEM_MARGIN)

              if (finalTarget > 132) {
                finalTarget = 132
              } else if (finalTarget < -scrollMax - 132) {
                finalTarget = -scrollMax - 132
              }

              return finalTarget
            },
            onUpdate: (latest) => {
              // setStatus("惯性滚动中")
              currentTranslateY.set(latest)
            },
          })
        } else {
          const to =
            Math.round(currentTranslateY.get() / (ITEM_HEIGHT + ITEM_MARGIN)) *
            (ITEM_HEIGHT + ITEM_MARGIN)
          animationRef.current?.stop()
          animationRef.current = animate(currentTranslateY.get(), to, {
            type: "spring",
            stiffness: 200,
            damping: 40,
            restDelta: 0.01,
            onUpdate: (latest) => {
              currentTranslateY.set(latest)
            },
          })
        }
      }
    },
    {
      filterTaps: true,
    }
  )

  const [springs, api] = useSprings(ITEM_COUNT, (i) => ({
    y: ITEM_HEIGHT * i + ITEM_MARGIN * i,
  }))

  useMotionValueEvent(currentTranslateY, "change", (latest) => {
    const dy = latest - lastTranslateY.current < 0 ? -1 : 1
    lastTranslateY.current = latest

    const currentCenterIndex = Math.min(
      Math.max(0, Math.round(-latest / (ITEM_HEIGHT + ITEM_MARGIN)) + 1),
      ITEM_COUNT - 1
    )

    let currentEdgeIndex = currentCenterIndex

    if (dy === -1) {
      // 向上滚动
      currentEdgeIndex = currentCenterIndex - 5
    } else {
      // 向下滚动
      currentEdgeIndex = currentCenterIndex + 5
    }

    if (centerIndex.get() !== currentCenterIndex) {
      centerIndex.set(currentCenterIndex)
    }

    api.start((i) => {
      let fast = true
      if (dy < 0) {
        fast = i <= currentEdgeIndex
      } else {
        fast = i >= currentEdgeIndex
      }

      const deltaIndex = Math.abs(i - currentEdgeIndex)

      return {
        y: latest + (ITEM_HEIGHT + ITEM_MARGIN) * i,
        config: fast
          ? { tension: 1200, friction: 26, clamp: true }
          : {
              tension: 1200 - deltaIndex * paramsRef.current.stiffnessGap,
              friction: 26 + deltaIndex * paramsRef.current.dampingGap,
              clamp: true,
            },
      }
    })
  })

  useEffect(() => {
    if (paramsRef.current) {
      paneRef.current = new Pane({
        container: paneWrapper.current,
      })

      paneRef.current.on("change", (ev) => {
        // @ts-ignore
        paramsRef.current[ev.target.label] = ev.value
      })

      paneRef.current.addBlade({
        view: "slider",
        label: "timeConstant",
        min: 50,
        max: 600,
        value: 150,
      })

      paneRef.current.addBlade({
        view: "slider",
        label: "stiffnessGap",
        min: 5,
        max: 100,
        value: 40,
      })

      paneRef.current.addBlade({
        view: "slider",
        label: "dampingGap",
        min: 0,
        max: 15,
        value: 5,
      })
    }

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  return (
    <DemoBox className="flex justify-center">
      <div ref={paneWrapper} className="absolute top-1 right-1" />
      <div
        className="relative mt-24 w-[150px] h-[500px] overflow-hidden touch-none select-none"
        {...bind()}
      >
        {springs.map(({ y }, i) => (
          <TagItem key={i} index={i} y={y} centerIndex={centerIndex} />
        ))}
      </div>
    </DemoBox>
  )
}

export default Demo
