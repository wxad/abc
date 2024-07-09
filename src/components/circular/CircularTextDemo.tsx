import React from "react"
import DemoBox from "../DemoBox"
import AnimateText from "./AnimateText"

const CircularTextDemo = () => {
  const texts = ["CHANELN°5", "CHANELN°5", "CHANELN°5"]

  return (
    <DemoBox
      className="flex justify-center items-center gap-6 py-8 overflow-hidden"
      style={{
        background: "rgba(0, 0, 0, 1)",
      }}
    >
      <div className="relative w-60 h-60 rounded-2xl">
        <div
          className="absolute-full text-[16px] leading-[1] rotate-[-30deg]"
          style={{
            // @ts-ignore
            "--char-count": texts.join("").length,
            "--font-size": 2,
            "--character-width": 1.5,
            "--inner-angle": "calc((360 / var(--char-count)) * 1deg)",
            "--radius":
              "calc((var(--character-width) / sin(var(--inner-angle))) * -1ch",
          }}
        >
          {texts.map((text, index) => (
            <AnimateText
              key={index}
              text={text}
              loop
              charProps={{
                className:
                  "circular-text-char font-[abchanel-corpo] font-semibold",
              }}
              charIndexOffset={index * text.length}
              // 字号
              size={20}
              // 文字最终颜色
              color="#fff"
              // 子弹颜色1
              bulletColor1="#d79535"
              // 子弹颜色2
              bulletColor2="#ffefb8"
              // 过渡颜色1
              gradientColor1="#d79535"
              // 过渡颜色2
              gradientColor2="#ffefb8"
            />
          ))}
        </div>
      </div>
    </DemoBox>
  )
}
export default CircularTextDemo
