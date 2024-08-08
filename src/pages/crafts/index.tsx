import fs from "fs"
import path from "path"
import ffmpeg from "fluent-ffmpeg"

import { useCallback, useEffect, useRef } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"
import NextLink from "next/link"
import DynamicArtDots from "@/components/DynamicArtDots"
import CraftFooter from "./CraftFooter"
import { playVideo } from "@/lib/utils"

interface DataSource {
  title: string
  date: string
  link: string
  aspectRatio: number
  videoWidth: number
  videoHeight: number
  videoUrl: string
  posterUrl: string
}

interface IPageProps {
  dataSource: DataSource[]
}

export async function getStaticProps() {
  const craftsDir = path.join(process.cwd(), "src", "crafts")
  const craftDirs = await fs.promises.readdir(craftsDir)

  const dataSource: DataSource[] = await Promise.all(
    craftDirs
      .filter((dir) => dir !== ".DS_Store")
      .map(async (dir) => {
        const jsonPath = path.join(craftsDir, dir, "index.json")
        const videoPath = path.join(craftsDir, dir, "index.mp4")
        const outputVideoPath = path.join("public", "crafts", dir, "index.mp4")

        // 读取 json，将整个 json 返回
        const json = JSON.parse(await fs.promises.readFile(jsonPath, "utf8"))

        // 读取 video 的宽高，将宽高添加到 json 中
        const command = ffmpeg(videoPath)
        const { videoWidth, videoHeight } = await new Promise<{
          videoWidth: number
          videoHeight: number
        }>((resolve, reject) => {
          command.ffprobe((err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve({
                videoWidth: data.streams[0]?.width || data.streams[1]?.width,
                videoHeight: data.streams[0]?.height || data.streams[1]?.height,
              })
            }
          })
        })

        const aspectRatio = videoWidth / videoHeight
        const posterPath = path.join("public", "crafts", dir, "index.png")

        // 创建输出目录
        const posterDir = path.dirname(posterPath)
        await fs.promises.mkdir(posterDir, { recursive: true })

        // 使用 fluent-ffmpeg 导出首帧作为 poster 图片
        await new Promise<void>((resolve, reject) => {
          ffmpeg(videoPath)
            .screenshots({
              count: 1,
              filename: "index.png",
              folder: posterDir,
              size: "25x?",
            })
            .on("end", () => {
              resolve()
            })
            .on("error", (err) => {
              reject(err)
            })
        })

        // 压缩视频并输出到 public 目录
        await new Promise<void>((resolve, reject) => {
          ffmpeg(videoPath)
            .output(outputVideoPath)
            .videoCodec("libx264")
            .audioCodec("aac")
            .audioBitrate("128k")
            .videoBitrate("1000k")
            .size("720x?")
            .on("end", () => {
              resolve()
            })
            .on("error", (err) => {
              reject(err)
            })
            .run()
        })

        return {
          ...json,
          aspectRatio,
          videoWidth,
          videoHeight,
          videoUrl: `crafts/${dir}/index.mp4`,
          posterUrl: `crafts/${dir}/index.png`,
        }
      })
  )

  const dataSourceOrdered = dataSource.sort((a, b) =>
    a.date > b.date ? -1 : 1
  )

  return {
    props: {
      dataSource: dataSourceOrdered,
    },
  }
}

const CraftItem = ({ item }: { item: DataSource }) => {
  const [ref, { entry }] = useIntersectionObserver({
    threshold: 0,
  })
  const inView = entry?.isIntersecting
  const videoRef = useRef<HTMLVideoElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (inView) {
      playVideo(videoRef.current, () => {
        if (posterRef.current) {
          posterRef.current.style.opacity = "0"
        }
      })
    } else {
      videoRef.current?.pause()
    }
  }, [inView])

  return (
    <div ref={ref} className="relative p-1 border border-solid border-neutral-200 rounded-lg overflow-hidden">
      <div className="relative rounded-md overflow-hidden" style={{
        aspectRatio: `${item.aspectRatio}`,
      }}>
        <video
          ref={videoRef}
          className="block w-full h-auto object-cover"
          src={item.videoUrl}
          preload="none"
          x-webkit-airplay="true"
          webkit-playsinline="true"
          playsInline
          muted
          loop
        />
        <img
          ref={posterRef}
          className="absolute-full object-cover blur"
          src={item.posterUrl}
        />
        <div
          className="absolute left-0 bottom-0 w-full h-12"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0), 50%, rgba(0, 0, 0, 0.5))",
          }}
        />
        <div className="absolute bottom-0 left-0 w-full p-4 flex items-center justify-between text-white text-xs">
          <div className="font-medium">{item.title}</div>
          <div className="opacity-60">{item.date}</div>
        </div>
      </div>
      <NextLink
        href={item.link}
        target="_blank"
        className="flex items-center justify-center mt-1 h-8 font-medium bg-neutral-200 bg-opacity-50 backdrop-blur-sm transition-all hover:bg-opacity-80 rounded-md cursor-pointer"
      >
        {item.link.startsWith("http") ? "跳转查看" : "阅读文章"}
        <svg
          className={`ml-1 w-4 ${
            item.link.startsWith("http") ? "-rotate-45" : ""
          }`}
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          color="currentColor"
        >
          <path
            d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NextLink>
    </div>
  )
}

const Page: React.FC<IPageProps> = ({ dataSource }) => {
  // 这个页面是一个瀑布流的布局。每一项是一个视频。瀑布流的实现方式是以三列栅格的方式呈现。通过预先计算视频的高度，然后依次分配到三列里去。
  // 现在 dataSource 里的每一个对象已经存在 aspectRatio、videoWidth、videoHeight 这三个字段了。我们可以根据这三个字段来计算每一个视频的高度，并最终得到三列 columns
  // 注意使用 useCallback
  const columns = useCallback(() => {
    const columns: DataSource[][] = [[], [], []]
    let heights = [0, 0, 0]

    dataSource.forEach((item) => {
      const minHeight = Math.min(...heights)
      const minIndex = heights.indexOf(minHeight)
      const height = 320 / item.aspectRatio
      columns[minIndex].push(item)
      heights[minIndex] += height
    })

    return columns
  }, [dataSource])()

  return (
    <>
      <div className="flex gap-2 p-2">
        {/* <div className="mt-16 mb-4 text-5xl font-semibold font-sans">
          CSS Generatives
        </div> */}
        {columns.map((column, i) => (
          <div key={i} className="flex-1 flex flex-col gap-2">
            {column.map((item, j) => (
              <CraftItem key={j} item={item} />
            ))}
          </div>
        ))}
      </div>
      <CraftFooter />
      <DynamicArtDots />
    </>
  )
}

export default Page
