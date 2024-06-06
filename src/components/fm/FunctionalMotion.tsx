import DemoBox from "@/components/DemoBox"
import { playVideo } from "@/lib/utils"
import { useEffect, useRef } from "react"

const Demo = (props: {}) => {
  const video1Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    playVideo(video1Ref.current)
  }, [])

  return (
    <video
      className="block my-8 w-full outline -outline-offset-8 outline-8 outline-white overflow-hidden rounded-xl"
      ref={video1Ref}
      preload="auto"
      x-webkit-airplay="true"
      webkit-playsinline="true"
      playsInline
      muted
      loop
    >
      <source
        src="https://wxa.wxs.qq.com/wxad-design/yijie/fm_aragakey.mp4"
        type="video/mp4"
      />
    </video>
  )
}

export default Demo
