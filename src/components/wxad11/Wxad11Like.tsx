import DemoBox from "@/components/DemoBox"
import confetti from "canvas-confetti"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "react-intersection-observer-hook"

const oneLineHeight = 29

const Demo = () => {
  const [like, setLike] = useState(11)

  const liked = like > 11

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0.5,
  })
  const inView = entry?.isIntersecting

  const handleConfetti = () => {
    setLike((n) => n + 1)

    const commmonProps = {
      ticks: 50,
      particleCount: 30,
      startVelocity: Math.random() * 15 + 25,
      spread: Math.random() * 30 + 10,
      gravity: Math.random() + 0.2,
      colors: [
        "#00F58A",
        "#fff16f",
        "#00F58A",
        "#ff9a78",
        "#8486ff",
        "#07c160",
      ],
    }

    let leftX = 0.7
    let rightX = 0.3
    let leftY = 0.4
    let rightY = 0.4

    if (leftRef.current) {
      const rect = leftRef.current.getBoundingClientRect()
      leftX = rect.x / window.innerWidth
      leftY = rect.y / window.innerHeight
    }

    if (rightRef.current) {
      const rect = rightRef.current.getBoundingClientRect()
      rightX = (rect.x + rect.width / 2) / window.innerWidth
      rightY = (rect.y + rect.height / 2) / window.innerHeight
    }

    setTimeout(() => {
      confetti({
        origin: { x: rightX, y: rightY },
        angle: 78,
        drift: -Math.random(),
        ...commmonProps,
      })
      confetti({
        origin: { x: leftX, y: leftY },
        angle: 108,
        drift: Math.random(),
        ...commmonProps,
      })
    }, 100)
    ;[leftRef.current, rightRef.current, textRef.current].forEach(
      (ref, index) => {
        if (ref) {
          ref.style.animation = "none"
          setTimeout(() => {
            ref.style.animation =
              index === 2
                ? "wxad11Text 0.2s ease both"
                : "wxad11Stick 0.2s ease both"
          }, 50)
        }
      }
    )
  }

  useEffect(() => {
    let interval = 0
    if (inView) {
      interval = window.setInterval(() => {
        handleConfetti()
      }, 2000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [inView])

  return (
    <DemoBox className="flex items-center justify-center py-10" ref={ref}>
      <div
        className={cn(
          "group flex flex-col items-center justify-center w-[340px] h-[170px] scale-75 cursor-pointer select-none"
        )}
        onClick={() => {
          handleConfetti()
        }}
      >
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full"
          )}
        >
          <div className="relative">
            <div
              className={cn(
                "absolute rotate-[-18deg] top-[11px] -left-[27px] w-[10px] h-[70px]"
              )}
            >
              <div
                ref={leftRef}
                className="absolute top-0 left-0 w-full h-full bg-[#00F58A] origin-bottom"
              />
            </div>
            <div
              className={cn(
                "absolute rotate-[12deg] top-[8px] -right-[27px] w-[10px] h-[75px]"
              )}
            >
              <div
                ref={rightRef}
                className="absolute top-0 left-0 w-full h-full bg-[#00F58A] origin-bottom"
              />
            </div>
            <div
              ref={textRef}
              className="relative break-words mb-5 pl-1 max-w-[270px] text-[24px] text-center font-semibold text-black bg-transparent flex-none"
              style={{
                lineHeight: `${oneLineHeight}px`,
                maxHeight: `${oneLineHeight * 3}px`,
              }}
            >
              自强不息，厚德载物。祝微信广告十一周年生日快乐，越来越好。
            </div>
            <div className="flex items-center justify-center gap-[9px] h-[25px]">
              <div className="text-[20px] font-medium text-[#808080]">
                Aragakey.
              </div>
            </div>
            <div
              className={cn(
                "relative flex items-center justify-center gap-0.5 mt-[14px] h-6",
                liked ? "text-[#00F58A]" : "text-[#808080]"
              )}
            >
              <div className="relative size-5 -top-px">
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
                    liked ? "opacity-0" : "opacity-100"
                  )}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.66964 6.19121L9.99251 6.50655L10.2608 6.76148L10.6474 6.3925L10.852 6.19121C12.4846 4.55866 15.1315 4.55866 16.764 6.19121C18.3814 7.80857 18.3964 10.4215 16.8091 12.0574L10.852 18.0151C10.5507 18.3166 10.0764 18.3398 9.74841 18.0848L9.66964 18.0152L3.71218 12.0577C2.12525 10.4215 2.1403 7.80857 3.75766 6.19121C5.39021 4.55866 8.03709 4.55866 9.66964 6.19121ZM8.9602 6.90065C7.71946 5.65991 5.70783 5.65991 4.4671 6.90065C3.28163 8.08611 3.22754 9.97837 4.30216 11.218L4.42162 11.3483L10.2594 17.1886L16.0891 11.3587C17.2549 10.1572 17.2819 8.26454 16.1773 7.0303L16.0546 6.90065C14.8138 5.65991 12.8022 5.65991 11.5615 6.90065L11.2253 7.22902L10.2608 8.13995L9.17387 7.11086L8.9602 6.90065Z"
                    fill="#808080"
                  />
                  <path
                    d="M10.7344 6.07227C12.4323 4.37508 15.1842 4.37568 16.8818 6.07324C18.5639 7.75531 18.5795 10.4725 16.9287 12.1738L16.9277 12.1758L10.9707 18.1338C10.609 18.4956 10.0392 18.5229 9.64551 18.2168L9.6377 18.21L9.55859 18.1406L9.55078 18.1338V18.1328L3.5918 12.1738C1.94171 10.4721 1.95771 7.75521 3.63965 6.07324C5.33693 4.37596 8.08815 4.37515 9.78613 6.07129L10.1094 6.38672H10.1084L10.2598 6.53027L10.5322 6.27148L10.7344 6.07227ZM15.8242 6.91211C14.6427 5.84455 12.8184 5.87998 11.6797 7.01855L11.6787 7.02051L11.3418 7.34863L11.3398 7.35059L10.376 8.26172L10.2607 8.37012L10.1455 8.26172L9.05859 7.23242L9.05664 7.23047L8.84277 7.01953L8.8418 7.01855C7.66634 5.84337 5.76031 5.8432 4.58496 7.01855C3.46163 8.14191 3.4115 9.93498 4.42871 11.1084L4.54004 11.2305L10.2598 16.9512L15.9707 11.2402C17.0721 10.1032 17.0983 8.31414 16.0557 7.14551L15.9365 7.01855L15.8242 6.91211Z"
                    stroke="#808080"
                    strokeWidth="0.334432"
                  />
                </svg>
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
                    liked ? "opacity-100" : "opacity-0"
                  )}
                >
                  <path
                    d="M10.7344 6.07227C12.4323 4.37508 15.1842 4.37568 16.8818 6.07324C18.5639 7.75531 18.5795 10.4725 16.9287 12.1738L16.9277 12.1758L10.9707 18.1338C10.609 18.4956 10.0392 18.5229 9.64551 18.2168L9.6377 18.21L9.55859 18.1406L9.55078 18.1338V18.1328L3.5918 12.1738C1.94171 10.4721 1.95771 7.75521 3.63965 6.07324C5.33693 4.37596 8.08815 4.37515 9.78613 6.07129L10.1094 6.38672H10.1084L10.2598 6.53027L10.5322 6.27148L10.7344 6.07227Z"
                    fill="#00F58A"
                    stroke="#00F58A"
                    strokeWidth="0.334432"
                  />
                </svg>
              </div>
              <div className="w-[2ch]">{like}</div>
            </div>
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
