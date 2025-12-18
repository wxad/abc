"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { useSpring, animated } from "@react-spring/web"
import {
  DraftingCompass,
  Paintbrush,
  Pyramid,
  ContactRound,
} from "lucide-react"

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
          <div className="absolute bottom-0 left-1/2 size-1 bg-neutral-200 rounded-full -translate-x-1/2 translate-y-[6px]" />
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
            <Pyramid
              width={undefined}
              height={undefined}
              className="size-1/2 text-neutral-600"
            />
          </FooterItem>
          <FooterItem leftOffset={leftOffset} link="/crafts">
            <DraftingCompass
              width={undefined}
              height={undefined}
              className="size-1/2 text-neutral-600"
            />
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
            <Paintbrush
              width={undefined}
              height={undefined}
              className="size-1/2 text-neutral-600"
            />
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
