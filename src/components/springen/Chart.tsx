import DemoBox from "../DemoBox"
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
  AnimationPlaybackControls,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Pane } from "tweakpane"

const Demo = () => {
  const minPrice = 4500
  const maxPrice = 6000
  const minNumber = 225000
  const maxNumber = 300000

  const paneWrapper = useRef<HTMLDivElement>(null)
  const paneRef = useRef<Pane | null>(null)
  const timerRef = useRef<number>(0)
  const [params, setParams] = useState({
    visualDuration: 0.25,
    resetWhenMouseLeave: true,
    areaFilled: true,
    priceGap: 10,
    numberGap: 1000,
    labelTransitionType: "fade" as "fade" | "move",
  })

  const isHovering = useRef(false)
  const currentPrice = useMotionValue(minPrice)
  const currentPriceText = useTransform(currentPrice, (v) => v.toLocaleString())

  const animationRef = useRef<AnimationPlaybackControls | null>(null)

  const currentNumber = useMotionValue(minNumber)
  const currentNumberText = useTransform(currentNumber, (v) => {
    if (v <= minNumber) {
      return `<${minNumber.toLocaleString()}`
    }
    if (v >= maxNumber) {
      return `>${maxNumber.toLocaleString()}`
    }
    return v.toLocaleString()
  })

  const minNumberOpacity = useSpring(1, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const minNumberY = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const maxNumberY = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const maxNumberOpacity = useSpring(1, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const minNumberColor = useSpring(1, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const maxNumberColor = useSpring(1, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const minNumberColorValue = useTransform(
    minNumberColor,
    (v) => `rgba(0, 0, 0, ${v})`
  )
  const maxNumberColorValue = useTransform(
    maxNumberColor,
    (v) => `rgba(0, 0, 0, ${v})`
  )

  const maxPriceLabelOpacity = useSpring(1, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const minPriceLabelOpacity = useSpring(1, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const maxPriceLabelX = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const minPriceLabelX = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const minPriceLabelColorValue = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const minPriceLabelColor = useTransform(
    minPriceLabelColorValue,
    [0, 1],
    ["rgba(250, 157, 59, 1)", "rgba(0, 0, 0, 0.3)"]
  )

  const minPriceLabelFontWeight = useTransform(
    minPriceLabelColorValue,
    [0, 1],
    [500, 400]
  )

  const currentPriceOpacity = useSpring(0, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const maxPriceOpacity = useSpring(0.3, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })
  const minPriceOpacity = useSpring(0.3, {
    visualDuration: 0.2,
    bounce: 0,
    restDelta: 0.001,
  })

  const offsetInitial = 43
  const offset = useSpring(offsetInitial, {
    visualDuration: params.visualDuration || 0.01,
    bounce: 0,
    restDelta: 0.001,
  })
  const chartSvgRef = useRef<SVGSVGElement>(null)
  const chartClipPath = useTransform(offset, (v) => `inset(0 ${100 - v}% 0 0)`)

  const yAxisClipPath = useTransform(offset, (v) => {
    if (v < 0) {
      return `inset(0 150px 0 0)`
    } else if (v < 21.05) {
      // v 0 -> 21.05, yAxisClipPath 150 -> 102
      return `inset(0 ${150 - ((v - 0) * (150 - 102)) / (21.05 - 0)}px 0 0)`
    } else if (v < 65.78) {
      // v 21.05 -> 65.78, yAxisClipPath 102 -> 0
      return `inset(0 ${
        102 - ((v - 21.05) * (102 - 0)) / (65.78 - 21.05)
      }px 0 0)`
    }
    return `inset(0 0 0 0)`
  })

  const xAxisClipPath = useTransform(offset, (v) => {
    if (v <= 0) {
      return `inset(125px 0 0 0)`
    } else if (v < 21.05) {
      return `inset(78px 0 0 0)`
    } else if (v < 65.78) {
      // v 21.05 -> 65.78, xAxisClipPath 78 -> 0
      return `inset(${78 - ((v - 21.05) * (78 - 0)) / (65.78 - 21.05)}px 0 0 0)`
    }
    return `inset(0 0 0 0)`
  })

  const xAxisX = useTransform(offset, (v) => {
    if (v < 0) {
      return -150
    } else if (v < 21.05) {
      // v 0 -> 21.05, xAxisX -150 -> -102
      return -150 + ((-102 + 150) * (v - 0)) / (21.05 - 0)
    } else if (v < 65.78) {
      // v 21.05 -> 65.78, xAxisX -102 -> 0
      return -102 + ((0 + 102) * (v - 21.05)) / (65.78 - 21.05)
    }
    // v 65.78 -> 100, xAxisX 0 -> 78
    return 0 + ((78 - 0) * (v - 65.78)) / (100 - 65.78)
  })

  const yAxisY = useTransform(offset, (v) => {
    if (v < 21.05) {
      return 79.5
    } else if (v < 65.78) {
      // v 21.05 -> 65.78, yAxisY 79.5 -> 0
      return 79.5 - ((v - 21.05) * (79.5 - 0)) / (65.78 - 21.05)
    }
    return 0
  })

  const circleX = useTransform(offset, (v) => {
    if (v < 0) {
      return 0
    } else if (v < 21.05) {
      // v 0 -> 21.05, circleX 0 -> 48
      return (48 * v) / 21.05
    } else if (v < 65.78) {
      // v 21.05 -> 65.78, circleX 48 -> 149.5
      return 48 + ((149.5 - 48) * (v - 21.05)) / (65.78 - 21.05)
    } else if (v < 100) {
      // v 65.78 -> 100, circleX 149.5 -> 228
      return 149.5 + ((228 - 149.5) * (v - 65.78)) / (100 - 65.78)
    }
    return 228
  })

  const circleY = useTransform(offset, (v) => {
    if (v < 21.05) {
      return 0
    } else if (v < 65.78) {
      // v 21.05 -> 65.78, circleY 0 -> -79
      return (-79 * (v - 21.05)) / (65.78 - 21.05)
    }
    return -79
  })

  const circleTransform = useTransform([circleX, circleY], (v) => {
    return `translate3d(${v[0]}px, ${v[1]}px, 0)`
  })

  const currentPriceY = useTransform(offset, (v) => {
    if (v < 21.05) {
      return 66.5
    } else if (v < 31) {
      // v 21.05 -> 31, currentPriceY 66.5 -> 52
      return 66.5 + ((52 - 66.5) * (v - 21.05)) / (31 - 21.05)
    } else if (v < 65.78) {
      // v 31 -> 65.78, currentPriceY 52 -> -13.5
      return 52 + ((-13.5 - 52) * (v - 31)) / (65.78 - 31)
    }
    return -13.5
  })

  offset.on("change", (v) => {
    // 这里计算出当前价格
    let newPrice
    if (v < 21.05) {
      // 第一段水平线：保持最低价格
      newPrice = minPrice
    } else if (v < 65.78) {
      // 第二段斜线：价格从最低到最高线性变化
      const segmentProgress = (v - 21.05) / (65.78 - 21.05)
      const rawPrice = minPrice + (maxPrice - minPrice) * segmentProgress
      // 根据 priceGap 取整
      newPrice = Math.round(rawPrice / params.priceGap) * params.priceGap
    } else {
      // 第三段水平线：保持最高价格
      newPrice = maxPrice
    }
    currentPrice.set(newPrice)

    // 这里计算出当前播放量
    let newNumber
    if (v < 21.05) {
      // 第一段水平线：保持最低播放量
      newNumber = minNumber
    } else if (v < 65.78) {
      // 第二段斜线：播放量从最低到最高线性变化
      const segmentProgress = (v - 21.05) / (65.78 - 21.05)
      const rawNumber = minNumber + (maxNumber - minNumber) * segmentProgress
      // 根据 numberGap 取整
      newNumber = Math.round(rawNumber / params.numberGap) * params.numberGap
    } else {
      // 第三段水平线：保持最高播放量
      newNumber = maxNumber
    }

    currentNumber.set(newNumber)

    if (isHovering.current && newPrice < maxPrice) {
      maxPriceOpacity.set(0.3)
    } else {
      maxPriceOpacity.set(1)
    }

    if (isHovering.current && newPrice > minPrice) {
      minPriceOpacity.set(0.3)
    } else {
      minPriceOpacity.set(1)
    }

    if (params.labelTransitionType === "move") {
      if (isHovering.current && v > 58) {
        maxPriceLabelX.set(-48)
      } else {
        maxPriceLabelX.set(0)
      }

      if (isHovering.current && v < 32) {
        minPriceLabelX.set(-48)
      } else {
        minPriceLabelX.set(0)
      }
    } else {
      if (isHovering.current && v > 58) {
        maxPriceLabelOpacity.set(0)
      } else {
        maxPriceLabelOpacity.set(1)
      }

      if (isHovering.current && v < 32) {
        minPriceLabelOpacity.set(0)
      } else {
        minPriceLabelOpacity.set(1)
      }
    }

    if (params.labelTransitionType === "move") {
      if (isHovering.current && v < 42) {
        minNumberY.set(16)
      } else {
        minNumberY.set(0)
      }

      if (isHovering.current && v > 44 && v < 88) {
        maxNumberY.set(16)
      } else {
        maxNumberY.set(0)
      }
    } else {
      if (isHovering.current && v < 42) {
        minNumberOpacity.set(0)
      } else {
        minNumberOpacity.set(1)
      }

      if (isHovering.current && v > 44 && v < 88) {
        maxNumberOpacity.set(0)
      } else {
        maxNumberOpacity.set(1)
      }
    }
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    clearTimeout(timerRef.current)
    if (!chartSvgRef.current) return

    animationRef.current?.stop()

    isHovering.current = true

    const rect = chartSvgRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    offset.set(percentage)
    // priceLabelOpacity.set(0)
    minPriceLabelColorValue.set(1)
    currentPriceOpacity.set(1)

    minNumberColor.set(0.3)
    maxNumberColor.set(0.3)
  }

  const handleMouseLeave = () => {
    if (!params.resetWhenMouseLeave) return
    timerRef.current = window.setTimeout(() => {
      isHovering.current = false
      animationRef.current?.stop()
      animationRef.current = animate(offset.get(), offsetInitial, {
        type: "spring",
        visualDuration: 0.35,
        bounce: 0,
        restDelta: 0.001,
        onUpdate: (v) => {
          offset.jump(v)
        },
      })
      // priceLabelOpacity.set(1)
      maxPriceLabelOpacity.jump(1)
      minPriceLabelOpacity.jump(1)

      minNumberColor.jump(1)
      maxNumberColor.jump(1)

      minNumberOpacity.jump(1)
      maxNumberOpacity.jump(1)

      minNumberY.jump(0)
      maxNumberY.jump(0)

      maxPriceLabelX.jump(0)
      minPriceLabelX.jump(0)

      minPriceLabelColorValue.jump(0)
      currentPriceOpacity.jump(0)
    }, 200)
  }

  useEffect(() => {
    paneRef.current = new Pane({
      container: paneWrapper.current,
    })

    paneRef.current.on("change", (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.key]: ev.value,
      }))
    })

    paneRef.current.addBinding(params, "visualDuration", {
      label: "跟手速度",
      min: 0,
      max: 0.6,
      step: 0.05,
    })

    paneRef.current.addBinding(params, "resetWhenMouseLeave", {
      label: "移出时归位",
    })

    paneRef.current.addBinding(params, "areaFilled", {
      label: "填充色",
    })

    paneRef.current.addBinding(params, "labelTransitionType", {
      label: "坐标重叠处理",
      options: {
        隐藏: "fade",
        位移: "move",
      },
    })

    paneRef.current.addBinding(params, "priceGap", {
      label: "价格间隔",
      options: { "1": 1, "10": 10, "50": 50, "100": 100 },
    })

    paneRef.current.addBinding(params, "numberGap", {
      label: "播放量间隔",
      options: { "1": 1, "1000": 1000 },
    })

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 pt-42 text-sm">
      <div ref={paneWrapper} className="absolute top-1 right-1" />
      <motion.div
        className="relative -my-10 px-8 py-10 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <svg width="327" height="196" viewBox="0 0 327 196" fill="none">
            <path
              d="M70.8536 3.64645C70.6583 3.45118 70.3417 3.45118 70.1464 3.64645L66.9645 6.82843C66.7692 7.02369 66.7692 7.34027 66.9645 7.53553C67.1597 7.7308 67.4763 7.7308 67.6716 7.53553L70.5 4.70711L73.3284 7.53553C73.5237 7.7308 73.8403 7.7308 74.0355 7.53553C74.2308 7.34027 74.2308 7.02369 74.0355 6.82843L70.8536 3.64645ZM70.5 4L70 4L70 172L70.5 172L71 172L71 4L70.5 4Z"
              fill="black"
              fillOpacity="0.1"
            />
            <path
              d="M299.354 172.854C299.549 172.658 299.549 172.342 299.354 172.146L296.172 168.964C295.976 168.769 295.66 168.769 295.464 168.964C295.269 169.16 295.269 169.476 295.464 169.672L298.293 172.5L295.464 175.328C295.269 175.524 295.269 175.84 295.464 176.036C295.66 176.231 295.976 176.231 296.172 176.036L299.354 172.854ZM299 172.5V172L70 172V172.5V173L299 173V172.5Z"
              fill="black"
              fillOpacity="0.1"
            />
            <path
              d="M71 126H119L220.5 46.5H299"
              stroke="black"
              strokeOpacity="0.1"
            />
            <line
              x1="71"
              y1="46.5"
              x2="217"
              y2="46.5"
              stroke="black"
              strokeOpacity="0.1"
              strokeDasharray="4 4"
            />
            <line
              x1="119"
              y1="127"
              x2="119"
              y2="172"
              stroke="black"
              strokeOpacity="0.1"
              strokeDasharray="4 4"
            />
            <line
              x1="220.5"
              y1="47"
              x2="220.5"
              y2="172"
              stroke="black"
              strokeOpacity="0.1"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="absolute top-0.5 left-20 text-xs text-black/30">
            达人收入
          </div>
          <div className="absolute bottom-4 -right-9 text-xs text-black/30">
            自然播放量
          </div>
          {params.areaFilled && (
            <motion.svg
              className="absolute left-[71px] bottom-6"
              width="228"
              height="126"
              viewBox="0 0 228 126"
              style={{
                clipPath: chartClipPath,
              }}
            >
              <path
                d="M48 80.0003L0 80V126H228V0.5H149.5L48 80.0003Z"
                fill="url(#paint0_linear_1080_10663)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1080_10663"
                  x1="59.1196"
                  y1="125.479"
                  x2="59.1196"
                  y2="25.7907"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FA9D3B" stopOpacity="0.05" />
                  <stop offset="1" stopColor="#FA9D3B" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}
          <motion.svg
            width="228"
            height="83"
            viewBox="0 0 228 83"
            fill="none"
            className="absolute left-[71px] bottom-[68px]"
            ref={chartSvgRef}
            style={{
              clipPath: chartClipPath,
            }}
          >
            <path
              d="M0 81.0003H48L149.5 1.5H227.5"
              stroke="#FA9D3B"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </motion.svg>
          <motion.div className="absolute right-[264px] bottom-[140px] text-right">
            <motion.div
              className="text-xs text-black"
              style={{ opacity: maxPriceOpacity }}
            >
              封顶价
            </motion.div>
            <motion.div
              className="text-[#FA9D3B] text-sm leading-[20px]"
              style={{
                fontFamily: "WeChat Sans Std",
                opacity: maxPriceLabelOpacity,
                x: maxPriceLabelX,
                color: minPriceLabelColor,
                fontWeight: minPriceLabelFontWeight,
              }}
            >
              ￥{maxPrice.toLocaleString()}
            </motion.div>
          </motion.div>
          <motion.div className="absolute right-[264px] bottom-[44px] text-right">
            <motion.div
              className="text-sm leading-[20px]"
              style={{
                fontFamily: "WeChat Sans Std",
                opacity: minPriceLabelOpacity,
                x: minPriceLabelX,
                color: minPriceLabelColor,
                fontWeight: minPriceLabelFontWeight,
              }}
            >
              ￥{minPrice.toLocaleString()}
            </motion.div>
            <motion.div
              className="text-xs text-black"
              style={{ opacity: minPriceOpacity }}
            >
              保底价
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-[96px] text-xs leading-[20px] font-[WeChat_Sans_Std]"
            style={{
              opacity: minNumberOpacity,
              y: minNumberY,
              color: minNumberColorValue,
            }}
          >
            {minNumber.toLocaleString()}
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-[197px] text-xs leading-[20px] font-[WeChat_Sans_Std]"
            style={{
              opacity: maxNumberOpacity,
              color: maxNumberColorValue,
              y: maxNumberY,
            }}
          >
            {maxNumber.toLocaleString()}
          </motion.div>
          <motion.svg
            width="1"
            height="125"
            viewBox="0 0 1 125"
            fill="none"
            className="absolute left-[220px] bottom-[24px]"
            style={{
              clipPath: xAxisClipPath,
              x: xAxisX,
            }}
          >
            <line
              x1="0.5"
              y1="-2.18557e-08"
              x2="0.500005"
              y2="125"
              stroke="#FA9D3B"
              strokeDasharray="4 4"
            />
          </motion.svg>
          <motion.svg
            width="150"
            height="1"
            viewBox="0 0 150 1"
            fill="none"
            className="absolute left-[71px] bottom-[149px]"
            style={{
              clipPath: yAxisClipPath,
              y: yAxisY,
            }}
          >
            <line
              y1="0.5"
              x2="150"
              y2="0.5"
              stroke="#FA9D3B"
              strokeDasharray="4 4"
            />
          </motion.svg>
          <motion.svg
            className="absolute left-[65px] bottom-[64px]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: circleTransform,
            }}
          >
            <circle
              cx="6"
              cy="6"
              r="4.5"
              fill="white"
              stroke="#FA9D3B"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </motion.svg>
          <motion.div
            className="absolute left-[19px] bottom-[129px] text-right"
            style={{ opacity: currentPriceOpacity, y: currentPriceY }}
          >
            <motion.div className="text-[#FA9D3B] text-sm leading-[15px] font-[WeChat_Sans_Std_Medium]">
              ￥<motion.span>{currentPriceText}</motion.span>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute left-[220px] bottom-0 text-xs leading-[20px] font-[WeChat_Sans_Std]"
            style={{
              x: xAxisX,
              opacity: currentPriceOpacity,
            }}
          >
            <motion.div className="-translate-x-1/2">
              {currentNumberText}
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute left-[86px] bottom-[58px] w-[60px] h-6 flex items-center justify-center text-xs text-[#FA9D3B] font-semibold bg-[#FA9D3B]/16 rounded"
            style={{
              transform: circleTransform,
            }}
          >
            结算价格
            <svg
              className="absolute right-full top-1/2 -translate-y-1/2"
              width="4"
              height="10"
              viewBox="0 0 4 10"
              fill="none"
            >
              <path
                d="M4 0.5L0.300442 4.26236C-0.100146 4.66975 -0.100147 5.33025 0.300442 5.73764L4 9.5L4 0.5Z"
                fill="#FA9D3B"
                fillOpacity="0.16"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </DemoBox>
  )
}

export default Demo
