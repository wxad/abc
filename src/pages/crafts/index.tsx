/**
 * 1. 读取 src/crafts 目录下的所有文件
 * 2. 读取每个文件夹下的 index.json 文件，将其内容作为数据源
 * 3. 每个文件夹下可能是 index.png 或者 index.mp4，如果是 index.mp4 则走 ffmpeg 逻辑压缩、首帧等，如果是 index.png 则压缩图片
 */

import fs from "fs"
import path from "path"
import ffmpeg from "fluent-ffmpeg"
import sharp from "sharp"

import { useCallback, useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"
import NextLink from "next/link"
import DynamicArtDots from "@/components/DynamicArtDots"
import CraftFooter from "./CraftFooter"
import { playVideo } from "@/lib/utils"

interface DataSource {
  title: string
  tag: string
  date: string
  link: string
  aspectRatio: number
  mediaWidth: number
  mediaHeight: number
  imageUrl?: string
  videoUrl?: string
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
        const imagePath = path.join(craftsDir, dir, "index.png")
        const videoPath = path.join(craftsDir, dir, "index.mp4")
        const outputVideoPath = path.join("public", "crafts", dir, "index.mp4")

        // 读取 json，将整个 json 返回
        const json = JSON.parse(await fs.promises.readFile(jsonPath, "utf8"))

        // 创建输出目录
        const posterPath = path.join("public", "crafts", dir, "poster.png")
        const posterDir = path.dirname(posterPath)
        await fs.promises.mkdir(posterDir, { recursive: true })

        // 判断是否存在 index.png
        if (fs.existsSync(imagePath)) {
          const { width: mediaWidth, height: mediaHeight } = await sharp(
            imagePath
          ).metadata()

          const aspectRatio = mediaWidth / mediaHeight

          // 如果不存在 posterPath 或 index.png，再执行 sharp
          if (!fs.existsSync(posterPath)) {
            // 生成 25x 的小图
            await sharp(imagePath).resize(25, null).toFile(posterPath)

            // 压缩原图
            await sharp(imagePath)
              .resize(500)
              .toFile(path.join("public", "crafts", dir, "index.png"))
          }

          return {
            ...json,
            aspectRatio,
            mediaWidth,
            mediaHeight,
            imageUrl: `crafts/${dir}/index.png`,
            posterUrl: `crafts/${dir}/poster.png`,
          }
        } else {
          // 读取 video 的宽高，将宽高添加到 json 中
          const command = ffmpeg(videoPath)
          const { mediaWidth, mediaHeight } = await new Promise<{
            mediaWidth: number
            mediaHeight: number
          }>((resolve, reject) => {
            command.ffprobe((err, data) => {
              if (err) {
                reject(err)
              } else {
                resolve({
                  mediaWidth: data.streams[0]?.width || data.streams[1]?.width,
                  mediaHeight:
                    data.streams[0]?.height || data.streams[1]?.height,
                })
              }
            })
          })

          const aspectRatio = mediaWidth / mediaHeight
          // 如果不存在 index.mp4，则执行 ffmpeg
          if (!fs.existsSync(outputVideoPath)) {
            // 使用 fluent-ffmpeg 导出首帧作为 poster 图片
            await new Promise<void>((resolve, reject) => {
              ffmpeg(videoPath)
                .screenshots({
                  count: 1,
                  filename: "poster.png",
                  folder: posterDir,
                  size: "500x?",
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
          }
          return {
            ...json,
            aspectRatio,
            mediaWidth,
            mediaHeight,
            videoUrl: `crafts/${dir}/index.mp4`,
            posterUrl: `crafts/${dir}/poster.png`,
          }
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
    const handleDone = () => {
      if (posterRef.current) {
        posterRef.current.style.opacity = "0"
      }
    }

    if (inView) {
      if (item.videoUrl) {
        playVideo(videoRef.current, handleDone)
      }
    } else {
      videoRef.current?.pause()
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative p-1 border border-solid border-neutral-200 rounded-lg overflow-hidden"
    >
      <div
        className="relative rounded-md overflow-hidden"
        style={{
          aspectRatio: `${item.aspectRatio}`,
        }}
      >
        {item.videoUrl ? (
          <>
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
              className="absolute-full object-cover"
              src={item.posterUrl}
            />
          </>
        ) : (
          <img
            className="block w-full h-auto object-cover"
            src={item.imageUrl}
          />
        )}
        <div
          className="absolute left-0 bottom-0 w-full h-8"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0), 50%, rgba(0, 0, 0, 0.5))",
          }}
        />
        <div className="absolute bottom-0 left-0 w-full p-2 flex items-center justify-between text-white text-xs">
          <div className="font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {item.title}
          </div>
          <div className="ml-1 opacity-60 flex-none">{item.date}</div>
        </div>
      </div>
      <NextLink
        href={item.link}
        target="_blank"
        className="flex items-center justify-center mt-1 h-8 font-medium bg-neutral-200 bg-opacity-50 backdrop-blur-sm transition-all hover:bg-opacity-100 rounded-md cursor-pointer"
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
  // 现在 dataSource 里的每一个对象已经存在 aspectRatio, mediaWidth, mediaHeight 这三个字段了。我们可以根据这三个字段来计算每一个视频的高度，并最终得到三列 columns
  // 注意使用 useCallback
  const columns = useCallback(() => {
    const generateColumns = (dataSource: DataSource[], colNum: number) => {
      const columns: DataSource[][] = Array.from({ length: colNum }, () => [])
      let heights = Array.from({ length: colNum }, () => 0)

      dataSource.forEach((item) => {
        const minHeight = Math.min(...heights)
        const minIndex = heights.indexOf(minHeight)
        const height = 320 / item.aspectRatio
        columns[minIndex].push(item)
        heights[minIndex] += height
      })

      return columns
    }

    const dataSourceGeneratives = dataSource.filter(
      (item) => item.tag === "generative"
    )
    const dataSourceCrafts = dataSource.filter((item) => item.tag === "craft")

    const generativeColumns2 = generateColumns(dataSourceGeneratives, 2)
    const generativeColumns3 = generateColumns(dataSourceGeneratives, 3)
    const generativeColumns4 = generateColumns(dataSourceGeneratives, 4)

    const craftsColumns2 = generateColumns(dataSourceCrafts, 2)
    const craftsColumns3 = generateColumns(dataSourceCrafts, 3)
    const craftsColumns4 = generateColumns(dataSourceCrafts, 4)

    return {
      generativeColumns2,
      generativeColumns3,
      generativeColumns4,
      craftsColumns2,
      craftsColumns3,
      craftsColumns4,
    }
  }, [dataSource])()

  const getCurrentColumns = () => {
    if (typeof window === undefined) {
      return
    }
    const width = window.innerWidth
    if (width > 1024) {
      return {
        generative: columns.generativeColumns4,
        crafts: columns.craftsColumns4,
      }
    } else if (width > 500) {
      return {
        generative: columns.generativeColumns3,
        crafts: columns.craftsColumns3,
      }
    } else {
      return {
        generative: columns.generativeColumns2,
        crafts: columns.craftsColumns2,
      }
    }
  }

  const [currentColumns, setCurrentColumns] = useState({
    generative: [] as DataSource[][],
    crafts: [] as DataSource[][],
  })

  useEffect(() => {
    if (typeof window === undefined) {
      return
    }
    const handleResize = () => {
      setCurrentColumns(getCurrentColumns())
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="mt-40 mb-16 text-5xl text-center font-semibold font-serif">
        Crafts
      </div>
      <div className="flex gap-2 p-2">
        {currentColumns.crafts.map((column, i) => (
          <div key={i} className="flex-1 flex flex-col gap-2">
            {column.map((item) => (
              <CraftItem key={item.link} item={item} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-40 mb-16 text-5xl text-center font-semibold font-serif">
        CSS Generatives
      </div>
      <div className="flex gap-2 p-2">
        {currentColumns.generative.map((column, i) => (
          <div key={i} className="flex-1 flex flex-col gap-2">
            {column.map((item) => (
              <CraftItem key={item.link} item={item} />
            ))}
          </div>
        ))}
      </div>
      <CraftFooter />
      {/* <DynamicArtDots /> */}
    </>
  )
}

export default Page
