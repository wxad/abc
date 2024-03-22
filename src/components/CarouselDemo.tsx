import { useEffect, useRef, useState } from "react"
import { inertia, animate } from "popmotion"
import { useDrag } from "@use-gesture/react"
import { Pane } from "tweakpane"
import ScrollItem from "./ScrollItem"

const DEG = 6
const xToDegDefault = 40
const velocity = 9
const powerDefault = 0.35
const timeConstantDefault = 180
const bounceDampingDefault = 30
const bounceStiffnessDefault = 80
const cardNumber = 10

const CarouselDemo = ({
  panel,
  bounce = true,
  scale = false,
  stiffness,
  damping,
}: {
  panel: IBaseObject
  bounce?: boolean
  scale?: boolean
  stiffness?: number
  damping?: number
}) => {
  const paneWrapper = useRef<HTMLDivElement>(null)
  const paneRef = useRef<Pane | null>(null)
  const paramsRef = useRef(panel)

  const animateRef = useRef<{ stop: () => void } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startDeg = useRef(0)
  const currentDeg = useRef(0)
  const currentVideo = useRef<HTMLVideoElement | null>(null)
  const animationCompleted = useRef(false)

  const [active, setActive] = useState(false)

  const [currentCards, setCurrentCards] = useState([
    {
      index: cardNumber - 2,
      deg: 348,
    },
    {
      index: cardNumber - 1,
      deg: 354,
    },
    {
      index: 0,
      deg: 0,
    },
    {
      index: 1,
      deg: 6,
    },
    {
      index: 2,
      deg: 12,
    },
  ])

  const currentCardsRef = useRef(currentCards)

  useEffect(() => {
    if (paramsRef.current) {
      paneRef.current = new Pane({
        container: paneWrapper.current,
      })

      paneRef.current.on("change", (ev) => {
        // @ts-ignore
        paramsRef.current[ev.target.label] = ev.value
      })

      if (paramsRef.current.xToDeg) {
        paneRef.current.addBlade({
          view: "slider",
          label: "xToDeg",
          min: 20,
          max: 100,
          value: 80,
        })
      }

      if (paramsRef.current.power) {
        paneRef.current.addBlade({
          view: "slider",
          label: "power",
          min: 0.1,
          max: 1.5,
          value: 1.2,
        })
      }

      if (paramsRef.current.timeConstant) {
        paneRef.current.addBlade({
          view: "slider",
          label: "timeConstant",
          min: 100,
          max: 600,
          value: 500,
        })
      }

      if (paramsRef.current.stiffness) {
        paneRef.current.addBlade({
          view: "slider",
          label: "stiffness",
          min: 50,
          max: 200,
          value: 180,
        })
      }

      if (paramsRef.current.damping) {
        paneRef.current.addBlade({
          view: "slider",
          label: "damping",
          min: 7,
          max: 50,
          value: 7,
        })
      }
    }

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    currentCardsRef.current = currentCards
  }, [JSON.stringify(currentCards)])

  // const handleCardUpdate = ({ deg, index }: { deg: number; index: number }) => {
  //   console.log("[yijie]", deg, index)
  // }

  const handleRotateChange = (deg: number) => {
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translate3d(0, 0, 0) rotate(${deg}deg)`
    }

    const currentCenterDeg = (Math.round((deg * -1) / DEG) * DEG + 360) % 360

    const newCards = [
      {
        deg: (currentCenterDeg - DEG * 2 + 360) % 360,
        index: (currentCenterDeg / DEG - 2 + cardNumber) % cardNumber,
      },
      {
        deg: (currentCenterDeg - DEG + 360) % 360,
        index: (currentCenterDeg / DEG - 1 + cardNumber) % cardNumber,
      },
      {
        deg: currentCenterDeg,
        index: (currentCenterDeg / DEG + cardNumber) % cardNumber,
      },
      {
        deg: (currentCenterDeg + DEG + 360) % 360,
        index: (currentCenterDeg / DEG + 1 + cardNumber) % cardNumber,
      },
      {
        deg: (currentCenterDeg + DEG * 2 + 360) % 360,
        index: (currentCenterDeg / DEG + 2 + cardNumber) % cardNumber,
      },
    ]

    // 从 newCards 找到 currentCardsRef.current 中不存在的 card
    const newCard = newCards.find(
      (card) => !currentCardsRef.current.find((c) => c.index === card.index)
    )

    if (newCard) {
      // 从 currentCardsRef.current 找到 newCards 中不存在的 card 的 index
      const toReplaceIndex = currentCardsRef.current.findIndex(
        (card) => !newCards.find((c) => c.index === card.index)
      )

      const newCurrentCards = currentCardsRef.current.map((card, index) => {
        if (index === toReplaceIndex) {
          return newCard
        }
        return card
      })

      setCurrentCards(newCurrentCards)
    }
  }

  const handleRotateComplete = () => {
    setActive(false)
  }

  const bindDrag = useDrag(
    ({ movement: [x], down, velocity: [v], direction: [dx], first }) => {
      if (first) {
        animationCompleted.current = false
        startDeg.current = currentDeg.current

        if (currentVideo.current) {
          currentVideo.current.pause()
          currentVideo.current = null
        }

        if (scale) {
          setActive(true)
        }
      }

      currentDeg.current =
        startDeg.current +
        x / (Number(paramsRef.current?.xToDeg) || xToDegDefault)
      const vx = v * dx

      if (down) {
        if (animateRef.current) {
          animateRef.current.stop()
          animateRef.current = null
        }

        handleRotateChange(currentDeg.current)
      } else {
        if (Math.abs(vx) > 0.25) {
          const power = Number(paramsRef.current?.power) || powerDefault
          const max =
            Math.round((currentDeg.current + vx * velocity * power) / DEG) * DEG

          animateRef.current = inertia({
            from: currentDeg.current,
            velocity: vx * velocity,
            restDelta: 0.01,
            power,
            timeConstant:
              Number(paramsRef.current?.timeConstant) || timeConstantDefault,
            bounceDamping:
              Number(paramsRef.current?.damping) || bounceDampingDefault,
            bounceStiffness:
              Number(paramsRef.current?.stiffness) || bounceStiffnessDefault,
            max: vx > 0 ? max : undefined,
            min: vx > 0 ? undefined : max,
            modifyTarget: (target) => {
              const finalTarget =
                Math.round((target * 1) / DEG) * DEG +
                (!bounce ? 0 : vx > 0 ? 1 : -1)
              return finalTarget
            },
            onUpdate: (v) => {
              currentDeg.current = v
              handleRotateChange(v)
              if (Math.abs(v - max) < 1 && !animationCompleted.current) {
                animationCompleted.current = true
                handleRotateComplete()
              }
            },
          })
        } else {
          // 如果没有 veolcity，重置到最近的 DEG 的倍数
          const to = Math.round(currentDeg.current / DEG) * DEG

          animate({
            from: currentDeg.current,
            to,
            velocity: vx,
            stiffness:
              (Number(paramsRef.current?.stiffness) || bounceStiffnessDefault) +
              80,
            damping: Number(paramsRef.current?.damping) || bounceDampingDefault,
            restDelta: 0.01,
            onUpdate: (v) => {
              if (!isNaN(v)) {
                currentDeg.current = v
                handleRotateChange(v)
              }
            },
            onComplete: () => {
              animationCompleted.current = true
              handleRotateComplete()
            },
          })
        }
      }
    }
  )

  return (
    <div className="flex items-end h-[360px]">
      <div ref={paneWrapper} className="absolute top-[4px] right-[4px]" />
      <div
        className="relative w-full h-[290px] touch-none overflow-hidden"
        // @ts-ignore
        {...bindDrag()}
      >
        <div className="scroll-outer">
          <div className="scroll-wrapper">
            <div className="scroll" ref={scrollRef}>
              {currentCards.map(({ deg, index }) => (
                <ScrollItem
                  key={index}
                  deg={deg}
                  index={index}
                  active={active}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselDemo
