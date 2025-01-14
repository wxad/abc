import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 tailwind ClassNames
 * @param inputs ClassValue[]
 * @returns string
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

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

export const playVideoWithCover = ({
  video,
  cover,
}: {
  video?: HTMLVideoElement | null
  cover?: HTMLDivElement | null
}) => {
  if (!video) {
    return
  }

  // 尝试自动播放视频
  const playVideo = () => {
    video.play().catch((error) => {
      console.log("[yijie]", error)
      // 如果自动播放失败，显示封面
      if (cover) {
        cover.style.display = "flex"
      }
    })
  }
  // 尝试自动播放
  playVideo()
  // 点击封面播放视频
  if (cover) {
    cover.addEventListener("click", () => {
      cover.style.display = "none" // 隐藏封面
      playVideo() // 播放视频
    })
  }
}
