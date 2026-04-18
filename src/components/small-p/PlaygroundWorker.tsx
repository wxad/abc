import { useEffect, useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

const IMAGES = [
  "https://wxa.wxs.qq.com/wxad-design/yijie/xiao-p-chat-0.webp",
  "https://wxa.wxs.qq.com/wxad-design/yijie/xiao-p-chat-1.webp",
  "https://wxa.wxs.qq.com/wxad-design/yijie/xiao-p-chat-2.webp",
  "https://wxa.wxs.qq.com/wxad-design/yijie/xiao-p-chat-3.webp",
  "https://wxa.wxs.qq.com/wxad-design/yijie/xiao-p-chat-4.webp",
]

const Demo = () => {
  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!inView) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length)
    }, 2500)

    return () => {
      window.clearInterval(timer)
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative mt-4 mb-12 mx-auto h-96 w-full max-w-full overflow-hidden"
    >
      {IMAGES.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="小 p"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity ${
            index === currentIndex
              ? "z-1 opacity-100"
              : "z-0 opacity-0 pointer-events-none"
          }`}
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default Demo
