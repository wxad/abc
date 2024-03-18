export const steppedRange = (start: number, end: number, step: number) => {
  let arr = []
  for (let i = start; i <= end; i += step) {
    arr.push(i)
  }
  return arr
}

export const getId = (text: string) => {
  return text?.toLowerCase?.().replace(/\s/g, "-").replace(/\.|\?/g, "")
}

/**
 * 通用视频播放
 */
export const playVideo = (video?: HTMLVideoElement | null, cb?: () => void) => {
  if (video) {
    const timeupdate = () => {
      if (video.currentTime) {
        video.removeEventListener("timeupdate", timeupdate)
        if (cb) {
          cb()
        }
      }
    }
    video.addEventListener("timeupdate", timeupdate)
    if (video) {
      video.play()
    }
  }
}
