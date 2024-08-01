import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: {}) => {
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const video3Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(video1Ref.current)
    playVideo(video2Ref.current)
    playVideo(video3Ref.current)
  }, [])

  return (
    <DemoBox className="py-10 text-center">
      <div className="flex items-center justify-center text-xs text-neutral-400">
        <div>
          <div className="relative w-32 h-32 overflow-hidden rounded-xl mix-blend-darken">
            <video
              className="absolute-full"
              ref={video1Ref}
              preload="auto"
              x-webkit-airplay="true"
              webkit-playsinline="true"
              playsInline
              muted
              loop
            >
              <source
                src="https://wxa.wxs.qq.com/wxad-design/yijie/bm-24version-green-un.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute-full border-4 border-white" />
          </div>
          背景有延时
        </div>
        <div>
          <div className="relative w-32 h-32 overflow-hidden rounded-xl mix-blend-darken">
            <video
              className="absolute-full"
              ref={video2Ref}
              preload="auto"
              x-webkit-airplay="true"
              webkit-playsinline="true"
              playsInline
              muted
              loop
            >
              <source
                src="https://wxa.wxs.qq.com/wxad-design/yijie/bm-24version-no-animate.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute-full border-4 border-white" />
          </div>
          背景无延时
        </div>
        <div>
          <div className="relative w-32 h-32 overflow-hidden rounded-xl mix-blend-darken">
            <video
              className="absolute-full"
              ref={video3Ref}
              preload="auto"
              x-webkit-airplay="true"
              webkit-playsinline="true"
              playsInline
              muted
              loop
            >
              <source
                src="https://wxa.wxs.qq.com/wxad-design/yijie/bm-24version-hearts.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute-full border-4 border-white" />
          </div>
          底层爱心
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
