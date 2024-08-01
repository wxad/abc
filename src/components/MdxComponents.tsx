import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTrail } from "@react-spring/web"
import { getId } from "@/lib/utils"

export const H2: React.FC<{ children: string }> = ({
  children,
  ...otherProps
}) => {
  const id = getId(children)
  return (
    <h2
      id={id}
      className="relative mb-8 mt-24 text-2xl font-medium before:absolute before:-top-4 before:left-0 before:h-[3px] before:w-6 before:bg-current"
      {...otherProps}
    >
      {children}
    </h2>
  )
}

export const H3 = ({ children, ...otherProps }: { children: string }) => {
  const id = getId(children)
  return (
    <h3 id={id} className="text-xl mt-12 mb-4 font-medium" {...otherProps}>
      {children}
    </h3>
  )
}

export const P = ({ children, ...otherProps }: { children: string }) => {
  return (
    <p className="mb-4" {...otherProps}>
      {children}
    </p>
  )
}

export const A = ({
  children,
  ...otherProps
}: {
  children: string
  href: string
}) => {
  const [isClient, setIsClient] = useState(false)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  // 2023 朋友圈广告年度评选(https://wxa.wxs.qq.com/wxad-design/yijie/bm23-abc.webp)
  const img = children.match(/\((.*)\)/)?.[1]
  const text = children.replace(/\(.*\)/, "")

  const topX = useRef(0)
  const bottomX = useRef(0)

  const fast = { tension: 400, friction: 40 }
  const slow = { mass: 2.3, tension: 680, friction: 50 }
  const portalStyleRef = useRef({
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    opacity: 0,
    rotate: 0,
    scale: 0,
  })
  const linkStyleInfos = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const [, api]: any = useTrail(2, (i) => ({
    mouseX: 0,
    config: i === 0 ? fast : slow,
    onChange(result) {
      let delta = 0
      if (i === 0) {
        bottomX.current = result.value.mouseX
        delta =
          result.value.mouseX -
          linkStyleInfos.current.x -
          linkStyleInfos.current.width / 2
        portalStyleRef.current = {
          ...portalStyleRef.current,
          x: delta,
        }
      } else {
        const y = 150
        topX.current = result.value.mouseX
        let rotate =
          90 - (Math.atan2(y, topX.current - bottomX.current) * 180) / Math.PI
        rotate = rotate / 3

        portalStyleRef.current = {
          ...portalStyleRef.current,
          rotate,
        }
        updatePortalStyle()
      }
    },
  }))

  useEffect(() => {
    if (isClient) {
      const linkRect = linkRef.current.getBoundingClientRect()
      const { x, y, width, height } = linkRect

      linkStyleInfos.current = {
        x,
        y,
        width,
        height,
      }
    }
  }, [isClient])

  useEffect(() => {
    if (img) {
      setIsClient(true)
    }
  }, [])

  const updatePortalStyle = () => {
    const { top, left, x, opacity, rotate, scale } = portalStyleRef.current

    if (outerRef.current) {
      outerRef.current.style.top = `${top}px`
      outerRef.current.style.left = `${left}px`
      outerRef.current.style.transform = `translate3d(${x}px, 0, 0) rotate(${rotate}deg)`
      outerRef.current.style.opacity = `${opacity}`
    }

    if (innerRef.current) {
      innerRef.current.style.transform = `scale(${scale})`
    }
  }

  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isClient) {
      return
    }
    if (!outerRef.current) {
      return
    }
    const outerRect = outerRef.current.getBoundingClientRect()
    const linkRect = linkRef.current.getBoundingClientRect()
    const { x, y, width, height } = linkRect

    linkStyleInfos.current = {
      x,
      y,
      width,
      height,
    }

    portalStyleRef.current = {
      ...portalStyleRef.current,
      top: linkStyleInfos.current.y - outerRect.height - 10,
      left:
        linkStyleInfos.current.x +
        linkStyleInfos.current.width / 2 -
        outerRect.width / 2,
      opacity: 1,
      scale: 1,
    }

    api.start({
      mouseX: e.clientX,
      immediate: true,
    })
  }

  const handleMouseMove: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isClient) {
      return
    }
    api.start({
      mouseX: e.clientX,
    })
  }

  const handleMouseLeave = () => {
    if (!isClient) {
      return
    }
    portalStyleRef.current = {
      ...portalStyleRef.current,
      opacity: 0,
      scale: 0.5,
    }

    updatePortalStyle()
  }

  return (
    <>
      <a
        ref={linkRef}
        target="_blank"
        className="relative text-blue-500 hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...otherProps}
      >
        {text}
        <svg
          className="relative top-[-1px] inline-block w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="m6 18l2.5-2.5M18 6H9m9 0v9m0-9l-6.5 6.5"
          />
        </svg>
      </a>
      {isClient ? (
        <>
          {createPortal(
            <div
              className="fixed top-0 left-0 w-[240px] h-[135px] overflow-hidden pointer-events-none"
              ref={outerRef}
              style={{
                opacity: 0,
                transition: ".3s ease opacity",
              }}
            >
              <div
                className="absolute-full bg-neutral-50 border-2 border-white border-opacity-20 rounded-lg overflow-hidden origin-bottom"
                ref={innerRef}
                style={{
                  transform: "scale(0.5)",
                  transition: ".3s ease transform",
                }}
              >
                {img.includes("mp4") ? (
                  <video
                    className="absolute-full"
                    preload="auto"
                    x-webkit-airplay="true"
                    webkit-playsinline="true"
                    playsInline
                    muted
                    loop
                    autoPlay
                  >
                    <source src={img} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    className="absolute-full object-cover"
                    src={img}
                    alt=""
                  />
                )}
              </div>
            </div>,
            document.body
          )}
        </>
      ) : null}
    </>
  )
}

export const Pre = ({ children, ...otherProps }: { children: string }) => {
  return (
    <pre
      className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto"
      {...otherProps}
    >
      {children}
    </pre>
  )
}

export const Code = ({ children, ...otherProps }: { children: string }) => {
  return (
    <code className="text-sm" {...otherProps}>
      {children}
    </code>
  )
}

export const Ol = ({
  children,
  ...otherProps
}: {
  children: React.ReactNode
}) => {
  return (
    <ol
      className="mb-4 list-none"
      style={{
        counterReset: "counts 0",
      }}
      {...otherProps}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            <li
              key={index}
              className="flex mb-1 before:content-[counter(counts)_'._'] before:pr-4 before:font-mono before:font-medium before:text-gray-500"
              style={{
                counterIncrement: "counts 1",
              }}
            >
              <div>{child.props.children}</div>
            </li>
          ) : null
        )}
    </ol>
  )
}

export const Strong = ({ children, ...otherProps }: { children: string }) => {
  return (
    <strong
      className="font-semibold underline decoration-dotted decoration-current underline-offset-4"
      {...otherProps}
    >
      {children}
    </strong>
  )
}

export const BlockQuote = ({
  children,
  ...otherProps
}: {
  children: string
}) => {
  return (
    <blockquote
      className="pl-4 border-l-2 border-gray-500 text-gray-700 italic"
      {...otherProps}
    >
      {children}
    </blockquote>
  )
}

export const Img = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <>
      <img
        className="block mb-4 w-full max-w-full"
        src={src}
        alt={alt}
        loading="lazy"
      />
      <span className="block text-xs text-center text-neutral-400">{alt}</span>
    </>
  )
}

export const Hr = () => {
  return <hr className="my-8 border-t border-dashed border-neutral-300" />
}
