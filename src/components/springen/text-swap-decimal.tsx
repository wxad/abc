"use client"

import React, { useState, useRef, useEffect } from "react"
import DemoBox from "../DemoBox"
import TextSwap from "./TextSwap"

const Basics = ({ reverse = false }: { reverse?: boolean }) => {
  const [numbers, setNumbers] = useState([
    "1",
    "2",
    "30,000",
    "1,500",
    "31,500",
    "",
    "",
  ])
  const timerCount = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerCount.current % 2 === 0) {
        setNumbers(["2", "3", "36,685", "1,834", "38,519", ".00", ".25"])
      } else {
        setNumbers(["1", "2", "30,000", "1,500", "31,500", "", ""])
      }
      timerCount.current++
    }, 3000)
    return () => clearInterval(timer)
  }, [numbers])

  return (
    <div>
      <DemoBox className="flex justify-center p-10">
        <div className="w-[350px] h-[285px] rounded-xl bg-white ring-1 ring-neutral-100 shadow">
          <div className="pl-6 h-[68px] flex items-center text-[18px] font-semibold border-b border-neutral-100">
            费用明细（元）
          </div>
          <div className="p-8">
            <div className="flex items-center gap-1 mb-5 text-[14px]">
              <span>已选</span>
              <TextSwap className="text-[#296BEF] text-[16px]">
                {numbers[0]}
              </TextSwap>
              <span>个达人，共</span>
              <TextSwap className="text-[#296BEF] text-[16px]">
                {numbers[1]}
              </TextSwap>
              <span>个视频</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[14px] text-neutral-500 flex items-center gap-0.5">
                合作价格
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99957 14.2218C4.56313 14.2218 1.77734 11.436 1.77734 7.99957C1.77734 4.56313 4.56313 1.77734 7.99957 1.77734C11.436 1.77734 14.2218 4.56313 14.2218 7.99957C14.2218 11.436 11.436 14.2218 7.99957 14.2218ZM7.11068 11.9996H8.44401V10.6662H7.11068V11.9996ZM8.44709 9.3329C8.44709 9.15157 8.63553 9.00934 9.33597 8.44401C9.97597 7.92757 10.6693 7.51334 10.6693 6.44401C10.6693 5.65734 10.384 5.04134 9.88798 4.64045C9.38309 4.23157 8.79998 3.99957 8.00264 3.99957C7.06131 3.99957 6.33775 4.31068 5.83731 4.83423C5.2622 5.43512 5.33598 6.07779 5.33598 6.66623H6.66931V6.41823C6.66931 6.16757 6.71909 5.7889 7.11375 5.52934C7.30398 5.40401 7.65153 5.33645 8.00353 5.3329C8.3422 5.32934 8.68353 5.38623 8.89153 5.52934C9.30931 5.81823 9.33597 6.12845 9.33597 6.44401C9.33597 6.7889 9.03731 7.12223 8.44709 7.55512C7.55286 8.21112 7.11375 8.46001 7.11375 8.88845V9.77734H8.44886C8.44886 9.56045 8.44709 9.5569 8.44709 9.3329Z"
                    fill="#495A7A"
                    fillOpacity="0.16"
                  />
                </svg>
              </div>
              <div
                className="flex items-center text-[16px]"
                style={{
                  fontFamily: "WeChat Sans Std Medium",
                }}
              >
                ¥<TextSwap>{numbers[2]}</TextSwap>
                <TextSwap className="top-[1px] text-[12px]">
                  {numbers[5]}
                </TextSwap>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[14px] text-neutral-500 flex items-center gap-1">
                平台服务费
                <div className="text-neutral-400">(5%)</div>
              </div>
              <div
                className="flex items-center text-[16px]"
                style={{
                  fontFamily: "WeChat Sans Std Medium",
                }}
              >
                ¥<TextSwap>{numbers[3]}</TextSwap>
                <TextSwap className="top-[1px] text-[12px]">
                  {numbers[6]}
                </TextSwap>
              </div>
            </div>
            <div className="h-[1px] bg-neutral-100 my-5" />
            <div className="flex items-center justify-between">
              <div className="text-[14px] text-neutral-500 flex items-center gap-1">
                总价
              </div>
              <div
                className="flex items-center text-[16px] text-[#296BEF]"
                style={{
                  fontFamily: "WeChat Sans Std Medium",
                }}
              >
                ¥<TextSwap>{numbers[4]}</TextSwap>
                <TextSwap className="top-[1px] text-[12px]">
                  {numbers[6]}
                </TextSwap>
              </div>
            </div>
          </div>
        </div>
      </DemoBox>
    </div>
  )
}

export default Basics
