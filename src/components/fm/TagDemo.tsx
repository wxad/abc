import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Item = ({ color }: { color: string }) => {
  return (
    <div
      data-role="tag-demo-item"
      className={`relative inline-flex items-center justify-center mr-2 mb-2 w-[148px] h-7 text-sm ${color} rounded-[4px] whitespace-nowrap`}
    >
      {color}
      <svg
        className="ml-1 flex-none fill-current opacity-30"
        width="16"
        height="16"
        viewBox="0 0 18 18"
      >
        <path d="M10.1694 9.10876L12.4675 6.81066L11.4069 5.75L9.10876 8.0481L6.81066 5.75L5.75 6.81066L8.0481 9.10876L5.75 11.4069L6.81066 12.4675L9.10876 10.1694L11.4069 12.4675L12.4675 11.4069L10.1694 9.10876ZM9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16Z" />
      </svg>
      <div className="absolute-full bg-current rounded-[4px] opacity-[0.03]" />
      <div className="absolute-full border border-current rounded-[4px] opacity-25" />
    </div>
  )
}

const Tag = () => {
  const [colors, setColors] = useState([
    "text-neutral-400",
    "text-neutral-500",
    "text-neutral-600",
    "text-neutral-700",
    "text-neutral-800",
    "text-neutral-900",
  ])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const interval = useRef(0)

  useEffect(() => {
    const tags = [
      ...wrapperRef.current!.querySelectorAll("[data-role=tag-demo-item]"),
    ] as HTMLDivElement[]

    interval.current = window.setInterval(() => {
      // setShow0((prev) => !prev)
      tags[1].style.opacity = "0"
      tags[1].style.transition = ".4s ease all"

      tags[2].style.transform = "translate3d(156px, -36px, 0)"
      tags[2].style.transition = ".4s ease all .2s"

      tags[3].style.transform = "translate3d(-156px, 0, 0)"
      tags[3].style.transition = ".4s ease all .25s"

      tags[4].style.transform = "translate3d(156px, -36px, 0)"
      tags[4].style.transition = ".4s ease all .3s"

      tags[5].style.transform = "translate3d(-156px, 0, 0)"
      tags[5].style.transition = ".4s ease all .35s"

      setTimeout(() => {
        // setShow0((prev) => !prev)

        tags[1].style.opacity = "1"
        tags[1].style.transition = ".4s ease all .3s"

        tags[2].style.transform = ""
        tags[2].style.transition = ".4s ease all .15s"

        tags[3].style.transform = ""
        tags[3].style.transition = ".4s ease all .1s"

        tags[4].style.transform = ""
        tags[4].style.transition = ".4s ease all .05s"

        tags[5].style.transform = ""
        tags[5].style.transition = ".4s ease all"
      }, 2000)
    }, 4000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="flex px-10 justify-center items-center h-72 overflow-hidden">
      <div className="flex flex-wrap w-80" ref={wrapperRef}>
        {colors.map((color, index) => (
          <Item key={index} color={color} />
        ))}
      </div>
    </DemoBox>
  )
}

export default Tag
