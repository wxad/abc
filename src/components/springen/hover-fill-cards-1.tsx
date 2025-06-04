import React from "react"
import DemoBox from "../DemoBox"
import { motion, useSpring, useTransform } from "motion/react"

const Demo = () => {
  const cards = [
    {
      title: "文章底部广告",
      tags: ["收益稳定", "转化高效", "锚定完读人群"],
      img: "https://wxa.wxs.qq.com/wxadtouch/upload/creator/e9p10xlx_59e3732fb9ea0a69a10339bb3f573029.png",
    },
    {
      title: "文章中部广告",
      tags: ["上下文场景", "视觉聚焦", "曝光显著"],
      img: "https://wxa.wxs.qq.com/wxadtouch/upload/creator/h5ir0qvy_08defb7bb3c67431870c82747f0920e7.png",
    },
    {
      title: "评论区广告",
      tags: ["互动流量", "沉浸场景", "精准触达"],
      img: "https://wxa.wxs.qq.com/wxadtouch/upload/creator/k3l0q7og_25c7643da1d54439b7ec9ede15a868eb.png",
    },
    {
      title: "关键词广告",
      tags: ["自动关联", "场景融合", "样式原生"],
      img: "https://wxa.wxs.qq.com/wxadtouch/upload/creator/75fzbleg_3c15191e2f060b0bc7eb3592854ffa2a.png",
    },
    {
      title: "返佣商品广告",
      tags: ["位置灵活", "海量货池", "紧密结合内容"],
      img: "https://wxa.wxs.qq.com/wxadtouch/upload/creator/uzromtd3_95d26d28d3f9d8dee356bfd91f2185bf.png",
    },
    {
      title: "互选广告",
      tags: ["内容定制", "细致解读", "传播力强"],
      img: "https://wxa.wxs.qq.com/wxadtouch/upload/creator/2sx26vm9_4db5e7c169c9c3390fc397ac8fc91662.png",
    },
  ]

  const [hoverIndex, setHoverIndex] = React.useState(0)
  const indicatorX = useSpring(0, {
    visualDuration: 0.25,
    bounce: 0,
  })
  const indicatorY = useSpring(0, {
    visualDuration: 0.25,
    bounce: 0,
  })

  const clipPath = useTransform([indicatorX, indicatorY], ([x, y]: any) => {
    const width = 280
    const height = 88
    const gap = 18
    const cols = 2
    const rows = 3

    let top = y
    let right = width * cols + gap * (cols - 1) - width - x
    let bottom = height * rows + gap * (rows - 1) - height - y
    let left = x

    return `inset(${top}px ${right}px ${bottom}px ${left}px)`
  })

  const renderCards = ({ active = false }: { active?: boolean }) => (
    <>
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`relative z-1 pl-[20px] flex flex-col justify-center w-[280px] h-[88px] ${
            active ? "bg-white" : ""
          }`}
          onMouseEnter={(e) => {
            const { offsetTop, offsetLeft } = e.currentTarget
            indicatorX.set(offsetLeft)
            indicatorY.set(offsetTop)
            setHoverIndex(index)
          }}
        >
          <div
            className={`text-[18px] font-semibold ${
              active ? "text-[#07c160]" : ""
            }`}
          >
            {card.title}
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-sm ${
              active ? "text-[#07C160CC]" : "text-[#0000005c]"
            }`}
          >
            {card.tags.map((tag, index) => (
              <React.Fragment key={tag}>
                {tag}
                {index !== card.tags.length - 1 && (
                  <i
                    className={`w-px h-3 ${
                      !active ? "bg-[#e0e0e0]" : "bg-[#07C16026]"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="mb-3">
      <DemoBox className="flex justify-center p-10">
        <div
          className="flex flex-none py-[60px] pl-[60px] pr-[80px] items-center justify-between w-[960px] bg-white"
          style={{
            zoom: 0.7,
          }}
        >
          <div className="relative grid gap-[18px] grid-cols-2">
            <motion.i
              className="absolute top-0 left-0 z-[1] w-[280px] h-[88px] bg-[#07c1600f] rounded-lg"
              style={{
                x: indicatorX,
                y: indicatorY,
              }}
            />
            {renderCards({ active: false })}
            <motion.div
              className="absolute top-0 left-0 w-full h-full grid gap-[18px] grid-cols-2"
              style={{
                clipPath,
              }}
            >
              {renderCards({ active: true })}
            </motion.div>
          </div>
          <div className="relative w-[200px] h-[430px]">
            {cards.map((card, index) => (
              <img
                key={index}
                src={card.img}
                className={`absolute top-0 left-0 w-full h-full ${
                  hoverIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </DemoBox>
    </div>
  )
}

export default Demo
