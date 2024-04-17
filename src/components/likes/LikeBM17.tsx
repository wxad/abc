import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: {}) => {
  const video1Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(video1Ref.current)
  }, [])

  return (
    <DemoBox className="py-8 text-center">
      <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
        <div>
          <video
            className="w-[300px] outline -outline-offset-8 outline-8 outline-white overflow-hidden rounded-xl"
            ref={video1Ref}
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            muted
            loop
          >
            <source
              src="https://wxa.wxs.qq.com/wxad-design/yijie/bm17-heart-com.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
