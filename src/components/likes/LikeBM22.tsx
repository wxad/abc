import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: {}) => {
  const video1Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(video1Ref.current)
  }, [])

  return (
    <DemoBox className="pb-8 text-center">
      <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          *投票与阿心 lottie 动画均由其他项目成员完成。
        </div>
        <div>
          <video
            className="w-[300px] outline -outline-offset-4 outline-4 outline-white overflow-hidden rounded-xl mix-blend-darken"
            ref={video1Ref}
            preload="auto"
            x-webkit-airplay="true"
            webkit-playsinline="true"
            playsInline
            muted
            loop
          >
            <source
              src="https://wxa.wxs.qq.com/wxad-design/yijie/bm22-heart.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
