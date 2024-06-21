import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { useRef, useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"
import { animate, easeOut, linear } from "popmotion"
import DemoBox from "../DemoBox"

const oranges = {
  "1": "#FCBE7C",
  "1-new": "#FFD770",
  "2": "#FBA851",
  "3": "#FA9D3B",
  "4": "#FA9D3B",
  "5": "#FED246",
  "6": "#FBA839",
  "7": "#FA9D3B",
  "8": "#F28130",
  "8-new": "#FF9431",
  "9": "#FBA851",
}

const greens = {
  "1": "#17E879",
  "1-new": "#1CF381",
  "2": "#08CC64",
  "3": "#08CC64",
  "4": "#09D669",
  "5": "#77FF6E",
  "6": "#31DF67",
  "7": "#08CC64",
  "8": "#00B85F",
  "8-new": "#00C566",
  "9": "#08CC64",
}

const getFullGradients = (gradients: typeof oranges) => {
  return [
    `conic-gradient(from 180deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 41deg, ${gradients["2"]} 67deg, ${gradients["3"]} 90deg, ${gradients["4"]} 153deg, ${gradients["5"]} 221.3deg, ${gradients["6"]} 221.53deg, ${gradients["7"]} 270deg, ${gradients["8"]} 333deg, ${gradients["9"]} 360deg)`,
    `conic-gradient(from 180deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 32deg, ${gradients["2"]} 58deg, ${gradients["3"]} 79deg, ${gradients["4"]} 126deg, ${gradients["5"]} 187deg, ${gradients["6"]} 223.2deg, ${gradients["7"]} 259deg, ${gradients["8"]} 324deg, ${gradients["9"]} 360deg)`,
    `conic-gradient(from 173deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 32deg, ${gradients["2"]} 55deg, ${gradients["3"]} 76deg, ${gradients["4"]} 113deg, ${gradients["5"]} 188deg, ${gradients["6"]} 228deg, ${gradients["7"]} 254deg, ${gradients["8"]} 313deg, ${gradients["9"]} 360deg)`,
    `conic-gradient(from 130deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 61deg, ${gradients["2"]} 76deg, ${gradients["3"]} 111deg, ${gradients["4"]} 151deg, ${gradients["5"]} 223deg, ${gradients["6"]} 248deg, ${gradients["7"]} 270deg, ${gradients["8"]} 349deg, ${gradients["9"]} 360deg)`,
    `conic-gradient(from 119deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 43deg, ${gradients["2"]} 61deg, ${gradients["3"]} 97deg, ${gradients["4"]} 115deg, ${gradients["5"]} 212deg, ${gradients["6"]} 244deg, ${gradients["7"]} 259deg, ${gradients["8"]} 342deg, ${gradients["9"]} 360deg)`,
    `conic-gradient(from 112deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 29deg, ${gradients["2"]} 39deg, ${gradients["3"]} 68deg, ${gradients["4"]} 90deg, ${gradients["5"]} 104deg, ${gradients["6"]} 234deg, ${gradients["7"]} 248deg, ${gradients["8"]} 281deg, ${gradients["9"]} 360deg)`,
    // 08 ${gradients["8"]} -> ${gradients["8-new"]}
    `conic-gradient(from 65deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 36deg, ${gradients["2"]} 65deg, ${gradients["3"]} 86deg, ${gradients["4"]} 108deg, ${gradients["5"]} 133deg, ${gradients["6"]} 216deg, ${gradients["7"]} 259deg, ${gradients["8-new"]} 299deg, ${gradients["9"]} 360deg)`,
    // 01 ${gradients["1"]} -> ${gradients["1-new"]}
    `conic-gradient(from 0deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1-new"]} 32deg, ${gradients["2"]} 79deg, ${gradients["3"]} 122deg, ${gradients["4"]} 130deg, ${gradients["5"]} 180deg, ${gradients["6"]} 230deg, ${gradients["7"]} 270deg, ${gradients["8-new"]} 313deg, ${gradients["9"]} 360deg)`,
    `conic-gradient(from -58deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1-new"]} 58deg, ${gradients["2"]} 104deg, ${gradients["3"]} 133deg, ${gradients["4"]} 176deg, ${gradients["5"]} 238deg, ${gradients["6"]} 284deg, ${gradients["7"]} 299deg, ${gradients["8-new"]} 328deg, ${gradients["9"]} 360deg)`,
    // 01 ${gradients["1-new"]} -> ${gradients["1"]}
    `conic-gradient(from -173deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 83deg, ${gradients["2"]} 155deg, ${gradients["3"]} 169deg, ${gradients["4"]} 187deg, ${gradients["5"]} 292deg, ${gradients["6"]} 310deg, ${gradients["7"]} 328deg, ${gradients["8-new"]} 342deg, ${gradients["9"]} 360deg)`,
    // 08 ${gradients["8-new"]} -> ${gradients["8"]}
    `conic-gradient(from -180deg at 49.99% 50%, ${gradients["9"]} 0deg, ${gradients["1"]} 41deg, ${gradients["2"]} 67deg, ${gradients["3"]} 90deg, ${gradients["4"]} 153deg, ${gradients["5"]} 221.3deg, ${gradients["6"]} 221.53deg, ${gradients["7"]} 270deg, ${gradients["8"]} 333deg, ${gradients["9"]} 360deg)`,
  ]
}

const orangesGradients = getFullGradients(oranges)
const greensGradients = getFullGradients(greens)

const Demo = () => {
  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting
  const [scene, setScene] = useState<"moments" | "channels">("channels")
  const backgroundProgress = useMotionValue(0)
  const orangeBackgroundGradient = useTransform(
    backgroundProgress,
    [0, 0.06, 0.09, 0.13, 0.2, 0.35, 0.45, 0.55, 0.65, 0.84, 1],
    orangesGradients,
    {
      clamp: false,
    }
  )
  const greenBackgroundGradient = useTransform(
    backgroundProgress,
    [0, 0.06, 0.09, 0.13, 0.2, 0.35, 0.45, 0.55, 0.65, 0.84, 1],
    greensGradients,
    {
      clamp: false,
    }
  )
  const rotate = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    let newRotate = rotate.get() + (delta / 16000) * 360
    if (newRotate > 360) {
      newRotate = newRotate - 360
    }
    rotate.set(newRotate)
    backgroundProgress.set(newRotate / 360)
  })

  const gradientRef = useRef<HTMLDivElement>(null)
  const gradientOrangeRef = useRef<HTMLDivElement>(null)

  const handleSwitch = () => {
    animate({
      from: 0,
      to: -50,
      duration: 1000,
      ease: easeOut,
      onUpdate: (v) => {
        if (gradientRef.current) {
          gradientRef.current.style.transform = `translate3d(-50%, -50%, 0) rotate(${
            scene === "channels" ? 50 + v : v
          }deg) scaleX(6) scaleY(1.5)`
        }
        if (gradientOrangeRef.current) {
          gradientOrangeRef.current.style.transform = `translate3d(-50%, -50%, 0) rotate(${
            scene === "moments" ? 50 + v : v
          }deg) scaleX(6) scaleY(1.5)`
        }
      },
    })
    setScene((p) => (p === "moments" ? "channels" : "moments"))
  }

  return (
    <div>
      <DemoBox
        ref={ref}
        className="flex flex-col justify-center items-center h-96 overflow-hidden"
      >
        <div className="relative w-80 h-80 overflow-hidden rounded-lg">
          <div className="absolute-full">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-80 scale-x-[6] scale-y-150"
              style={{
                background: inView ? orangeBackgroundGradient : undefined,
                transition:
                  scene === "channels"
                    ? "1.5s ease opacity"
                    : "0s ease opacity 1.5s",
                opacity: scene === "channels" ? 1 : 0,
                zIndex: scene === "channels" ? 1 : 0,
              }}
              ref={gradientOrangeRef}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-80 scale-x-[6] scale-y-150"
              style={{
                background: inView ? greenBackgroundGradient : undefined,
                transition:
                  scene === "moments"
                    ? "1.5s ease opacity"
                    : "0s ease opacity 1.5s",
                opacity: scene === "moments" ? 1 : 0,
                zIndex: scene === "moments" ? 1 : 0,
              }}
              ref={gradientRef}
            />
            {/* <div
              className={`absolute top-1/2 left-1/2 translate-x-[-49.5%] translate-y-[-56.5%] w-[100px] h-[100px] transition-opacity duration-700 ${
                scene === "channels" ? "opacity-0 z-[1]" : "opacity-100 z-10"
              }`}
              style={{
                backgroundImage:
                  "url(https://wxa.wxs.qq.com/wxad-design/yijie/bm-green-heart-tester.png)",
                backgroundSize: "100%",
              }}
            />
            <div
              className={`absolute top-1/2 left-1/2 translate-x-[-49.5%] translate-y-[-56.5%] w-[100px] h-[100px] transition-opacity duration-700 ${
                scene === "moments" ? "opacity-0 z-[1]" : "opacity-100 z-10"
              }`}
              style={{
                backgroundImage:
                  "url(https://wxa.wxs.qq.com/wxad-design/yijie/bm-orange-heart-tester.png)",
                backgroundSize: "100%",
              }}
            /> */}
          </div>
          <div
            className="absolute z-10 top-2 left-1/2 -translate-x-1/2 flex items-center h-10 cursor-pointer"
            onClick={handleSwitch}
          >
            <div
              className="pt-2 pr-1 pl-2 h-full transition-all duration-700"
              style={{
                opacity: scene === "channels" ? 0.5 : 1,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M14.5 2.31504V8.84315L8.34562 2.68877C9.47759 2.24416 10.7103 2 12 2C12.8632 2 13.701 2.10938 14.5 2.31504Z" />
                <path d="M16 2.83209V11.5355L20.6155 6.92008C19.55 5.11693 17.9345 3.67732 16 2.83209Z" />
                <path d="M21.3112 8.34562L15.1569 14.5H21.685C21.8906 13.701 22 12.8632 22 12C22 10.7103 21.7558 9.47759 21.3112 8.34562Z" />
                <path d="M21.1679 16H12.4645L17.0799 20.6155C18.8831 19.55 20.3227 17.9345 21.1679 16Z" />
                <path d="M15.6544 21.3112L9.5 15.1569V21.685C10.299 21.8906 11.1368 22 12 22C13.2897 22 14.5224 21.7558 15.6544 21.3112Z" />
                <path d="M8 21.1679V12.4645L3.38455 17.0799C4.45003 18.8831 6.06546 20.3227 8 21.1679Z" />
                <path d="M2.68877 15.6544L8.84315 9.5H2.31504C2.10938 10.299 2 11.1368 2 12C2 13.2897 2.24416 14.5224 2.68877 15.6544Z" />
                <path d="M2.83209 8C3.67732 6.06546 5.11693 4.45003 6.92008 3.38455L11.5355 8H2.83209Z" />
              </svg>
            </div>
            <div
              className="pt-2 pr-2 pl-1 h-full transition-all duration-700"
              style={{
                opacity: scene === "channels" ? 1 : 0.5,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M21.6491 4.9411C22.3641 6.66967 21.8268 10.0509 21.4428 11.9126C20.8631 14.724 19.9295 17.524 19.0643 19.0461C18.4889 20.0584 17.9137 20.5747 17.2547 20.6709C17.1487 20.6864 17.0408 20.6942 16.9341 20.6942C14.9855 20.6942 13.1307 18.1503 11.9998 16.2119C10.8689 18.1505 9.01391 20.6942 7.06592 20.6942C6.95919 20.6942 6.85146 20.6864 6.74573 20.6709C6.08626 20.5747 5.51106 20.0584 4.93567 19.0461C4.07049 17.5238 3.13694 14.724 2.55717 11.9126C2.17318 10.0509 1.63595 6.66967 2.35087 4.9411C2.86922 3.68795 3.73559 3.4415 4.20624 3.40592C5.95389 3.27613 8.03246 5.42487 11.1446 10.5915C11.4594 11.114 11.7498 11.5994 12 12.0191C12.2516 11.5974 12.5424 11.1112 12.8554 10.5915C15.8287 5.65582 17.8505 3.47248 19.5574 3.40209C20.5342 3.38981 21.2898 4.072 21.6491 4.9411ZM4.21364 5.84156C3.84944 6.9618 4.1306 9.84839 4.91778 12.9771C5.68219 16.0157 6.5098 17.7304 6.9417 18.3815C7.05002 18.545 7.26249 18.6013 7.4356 18.5091C7.81642 18.3057 8.47906 17.7727 9.43686 16.3798C10.0369 15.5069 10.5338 14.6111 10.8198 14.0665C10.5133 13.549 9.9886 12.6659 9.37942 11.6546C6.67338 7.16218 5.24235 5.92791 4.66636 5.58904C4.43208 5.45106 4.29248 5.65658 4.21364 5.84156ZM19.7435 5.72399C19.6747 5.55883 19.4926 5.49542 19.3384 5.58586C18.7674 5.92036 17.3352 7.14827 14.6206 11.6546C14.0094 12.6693 13.4831 13.5547 13.1772 14.0715C14.3348 16.3271 15.6664 17.9697 16.4763 18.4733C16.6833 18.6019 16.9553 18.5452 17.0869 18.3403C17.5228 17.6624 18.3331 15.9557 19.0822 12.9771C19.8975 9.73665 20.17 6.75593 19.7453 5.72856L19.7435 5.72399Z" />
              </svg>
            </div>
            <i
              className={`absolute left-3 bottom-0 w-4 h-[2px] bg-white transition-all duration-700 ${
                scene === "moments" ? "" : "opacity-0 scale-x-0"
              }`}
            />
            <i
              className={`absolute left-[44px] bottom-0 w-4 h-[2px] bg-white transition-all duration-700 ${
                scene === "channels" ? "" : "opacity-0 scale-x-0"
              }`}
            />
          </div>
        </div>
      </DemoBox>
    </div>
  )
}

export default Demo
