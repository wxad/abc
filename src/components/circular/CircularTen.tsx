import React from "react"
import DemoBox from "../DemoBox"
import AnimateText from "./AnimateText"

const Demo = () => {
  return (
    <DemoBox
      className="flex justify-center items-center gap-6 py-12 overflow-hidden"
      style={{
        background: "rgba(0, 0, 0, 1)",
      }}
    >
      <div className="relative w-[100px] h-[100px] scale-125">
        <svg
          className="absolute top-[18px] left-[10px]"
          width="7"
          height="65"
          viewBox="0 0 7 65"
          fill="none"
        >
          <path
            d="M6.97125 0.0961914H0.615479V64.0193H6.97125V0.0961914Z"
            fill="#00FA73"
          />
        </svg>
        <div className="absolute bottom-[17px] left-[27px] w-16 h-16">
          <svg className="absolute-full fill-none" viewBox="0 0 36 36">
            <path
              className="fill-none origin-center stroke-white stroke-[3.18px]"
              style={{
                transform: "rotateY(180deg) rotateZ(55deg)",
                strokeDasharray: "52 100",
              }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute-full scale-75">
            <div
              className="absolute-full text-[16px] leading-[1] rotate-[-30deg]"
              style={{
                // @ts-ignore
                "--char-count": 22,
                "--font-size": 1,
                "--character-width": 0.92,
                "--inner-angle": "calc((360 / var(--char-count)) * 1deg)",
                "--radius":
                  "calc((var(--character-width) / sin(var(--inner-angle))) * -1ch",
              }}
            >
              <AnimateText
                text="Aragakey."
                loop={false}
                charProps={{
                  className: "circular-text-char font-[gilroysemibold]",
                }}
                // 字号
                size={20}
                // 文字最终颜色
                color="#fff"
                // 子弹颜色1
                bulletColor1="#00FA73"
                // 子弹颜色2
                bulletColor2="#ffefb8"
                // 过渡颜色1
                gradientColor1="#07c160"
                // 过渡颜色2
                gradientColor2="#00FA73"
              />
            </div>
          </div>
        </div>
      </div>
    </DemoBox>
  )
}
export default Demo
