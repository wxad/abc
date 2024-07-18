import { useEffect, useRef, useState } from "react"
import { Pane } from "tweakpane"
import DemoBox from "../DemoBox"

const Demo = () => {
  const paneWrapper = useRef<HTMLDivElement | null>(null)
  const paneRef = useRef<Pane | null>(null)
  const [show, setShow] = useState(false)
  const [adder, setAdder] = useState(0)
  const interval = useRef(0)
  const [params, setParams] = useState({
    duration: 800,
  })

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setShow((prev) => !prev)
      setAdder((prev) => prev + 1)
    }, 3000)

    paneRef.current = new Pane({
      container: paneWrapper.current,
    })

    paneRef.current.on("change", (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.label]: ev.value,
      }))
    })

    paneRef.current.addBinding(params, "duration", {
      min: 200,
      max: 1000,
      step: 100,
    })

    return () => {
      clearInterval(interval.current)

      if (paneRef.current) {
        paneRef.current.dispose()
      }
    }
  }, [])

  return (
    <DemoBox className="flex justify-center items-center py-12">
      <div className="relative mx-auto w-[100px] h-[100px]">
        <svg
          className={`absolute top-2 right-[-28px] ${
            show
              ? "opacity-100 scale-100 transition-all duration-500"
              : "opacity-0 scale-60"
          }`}
          width="94"
          height="90"
          viewBox="0 0 94 90"
        >
          <path
            d="M58.7239 13.3581C57.8223 -1.2446 44.4143 -2.98238 29.073 4.36403C-3.04944 19.7463 -1.6751 53.8767 3.48133 56.0357C-1.10077 69.8742 39.3248 97.2242 53.1165 87.3991C85.3553 96.1342 122.208 26.5371 58.7239 13.3581Z"
            fill="#FFF16F"
          />
        </svg>
        <div
          className={`absolute-full ${show ? "opacity-100" : "opacity-0"}`}
          style={{
            maskImage: show
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='${adder}' viewBox='0 0 102.38 90.76'%3E%3Cstyle type='text/css'%3E %23avatarPath %7B animation: apa ${params.duration}ms ease both; %7D @keyframes apa %7B from %7B stroke-dashoffset: 272.5561828613281; %7D to %7B stroke-dashoffset: 0; %7D %7D %3C/style%3E%3Cpath id='avatarPath' d='M18.69 39.27s-2.5-10.3 9.9-11.5 11.3 13.3 6 12 13.2-23.7 26.9-22.2S69 58.87 56 54.17s20-16.9 25.8-5.6 3 13.1-4.7 16.3-21.1 2.3-28.9 3.4S39 74 29.69 73.17s-17.9-6.9-7.3-19.1l-3.4-13' style='fill: none; stroke: %232bd97e; stroke-linecap: round; stroke-linejoin: round; stroke-width: 35px; stroke-dasharray: 272.5561828613281 272.5561828613281; ' /%3E%3C/svg%3E")`
              : "",
            maskSize: "100% 100%",
            backgroundImage:
              "url(https://wxa.wxs.qq.com/wxad-design/yijie/aragakey-avatar.webp)",
            backgroundSize: "100% 100%",
          }}
        />
      </div>
      <div ref={paneWrapper} className="absolute top-[4px] right-[4px]" />
    </DemoBox>
  )
}

export default Demo
