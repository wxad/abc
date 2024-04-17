import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: {}) => {
  const video1Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    video1Ref.current.playbackRate = 0.5
    playVideo(video1Ref.current)
  }, [])

  return (
    <DemoBox className="py-10 text-center">
      <div className="flex items-center justify-center gap-4">
        <video
          className="w-1/3 outline -outline-offset-2 outline-2 outline-neutral-200 overflow-hidden rounded-xl"
          ref={video1Ref}
          preload="auto"
          x-webkit-airplay="true"
          webkit-playsinline="true"
          playsInline
          muted
          loop
        >
          <source
            src="https://wxa.wxs.qq.com/wxad-design/yijie/2023-bmy-0.mp4"
            type="video/mp4"
          />
        </video>
        <img
          className="w-1/3 outline -outline-offset-2 outline-2 outline-neutral-200 overflow-hidden rounded-xl"
          src="https://wxa.wxs.qq.com/wxad-design/yijie/2023-bmy-mask.webp"
          alt=""
        />
      </div>
    </DemoBox>
  )
}

export default Demo
