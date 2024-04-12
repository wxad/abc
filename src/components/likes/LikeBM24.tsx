import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { A } from "../MdxComponents"

const Demo = (props: {}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(videoRef.current)
  }, [])

  return (
    <DemoBox className="py-10 text-center">
      <video
        ref={videoRef}
        preload="auto"
        x-webkit-airplay="true"
        webkit-playsinline="true"
        playsInline
        muted
        loop
        className="absolute-full"
      >
        <source
          src="https://wxa.wxs.qq.com/wxad-design/yijie/anta-webo-tester.mp4"
          type="video/mp4"
        />
      </video>
    </DemoBox>
  )
}

export default Demo
