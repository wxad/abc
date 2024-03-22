import { useRef } from "react"
import { animate } from "popmotion"
import DemoBox from "./DemoBox"

const SwipeMock = () => {
  const cardsNumber = 20
  const wrapperRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const startTime = useRef(0)
  const currentX = useRef(0)
  const currentTime = useRef(0)
  const velocity = useRef(0)

  // 150 each
  const currentTranslateX = useRef(-1450)

  const doUpdate = (x: number) => {
    currentTranslateX.current = x
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate3d(${x}px, 0, 0)`
      wrapperRef.current.style.transition = ".3s ease all"
    }
  }

  const doSwipe = (number: -1 | 1) => {
    console.log("[yijie]", number)

    const to = currentTranslateX.current + number * 150
    doUpdate(to)
  }

  const handleTouchMove = (e: TouchEvent) => {
    const { timeStamp: time } = e
    const { clientX: x } = e.touches[0]

    // const diff = Math.min(150, Math.max(-150, x - startX.current))
    // const to = currentTranslateX.current + diff
    // console.log("[yijie]", diff)
    // doUpdate(to)

    const moveX = x - currentX.current
    const moveTime = time - currentTime.current

    velocity.current = moveX / moveTime

    // console.log("[yijie]", moveTime, moveX / moveTime)

    currentX.current = x
    currentTime.current = time
  }

  const handleTouchEnd = () => {
    const diffX = currentX.current - startX.current

    console.log("[yijie]", velocity.current)

    // 首先判断 velocity 是否足够大，如果足够大一定触发 swipe
    if (Math.abs(velocity.current) > 0.5) {
      doSwipe(velocity.current < 0 ? -1 : 1)
    } else {
      if (diffX < -50 && velocity.current < 0) {
        console.log("[yijie]", velocity.current)
        doSwipe(-1)
      } else if (diffX > 50 && velocity.current > 0) {
        doSwipe(1)
      }
    }

    window.removeEventListener("touchmove", handleTouchMove)
    window.removeEventListener("touchend", handleTouchEnd)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    startX.current = e.touches[0].clientX
    startTime.current = e.timeStamp

    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
  }

  return (
    <div>
      <DemoBox>
        <div
          className="flex h-[200px] touch-none"
          onTouchStart={handleTouchStart}
        >
          <div className="relative m-auto w-[240px] font-semibold text-sm text-neutral-400 overflow-hidden">
            <div className="absolute z-10 top-0 left-0 w-[12px] h-full bg-gradient-to-r from-neutral-100" />
            <div className="absolute z-10 top-0 right-0 w-[12px] h-full bg-gradient-to-l from-neutral-100" />
            <div
              ref={wrapperRef}
              className="flex gap-[10px]"
              style={{
                width: `${cardsNumber * 140 + 10 * (cardsNumber - 1)}px`,
                transform: `translate3d(${currentTranslateX.current}px, 0, 0)`,
              }}
            >
              {Array.from({ length: cardsNumber }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-[140px] h-[140px] bg-white rounded-lg shadow-sm"
                >
                  {index}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DemoBox>
    </div>
  )
}

export default SwipeMock
