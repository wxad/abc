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
      aria-label={link}
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
      <div className="footer-animation fixed bottom-2 left-1/2 z-20 flex h-14 bg-white/60 rounded-full shadow-lg backdrop-blur-xs">
        <div
          className="flex items-end gap-2 p-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <FooterItem leftOffset={leftOffset} link="/">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-1/2 aspect-square text-neutral-600"
            >
              <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z" />
              <path d="M12 2v20" />
            </svg>
          </FooterItem>
          <FooterItem leftOffset={leftOffset} link="/crafts">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-1/2 aspect-square text-neutral-600"
            >
              <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
              <path d="m8 6 2-2" />
              <path d="m18 16 2-2" />
              <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </FooterItem>
          <hr
            className="flex-none w-px h-9 bg-neutral-200"
            style={{
              maskImage:
                "linear-gradient(0deg, transparent, rgb(255, 255, 255) 16px, rgb(255, 255, 255) calc(100% - 16px), transparent)",
            }}
          />
          <FooterItem
            leftOffset={leftOffset}
            link="https://codepen.io/aragakey"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-1/2 aspect-square text-neutral-600"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" x2="12" y1="22" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
              <polyline points="2 15.5 12 8.5 22 15.5" />
              <line x1="12" x2="12" y1="2" y2="8.5" />
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
        className="fixed bottom-0 left-0 w-full pointer-events-none z-10 backdrop-blur-sm"
        style={{
          maskImage: "linear-gradient(to top, rgb(0, 0, 0) 15%, transparent)",
          height: "clamp(80px, 10vh, 200px)",
        }}
      />
    </>
  )
}

export default Footer
