import { useEffect, useRef } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

const Demo = () => {
  const videoRef0 = useRef<HTMLVideoElement>(null)
  const coverRef0 = useRef<HTMLDivElement>(null)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const coverRef1 = useRef<HTMLDivElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const coverRef2 = useRef<HTMLDivElement>(null)
  const videoRef3 = useRef<HTMLVideoElement>(null)
  const coverRef3 = useRef<HTMLDivElement>(null)

  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting

  const playVideo0 = () => {
    videoRef0.current!.play().catch((error) => {
      // 如果自动播放失败，显示封面
      coverRef0.current.style.display = "flex"
    })
  }

  const playVideo1 = () => {
    videoRef1.current!.play().catch((error) => {
      // 如果自动播放失败，显示封面
      coverRef1.current.style.display = "flex"
    })
  }

  const playVideo2 = () => {
    videoRef2.current!.play().catch((error) => {
      // 如果自动播放失败，显示封面
      coverRef2.current.style.display = "flex"
    })
  }

  const playVideo3 = () => {
    videoRef3.current!.play().catch((error) => {
      // 如果自动播放失败，显示封面
      coverRef3.current.style.display = "flex"
    })
  }

  const handleTimeUpdate0 = () => {
    coverRef0.current.style.display = "none"
  }

  const handleTimeUpdate1 = () => {
    coverRef1.current.style.display = "none"
  }

  const handleTimeUpdate2 = () => {
    coverRef2.current.style.display = "none"
  }

  const handleTimeUpdate3 = () => {
    coverRef3.current.style.display = "none"
  }

  useEffect(() => {
    if (inView) {
      playVideo0()
      playVideo1()
      playVideo2()
      playVideo3()
    } else {
      videoRef0.current?.pause()
      videoRef1.current?.pause()
      videoRef2.current?.pause()
      videoRef3.current?.pause()
    }
  }, [inView])

  return (
    <>
      <div className="relative grid grid-cols-2 md:grid-cols-4 mt-8 mb-12 gap-3">
        <div
          ref={ref}
          className="relative w-full aspect-390/844 rounded-xl overflow-hidden"
        >
          <video
            ref={videoRef0}
            className="absolute-full"
            muted
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            loop
            crossOrigin="anonymous"
            onTimeUpdate={handleTimeUpdate0}
            src="/abc/figma-make/figma-carousel.mp4"
          />
          <div
            ref={coverRef0}
            className="absolute-full hidden items-center justify-center font-medium text-sm text-neutral-500 bg-linear-to-bl from-white to-neutral-100 border border-sold border-neutral-200 cursor-pointer rounded-xl opacity-95 backdrop-blur-xl"
            onClick={() => {
              videoRef0.current?.play()
              coverRef0.current.style.display = "none"
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
        </div>
        <div className="relative w-full aspect-390/844 rounded-xl overflow-hidden">
          <video
            ref={videoRef1}
            className="absolute-full"
            muted
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            loop
            crossOrigin="anonymous"
            src="/abc/figma-make/figma-topic.mp4"
            onTimeUpdate={handleTimeUpdate1}
          />
          <div
            ref={coverRef1}
            className="absolute-full hidden items-center justify-center font-medium text-sm text-neutral-500 bg-linear-to-bl from-white to-neutral-100 border border-sold border-neutral-200 cursor-pointer rounded-xl opacity-95 backdrop-blur-xl"
            onClick={() => {
              videoRef1.current?.play()
              coverRef1.current.style.display = "none"
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
        </div>
        <div className="relative w-full aspect-390/844 rounded-xl overflow-hidden">
          <video
            ref={videoRef2}
            className="absolute-full"
            muted
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            loop
            crossOrigin="anonymous"
            onTimeUpdate={handleTimeUpdate2}
            src="/abc/figma-make/figma-particle.mp4"
          />
          <div
            ref={coverRef2}
            className="absolute-full hidden items-center justify-center font-medium text-sm text-neutral-500 bg-linear-to-bl from-white to-neutral-100 border border-sold border-neutral-200 cursor-pointer rounded-xl opacity-95 backdrop-blur-xl"
            onClick={() => {
              videoRef2.current?.play()
              coverRef2.current.style.display = "none"
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
        </div>
        <div className="relative w-full aspect-390/844 rounded-xl overflow-hidden">
          <video
            ref={videoRef3}
            className="absolute-full"
            muted
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            loop
            crossOrigin="anonymous"
            src="/abc/figma-make/figma-cylinder.mp4"
            onTimeUpdate={handleTimeUpdate3}
          />
          <div
            ref={coverRef3}
            className="absolute-full hidden items-center justify-center font-medium text-sm text-neutral-500 bg-linear-to-bl from-white to-neutral-100 border border-sold border-neutral-200 cursor-pointer rounded-xl opacity-95 backdrop-blur-xl"
            onClick={() => {
              videoRef3.current?.play()
              coverRef3.current.style.display = "none"
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
        </div>
      </div>
    </>
  )
}

export default Demo
