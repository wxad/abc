import DemoBox from "@/components/DemoBox"
import { useCallback, useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "react-intersection-observer-hook"

const FRAME_W = 1920
const FRAME_H = 1080

const CLOCK_R = 247
const IMG_GAP = 174
const IMG_SIZE = 190
const BORDER_RADIUS = 4
const TRAIL_DURATION = 2
const SPAWN_INTERVAL = 180
const SCALE_MIN = 0.7
const CLOCK_SPEED = 8
const INIT_HOUR = 12
const INIT_MINUTE = 12
const FLIP_BOTTOM = true
const HOUR_COLOR = "#1a1a2e"
const MINUTE_COLOR = "#c1c1c1"
const SECOND_COLOR = "#1EF468"
const HOUR_WIDTH = 7
const MINUTE_WIDTH = 5
const SECOND_WIDTH = 3.5
const HOUR_LEN = 0.5
const MINUTE_LEN = 0.9
const SECOND_LEN = 0.9

type TrailEntry = {
  id: number
  angle: number
  url: string
  born: number
}

/** 与 Sites/wxad12 public/team-photos 同一套 mock，不请求真实照片 CDN */
const PHOTOS = [
  "/abc/wxad12/team-photos/微信广告设计组-大合照.png",
  "/abc/wxad12/team-photos/微信广告设计组01.png",
  "/abc/wxad12/team-photos/微信广告设计组02.png",
  "/abc/wxad12/team-photos/微信广告设计组03.png",
  "/abc/wxad12/team-photos/微信广告设计组04.png",
  "/abc/wxad12/team-photos/微信广告设计组05.png",
  "/abc/wxad12/team-photos/微信广告设计组06.png",
  "/abc/wxad12/team-photos/微信广告设计组07.png",
  "/abc/wxad12/team-photos/微信广告设计组08.png",
  "/abc/wxad12/team-photos/微信广告设计组09.png",
].map((src) => encodeURI(src))

function getAngles(virtualMs: number) {
  const totalSec = virtualMs / 1000
  const s = totalSec % 60
  const m = (totalSec / 60) % 60
  const h = (totalSec / 3600) % 12
  return {
    s: (s / 60) * 360,
    m: (m / 60) * 360,
    h: (h / 12) * 360,
  }
}

function toRad(deg: number) {
  return ((deg - 90) * Math.PI) / 180
}

const INIT_VIRTUAL_MS = (INIT_HOUR * 3600 + INIT_MINUTE * 60) * 1000

const Wxad12PhotoClock = () => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [angles, setAngles] = useState(() => getAngles(INIT_VIRTUAL_MS))
  const trailRef = useRef<TrailEntry[]>([])
  const photoIdxRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const rafRef = useRef(0)
  const virtualTimeRef = useRef(INIT_VIRTUAL_MS)
  const lastRealRef = useRef(0)

  const [rootRef, { entry }] = useIntersectionObserver({ threshold: 0.2 })
  const inView = entry?.isIntersecting

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const measure = () => setScale(host.clientWidth / FRAME_W)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || ready) return
    let loaded = 0
    let cancelled = false
    PHOTOS.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        if (cancelled) return
        loaded += 1
        setProgress(Math.round((loaded / PHOTOS.length) * 100))
        if (loaded === PHOTOS.length) setReady(true)
      }
      img.src = src
    })
    return () => {
      cancelled = true
    }
  }, [inView, ready])

  const tick = useCallback(() => {
    const realNow = Date.now()
    if (!lastRealRef.current) lastRealRef.current = realNow
    const delta = realNow - lastRealRef.current
    lastRealRef.current = realNow

    virtualTimeRef.current += delta * CLOCK_SPEED
    const nextAngles = getAngles(virtualTimeRef.current)
    const trailMs = TRAIL_DURATION * 1000

    if (realNow - lastSpawnRef.current > SPAWN_INTERVAL) {
      lastSpawnRef.current = realNow
      const index = photoIdxRef.current % PHOTOS.length
      photoIdxRef.current += 1
      trailRef.current = [
        ...trailRef.current.filter((item) => realNow - item.born < trailMs + 800),
        {
          id: realNow + Math.random(),
          angle: nextAngles.s,
          url: PHOTOS[index],
          born: realNow,
        },
      ]
    }

    setAngles(nextAngles)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (!inView || !ready) {
      cancelAnimationFrame(rafRef.current)
      lastRealRef.current = 0
      return
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, ready, tick])

  const imgDist = CLOCK_R + IMG_GAP
  const center = CLOCK_R + 60
  const size = CLOCK_R * 2 + 120
  const now = Date.now()
  const trailMs = TRAIL_DURATION * 1000

  return (
    <DemoBox ref={rootRef} className="overflow-hidden p-0">
      <div ref={hostRef} className="relative aspect-[1920/1080] w-full overflow-hidden">
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{
            width: FRAME_W,
            height: FRAME_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              {trailRef.current.map((item) => {
                const age = (now - item.born) / trailMs
                const opacity = Math.max(0, 1 - age ** 3)
                const itemScale = SCALE_MIN + (1 - SCALE_MIN) * Math.max(0, 1 - age)
                const rad = toRad(item.angle)
                const x = center + imgDist * Math.cos(rad)
                const y = center + imgDist * Math.sin(rad)
                const flipped = FLIP_BOTTOM && item.angle > 90 && item.angle < 270
                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      width: IMG_SIZE,
                      height: IMG_SIZE,
                      left: x - IMG_SIZE / 2,
                      top: y - IMG_SIZE / 2,
                      opacity,
                      transform: `rotate(${item.angle + (flipped ? 180 : 0)}deg) scale(${itemScale})`,
                      transformOrigin: "center center",
                      borderRadius: BORDER_RADIUS,
                      overflow: "hidden",
                      zIndex: Math.round(item.born / 1000),
                    }}
                  >
                    <img src={item.url} alt="" className="block h-full w-full object-contain" />
                  </div>
                )
              })}

              <svg className="absolute inset-0 overflow-visible" width={size} height={size}>
                <line
                  x1={center}
                  y1={center}
                  x2={center + Math.cos(toRad(angles.h)) * CLOCK_R * HOUR_LEN}
                  y2={center + Math.sin(toRad(angles.h)) * CLOCK_R * HOUR_LEN}
                  stroke={HOUR_COLOR}
                  strokeWidth={HOUR_WIDTH}
                  strokeLinecap="round"
                />
                <line
                  x1={center}
                  y1={center}
                  x2={center + Math.cos(toRad(angles.m)) * CLOCK_R * MINUTE_LEN}
                  y2={center + Math.sin(toRad(angles.m)) * CLOCK_R * MINUTE_LEN}
                  stroke={MINUTE_COLOR}
                  strokeWidth={MINUTE_WIDTH}
                  strokeLinecap="round"
                />
                <line
                  x1={center}
                  y1={center}
                  x2={center + Math.cos(toRad(angles.s)) * imgDist * SECOND_LEN}
                  y2={center + Math.sin(toRad(angles.s)) * imgDist * SECOND_LEN}
                  stroke={SECOND_COLOR}
                  strokeWidth={SECOND_WIDTH}
                  strokeLinecap="round"
                />
                <circle cx={center} cy={center} r={HOUR_WIDTH * 1.6} fill={HOUR_COLOR} />
                <circle cx={center} cy={center} r={HOUR_WIDTH * 0.7} fill={SECOND_COLOR} />
              </svg>
            </div>
          </div>

          {!ready && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5">
              <div className="h-0.5 w-[200px] overflow-hidden rounded-sm bg-neutral-100">
                <div className="h-full bg-neutral-900" style={{ width: `${progress}%` }} />
              </div>
              <span className="font-mono text-xs text-neutral-300">
                正在加载图片 {Math.round((progress * PHOTOS.length) / 100)} / {PHOTOS.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </DemoBox>
  )
}

export default Wxad12PhotoClock
