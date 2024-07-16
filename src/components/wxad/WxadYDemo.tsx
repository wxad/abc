import { animated, useSpring, to } from "@react-spring/web"
import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const NavigationMenu = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const interval = useRef(0)
  const activeRef = useRef(false)
  const [{ videoLevelTwoBase }, api] = useSpring(() => ({
    videoLevelTwoBase: 0,
    config: {
      tension: 280,
      friction: 60,
      precision: 0.0001,
      mass: 1,
      velocity: 0,
    },
  }))

  useEffect(() => {
    interval.current = window.setInterval(() => {
      api.start({
        videoLevelTwoBase: activeRef.current ? 0 : 1,
        onRest: () => {
          activeRef.current = !activeRef.current
        },
      })
    }, 3000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="flex flex-col md:flex-row items-center justify-center gap-8 py-16 overflow-hidden">
      <animated.div
        className="relative w-[150px] h-[200px]"
        style={{
          transform: to(
            [videoLevelTwoBase],
            (v) =>
              `translate3d(0, ${80 - 80 * v}px, 0) scale(${0.95 + 0.05 * v})`
          ),
          opacity: to([videoLevelTwoBase], (v) => v * 1.25),
        }}
      >
        <animated.div
          className="absolute-full"
          style={{
            transform: to(
              [videoLevelTwoBase],
              (v) => `scale(${1.25 - 0.25 * v})`
            ),
            clipPath: to([videoLevelTwoBase], (v) => {
              return `inset(${20 - v * 20}% round 12px)`
            }),
          }}
        >
          <img
            src="https://wxa.wxs.qq.com/wxad-design/yijie/dingbu-yijie.webp"
            className="absolute-full object-cover"
          />
        </animated.div>
      </animated.div>
      <animated.div
        className="relative w-[200px] h-[150px]"
        style={{
          transform: to(
            [videoLevelTwoBase],
            (v) =>
              `translate3d(0, ${80 - 80 * v}px, 0) scale(${0.95 + 0.05 * v})`
          ),
          opacity: to([videoLevelTwoBase], (v) => v * 1.25),
        }}
      >
        <animated.div
          className="absolute-full"
          style={{
            transform: to(
              [videoLevelTwoBase],
              (v) => `scale(${1.25 - 0.25 * v})`
            ),
            clipPath: to([videoLevelTwoBase], (v) => {
              return `inset(${20 - v * 20}% round 12px)`
            }),
          }}
        >
          <img
            src="https://wxsnsdythumb.wxs.qq.com/131/20204/snssvpdownload/SH/reserved/ads_svp_video__0b53kaag2aaa3uapdoumivrbuuaenviaa3ka.f1143002_0.jpeg?dis_k=5ace55785551274c6dd86715ecbe486d&dis_t=1653408261&sha256=70c87288ee74b54fd5e84550e9ac0c8376af2045f0f836880ebe71282c4d0923&ck=b7d75639c9968040929fe37e0961b1d5&m=b7d75639c9968040929fe37e0961b1d5"
            className="absolute-full object-cover"
          />
        </animated.div>
      </animated.div>
    </DemoBox>
  )
}

export default NavigationMenu
