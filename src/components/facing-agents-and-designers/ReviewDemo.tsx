import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

import DemoBox from "@/components/DemoBox"
import { cn } from "@/lib/utils"

import { facingAgentsVideoSrc } from "./videoCdn"

const ReviewDemo = ({
  src = facingAgentsVideoSrc.reviewDemo,
  startAt = 0,
  endAt = 0,
  note,
  aspectClassName = "aspect-2032/1080",
  className,
  // 录屏边裁：默认裁底 3px；个别片裁顶
  clipInset = "0 0 3px 0",
  speedToggle = false,
}: {
  src?: string
  startAt?: number
  endAt?: number
  note?: string
  aspectClassName?: string
  className?: string
  clipInset?: string
  speedToggle?: boolean
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const speedListRef = useRef<HTMLDivElement>(null)
  const speedIndicatorRef = useRef<HTMLDivElement>(null)
  const userPickedSpeedRef = useRef(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting
  const clipped = startAt > 0 || endAt > 0

  const cue = () => {
    const video = videoRef.current
    if (!video || !clipped) return
    if (
      video.currentTime < startAt ||
      (endAt > 0 && video.currentTime >= endAt)
    ) {
      video.currentTime = startAt
    }
  }

  const applyRate = (video: HTMLVideoElement) => {
    video.playbackRate = playbackRate
  }

  const playVideo = () => {
    const video = videoRef.current
    if (!video) return
    cue()
    applyRate(video)
    video.play().catch(() => {
      coverRef.current!.style.display = "flex"
    })
  }

  const handleTimeUpdate = () => {
    coverRef.current!.style.display = "none"
    const video = videoRef.current
    if (!video || endAt <= 0 || video.currentTime < endAt) return
    video.currentTime = startAt
  }

  const handleEnded = () => {
    const video = videoRef.current
    if (!video) return
    if (speedToggle && !userPickedSpeedRef.current) {
      setPlaybackRate((rate) => {
        const next = rate === 0.5 ? 1 : 0.5
        video.playbackRate = next
        return next
      })
    }
    video.currentTime = startAt
    video.play().catch(() => {})
  }

  useEffect(() => {
    if (inView) {
      playVideo()
    } else {
      videoRef.current?.pause()
    }
  }, [inView])

  useEffect(() => {
    const video = videoRef.current
    if (video) applyRate(video)
  }, [playbackRate])

  useLayoutEffect(() => {
    if (!speedToggle) return
    const list = speedListRef.current
    const indicator = speedIndicatorRef.current
    if (!list || !indicator) return
    const active = list.querySelector<HTMLElement>('[data-active="true"]')
    if (!active) return
    const inset = 8
    indicator.style.width = `${Math.max(active.offsetWidth - inset * 2, 0)}px`
    indicator.style.transform = `translateX(${active.offsetLeft + inset}px)`
  }, [playbackRate, speedToggle])

  const speedControl = speedToggle ? (
    <div
      ref={speedListRef}
      className="absolute top-3 right-3 z-10 flex items-center text-sm font-medium"
    >
      <span
        ref={speedIndicatorRef}
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-neutral-900 transition-[transform,width] duration-300 ease-out"
        aria-hidden
      />
      {([0.5, 1] as const).map((rate) => {
        const active = playbackRate === rate
        return (
          <button
            key={rate}
            type="button"
            data-active={active}
            className={cn(
              "px-2 py-1 transition-colors duration-300",
              active
                ? "text-neutral-900"
                : "text-neutral-400 hover:text-neutral-600",
            )}
            onClick={() => {
              userPickedSpeedRef.current = true
              setPlaybackRate(rate)
            }}
          >
            {rate === 1 ? "1x" : "0.5x"}
          </button>
        )
      })}
    </div>
  ) : null

  const media = (
    <>
      <video
        ref={videoRef}
        className="absolute-full rounded-xl"
        muted
        preload="auto"
        x-webkit-airplay="true"
        webkit-playsinline="true"
        playsInline
        loop={!clipped && !speedToggle}
        src={src}
        onLoadedMetadata={cue}
        onTimeUpdate={handleTimeUpdate}
        onEnded={clipped || speedToggle ? handleEnded : undefined}
        style={{
          clipPath: `inset(${clipInset} round 12px)`,
        }}
      />
      <div
        ref={coverRef}
        className="absolute-full hidden items-center justify-center font-medium text-sm text-neutral-500 bg-linear-to-bl from-white to-neutral-100 border border-sold border-neutral-200 cursor-pointer rounded-xl opacity-95 backdrop-blur-xl"
        onClick={() => {
          const video = videoRef.current
          if (!video) return
          applyRate(video)
          video.play()
          coverRef.current!.style.display = "none"
        }}
      >
        <svg className="size-4 mr-1" viewBox="0 0 24 24">
          <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
            <path d="M11.075 7.508c-1.329-.784-2.825.283-2.825 1.705v5.574c0 1.422 1.496 2.489 2.825 1.705l4.72-2.787c1.273-.752 1.273-2.658 0-3.41zM9.75 9.213c0-.198.096-.337.21-.408a.323.323 0 0 1 .352-.005l4.72 2.787a.465.465 0 0 1 .218.413a.465.465 0 0 1-.218.413l-4.72 2.787a.323.323 0 0 1-.353-.005a.467.467 0 0 1-.209-.408z" />
            <path d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0" />
          </g>
        </svg>
        播放视频
      </div>
    </>
  )

  const caption = note ? (
    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-neutral-400 whitespace-nowrap">
      {note}
    </div>
  ) : null

  if (speedToggle) {
    return (
      <div className="relative mb-12">
        <DemoBox
          ref={ref}
          className={cn(
            "flex flex-col items-center justify-center overflow-hidden pt-10 pb-6",
            className,
          )}
        >
          {speedControl}
          <div
            className={cn(
              "relative w-[420px] sm:w-[480px] max-w-full",
              aspectClassName,
            )}
          >
            {media}
          </div>
          {note ? (
            <div className="mt-4 text-sm text-neutral-500">{note}</div>
          ) : null}
        </DemoBox>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative mt-4 mb-12 mx-auto max-w-full",
        aspectClassName,
        className,
      )}
    >
      {media}
      {caption}
    </div>
  )
}

export default ReviewDemo
