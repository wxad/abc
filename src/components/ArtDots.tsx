"use client"

import { p5i } from "p5i"
import { useEffect, useRef } from "react"

const ArtDots = () => {
  const elRef = useRef<HTMLDivElement | null>(null)
  const existingPoints = useRef(new Set<string>())
  const points = useRef<{ x: number; y: number; opacity: number }[]>([])

  const w = window?.innerWidth
  const h = window?.innerHeight
  const offsetY = window?.scrollY

  const addPoints = () => {
    for (let x = -SPACING / 2; x < w + SPACING; x += SPACING) {
      for (let y = -SPACING / 2; y < h + offsetY + SPACING; y += SPACING) {
        const id = `${x}-${y}`
        if (existingPoints.current.has(id)) continue
        existingPoints.current.add(id)
        points.current.push({ x, y, opacity: Math.random() * 0.5 + 0.5 })
      }
    }
  }

  const {
  mount,
  unmount,
  createCanvas,
  background,
  noFill,
  stroke,
  noise,
  noiseSeed,
  resizeCanvas,
  cos,
  sin,
  TWO_PI,
} = p5i()

const SCALE = 200
const LENGTH = 10
const SPACING = 15

function getForceOnPoint(x: number, y: number, z: number) {
  // https://p5js.org/reference/#/p5/noise
  return (noise(x / SCALE, y / SCALE, z) - 0.5) * 2 * TWO_PI
}

  const setup = () => {
    createCanvas(w, h)
    background("#ffffff")
    stroke("#ccc")
    noFill()

    noiseSeed(+new Date())

    addPoints()
  }

  const draw = ({
    circle,
  }: {
    circle: (x: number, y: number, d: number) => void
  }) => {
    background("#ffffff")
    const t = +new Date() / 10000

    for (const p of points.current) {
      const { x, y } = p
      const rad = getForceOnPoint(x, y, t)
      const length = (noise(x / SCALE, y / SCALE, t * 2) + 0.5) * LENGTH
      const nx = x + cos(rad) * length
      const ny = y + sin(rad) * length
      stroke(200, 200, 200, (Math.abs(cos(rad)) * 0.8 + 0.2) * p.opacity * 255)
      circle(nx, ny - offsetY, 1)
    }
  }

  const restart = () => {
    if (elRef.current) mount(elRef.current, { setup, draw })
  }

  useEffect(() => {
    if (!window) {
      return
    }
    restart()

    const handleResize = () => {
      resizeCanvas(window.innerWidth, window.innerHeight)
      addPoints()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      unmount()
    }
  }, [])

  return (
    <div ref={elRef} className="fixed inset-0 pointer-events-none z-[-1]" />
  )
}

export default ArtDots
