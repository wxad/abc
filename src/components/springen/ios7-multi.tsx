import { useEffect, useRef } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

const Demo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)

  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting

  const playVideo = () => {
    videoRef.current!.play().catch((error) => {
      // 如果自动播放失败，显示封面
      coverRef.current.style.display = "flex"
    })
  }

  const handleTimeUpdate = () => {
    coverRef.current.style.display = "none"
  }

  useEffect(() => {
    if (inView) {
      playVideo()
    } else {
      videoRef.current?.pause()
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative mt-4 mb-12 mx-auto aspect-[3840/2140] mix-blend-multiply"
    >
      <video
        ref={videoRef}
        className="absolute-full rounded-xl"
        muted
        preload="auto"
        x-webkit-airplay="true"
        webkit-playsinline="true"
        playsInline
        loop
        crossOrigin="anonymous"
        src="/abc/springen/ios7-multi.mp4"
        onTimeUpdate={handleTimeUpdate}
      />
      <div
        ref={coverRef}
        className="absolute-full hidden items-center justify-center font-medium text-sm text-neutral-500 bg-linear-to-bl from-white to-neutral-100 border border-sold border-neutral-200 cursor-pointer rounded-xl opacity-95 backdrop-blur-xl"
        onClick={() => {
          videoRef.current?.play()
          coverRef.current.style.display = "none"
        }}
      >
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
          <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
            <path d="M11.075 7.508c-1.329-.784-2.825.283-2.825 1.705v5.574c0 1.422 1.496 2.489 2.825 1.705l4.72-2.787c1.273-.752 1.273-2.658 0-3.41zM9.75 9.213c0-.198.096-.337.21-.408a.323.323 0 0 1 .352-.005l4.72 2.787a.465.465 0 0 1 .218.413a.465.465 0 0 1-.218.413l-4.72 2.787a.323.323 0 0 1-.353-.005a.467.467 0 0 1-.209-.408z" />
            <path d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0" />
          </g>
        </svg>
        播放视频
      </div>
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-neutral-400 whitespace-nowrap">
        iOS 7 多任务处理
      </div>
    </div>
  )
}

export default Demo
