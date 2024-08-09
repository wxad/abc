"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { useSpring, animated } from "@react-spring/web"

const FooterItem = ({
  link,
  children,
  leftOffset,
}: {
  link: string
  children: React.ReactNode
  leftOffset: number
}) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const router = useRouter()
  const active = router.asPath === link
  const [{ size }, api] = useSpring(() => ({ size: 40 }))

  useEffect(() => {
    if (ref.current) {
      if (leftOffset > -1) {
        const { left, width } = ref.current.getBoundingClientRect()
        const parentLeft =
          ref.current.parentElement.getBoundingClientRect().left
        const offsetX = left - parentLeft + width / 2
        const distance = Math.abs(leftOffset - offsetX)
        // 40 - 80, distance 0 -> 40
        api.start({
          size: 40 + Math.min(40, Math.max(0, 60 - distance)),
        })
      } else {
        api.start({
          size: 40,
        })
      }
    }
  }, [leftOffset])

  return (
    <NextLink
      data-role="footer-item"
      href={link}
      target={link.startsWith("http") ? "_blank" : undefined}
      className="block"
      ref={ref}
    >
      <animated.div
        className="relative flex items-center justify-center aspect-square rounded-full cursor-pointer"
        style={{
          width: size,
        }}
      >
        <div className="absolute-full flex items-center justify-center z-10">
          {children}
        </div>
        {active && (
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-neutral-200 rounded-full -translate-x-1/2 translate-y-[6px]" />
        )}
        <div
          className="absolute-full rounded-full opacity-95"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgb(248, 248, 248), rgb(232, 232, 232), rgb(248, 248, 248), rgb(232, 232, 232))",
          }}
        />
      </animated.div>
    </NextLink>
  )
}

const Footer = () => {
  const [leftOffset, setLeftOffset] = useState(-1)

  const handleMouseLeave = () => {
    setLeftOffset(-1)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // if touch, ignore
    if (window.matchMedia("(hover: none)").matches) return
    const { left } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left
    setLeftOffset(x)
  }

  return (
    <>
      <div className="footer-animation fixed bottom-2 left-1/2 z-20 flex h-14 bg-white bg-opacity-60 rounded-full shadow-lg backdrop-blur-sm">
        <div
          className="flex items-end gap-2 p-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <FooterItem leftOffset={leftOffset} link="/">
            <div
              className="w-1/2 aspect-square"
              style={{
                backgroundImage: "url(/abc/logo.webp)",
                backgroundSize: "100% 100%",
              }}
            />
          </FooterItem>
          <FooterItem leftOffset={leftOffset} link="/crafts">
            <svg
              className="w-1/2 aspect-square text-neutral-600"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m8.8 10.95l2.15-2.175l-1.4-1.425l-.4.4q-.275.275-.687.288T7.75 7.75t-.3-.712t.3-.713l.375-.375L7 4.825L4.825 7zm8.2 8.225L19.175 17l-1.125-1.125l-.4.375q-.3.3-.7.3t-.7-.3t-.3-.7t.3-.7l.375-.4l-1.425-1.4l-2.15 2.15zM17.6 5l1.425 1.425zM4 21q-.425 0-.712-.288T3 20v-2.825q0-.2.075-.387t.225-.338l4.075-4.075L3.05 8.05Q2.625 7.625 2.625 7t.425-1.05l2.9-2.9q.425-.425 1.05-.412t1.05.437L12.4 7.4l3.775-3.8q.3-.3.675-.45t.775-.15t.775.15t.675.45L20.4 4.95q.3.3.45.675T21 6.4t-.15.763t-.45.662l-3.775 3.8l4.325 4.325q.425.425.425 1.05t-.425 1.05l-2.9 2.9q-.425.425-1.05.425t-1.05-.425l-4.325-4.325L7.55 20.7q-.15.15-.337.225T6.825 21zm1-2h1.4l9.8-9.775L14.775 7.8L5 17.6zM15.5 8.525l-.725-.725L16.2 9.225z"
              />
            </svg>
          </FooterItem>
          <hr
            className="flex-none w-[1px] h-9 bg-neutral-200"
            style={{
              maskImage:
                "linear-gradient(0deg, transparent, rgb(255, 255, 255) 16px, rgb(255, 255, 255) calc(100% - 16px), transparent)",
            }}
          />
          <FooterItem
            leftOffset={leftOffset}
            link="https://codepen.io/aragakey"
          >
            <svg className="w-1/2 grayscale" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M21 9v6M3 15V9m9 12v-6m0-12v6m0 6L3 9l9-6l9 6z" />
                <path d="m12 21l-9-6l9-6l9 6z" />
              </g>
            </svg>
          </FooterItem>
          <FooterItem
            leftOffset={leftOffset}
            link="https://jiangyijie27.github.io/aragakey/"
          >
            <svg
              className="w-1/2 aspect-square text-neutral-600"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 6.39A9.97 9.97 0 0 0 17.42 10c.78 0 1.53-.09 2.25-.26c.21.71.33 1.47.33 2.26c0 4.41-3.59 8-8 8c-3 0-5.61-1.66-7-4.11L6.75 14v-1A1.25 1.25 0 0 1 8 11.75A1.25 1.25 0 0 1 9.25 13v1H12m4-2.25A1.25 1.25 0 0 0 14.75 13A1.25 1.25 0 0 0 16 14.25A1.25 1.25 0 0 0 17.25 13A1.25 1.25 0 0 0 16 11.75"
              />
            </svg>
          </FooterItem>
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 w-full pointer-events-none z-10 backdrop-blur"
        style={{
          maskImage: "linear-gradient(to top, rgb(0, 0, 0) 15%, transparent)",
          height: "clamp(80px, 10vh, 200px)",
        }}
      />
    </>
  )
}

export default Footer
