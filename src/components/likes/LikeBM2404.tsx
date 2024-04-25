import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: {}) => {
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(video1Ref.current)
    playVideo(video2Ref.current)
  }, [])

  return (
    <DemoBox className="py-10 text-center">
      <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
        <div>
          <div className="relative w-[150px] h-[150px] overflow-hidden rounded-xl mix-blend-darken">
            <video
              className="absolute-full"
              ref={video1Ref}
              preload="auto"
              x-webkit-airplay="true"
              webkit-playsinline="true"
              playsInline
              muted
              loop
              autoPlay
            >
              <source
                src="https://wxa.wxs.qq.com/wxad-design/yijie/bm-24version-green-un.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute-full border-4 border-white" />
          </div>
          朋友圈榜单
        </div>

        <div>
          <div className="relative w-[150px] h-[150px] overflow-hidden rounded-xl mix-blend-darken">
            <video
              className="absolute-full"
              ref={video2Ref}
              preload="auto"
              x-webkit-airplay="true"
              webkit-playsinline="true"
              playsInline
              muted
              loop
              autoPlay
            >
              <source
                src="https://wxa.wxs.qq.com/wxad-design/yijie/bm-24version-orange.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute-full border-4 border-white" />
          </div>
          视频号榜单
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
