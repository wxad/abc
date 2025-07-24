import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: { videoSrc: string; imgSrc: string }) => {
  const { videoSrc, imgSrc } = props

  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(video1Ref.current)
    playVideo(video2Ref.current)
  }, [])

  return (
    <DemoBox className="pb-12 pt-10 text-center">
      <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          *爱心 lottie 动画由其他项目成员完成。
        </div>
        <video
          className="w-1/3 outline-solid -outline-offset-2 outline-2 outline-neutral-200 overflow-hidden rounded-xl"
          ref={video1Ref}
          preload="auto"
          x-webkit-airplay="true"
          webkit-playsinline="true"
          playsInline
          muted
          loop
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <img
          className="w-1/3 outline-solid -outline-offset-2 outline-2 outline-neutral-200 overflow-hidden rounded-xl aspect-558/1080 object-cover"
          src={imgSrc}
          alt=""
        />
      </div>
    </DemoBox>
  )
}

export default Demo
