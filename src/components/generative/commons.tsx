/**
 * 参数：指定最大宽度；
 * 如果容器的尺寸（注意不是监听 window 的尺寸，所以传出一个 ref，然后给这个 ref 加 resize observer）小于最大宽度，则返回需要缩放的比例；如果大于，则为 1
 *
 * copilot 真牛逼
 */
import { useEffect, useRef, useState } from "react"

const useDoodle = (
  maxWidth: number,
  options?: {
    update?: boolean
  }
) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [inView, setInView] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect
        setScale(width < maxWidth ? width / maxWidth : 1)
      }
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [maxWidth])

  useEffect(() => {
    // 监听容器是否在视窗内，如果在视窗内则开启定时器
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    })

    observer.observe(ref.current)

    if (options?.update !== false) {
      timer.current = window.setInterval(() => {
        const doodles = [...ref.current.querySelectorAll("css-doodle")] as any[]
        doodles.forEach((doodle) => {
          doodle.update()
        })
      }, 3000)
    }

    return () => {
      observer.disconnect()
      clearInterval(timer.current)
    }
  }, [])

  return { ref, scale, inView }
}

const Link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <div className="text-xs text-center text-neutral-400">
      《
      <a
        href={href}
        target="_blank"
        className="relative hover:text-blue-500 underline decoration-dotted decoration-current underline-offset-4"
      >
        {children}
      </a>
      》
    </div>
  )
}

export { useDoodle, Link }
