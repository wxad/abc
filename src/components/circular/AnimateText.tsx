import React, { useEffect, useRef, useState } from "react"
import { animate, cubicBezier } from "popmotion"

export interface IAnimateText extends React.HTMLAttributes<HTMLDivElement> {
  // 字号
  size?: number
  // 文字
  text?: string
  // 自定义内容数组
  texts?: React.ReactNode[]
  // 文字动画间隔
  delay?: number
  // 最终颜色
  color?: string
  // 第一过渡色
  gradientColor1?: string
  // 第二过渡色
  gradientColor2?: string
  // bullet 第一过渡色
  bulletColor1?: string
  // bullet 第二过渡色
  bulletColor2?: string
  // charProps
  charProps?: React.HTMLAttributes<HTMLDivElement>
  // charIndexOffset
  charIndexOffset?: number
  // onlySpread
  onlySpread?: boolean
  // noAnimation
  noAnimation?: boolean
  // loop
  loop?: boolean
}

const AnimateText: React.FC<IAnimateText> = ({
  size = 50,
  delay = 50,
  text = "",
  texts,
  color = "#000",
  gradientColor1 = "#7b17a5",
  gradientColor2 = "#ff4a80",
  bulletColor1 = "#ffe684",
  bulletColor2 = "#ff582f",
  charProps = {},
  charIndexOffset = 0,
  onlySpread = false,
  noAnimation = false,
  loop = false,
  ...otherProps
}) => {
  const { style: charStyle = {}, ...otherCharProps } = charProps
  const [render, setRender] = useState(true)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { current: wrapper } = wrapperRef
    if (!wrapper || !render) {
      return
    }

    wrapper.style.opacity = "1"
    const spans = [...wrapper.querySelectorAll("span")]

    if (!noAnimation) {
      const doTheAnimation = () => {
        spans.forEach((span, index) => {
          const circle = span.querySelector(".driver") as HTMLDivElement
          const dash = span.querySelector(".driver-dash") as HTMLDivElement
          const bullet = span.querySelector(".bullet") as HTMLDivElement

          const doSpread = (props?: unknown) => {
            animate({
              from: -50,
              to: 100,
              duration: 4000,
              elapsed: 100,
              ease: cubicBezier(0.08, 0.74, 0.2, 0.93),
              onUpdate: (latest) => {
                const backgroundImage = `radial-gradient(circle at ${
                  onlySpread ? 50 : 0
                }% 100%, ${color} 0%, ${color} ${latest}%, ${gradientColor1} ${latest}%, ${gradientColor2} ${
                  latest + 50
                }%, transparent ${latest + 50 + 0.5}%, transparent 100%)`

                span.style.backgroundImage = backgroundImage
                span.style.webkitMaskImage = backgroundImage

                if (onlySpread) {
                  span.style.opacity = `${latest / 100}`
                }
              },
              onComplete: () => {
                if (loop && index === spans.length - 1) {
                  setRender(false)

                  setTimeout(() => {
                    setRender(true)
                  }, 0)
                }
              },
              // @ts-ignore
              ...(props || {}),
            })
          }

          if (onlySpread) {
            doSpread({
              elapsed: -index * 20,
              ease: undefined,
              duration: 2000,
            })
          } else {
            animate({
              from: 0,
              to: 1,
              ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
              duration: 200,
              elapsed: -index * delay,
              onUpdate: (latest) => {
                circle.style.transform = `translate3d(0, ${
                  latest * 25
                }px, 0) scale(${latest}, ${latest})`
              },
              onComplete: () => {
                bullet.style.opacity = "1"
                bullet.style.transition = "opacity 100ms ease"

                setTimeout(() => {
                  animate({
                    from: 0,
                    to: 1,
                    ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
                    duration: 50,
                    onUpdate: (latest) => {
                      if (index % 2) {
                        bullet.style.transform = `translate3d(${
                          latest * 2
                        }px, ${latest * 2}px, 0) scale(${latest}) rotate(60deg)`
                      } else {
                        bullet.style.transform = `translate3d(${
                          latest * 2
                        }px, ${
                          -latest * 2
                        }px, 0) scale(${latest}) rotate(-60deg)`
                      }
                    },
                    onComplete: () => {
                      setTimeout(() => {
                        animate({
                          from: 0,
                          to: 1,
                          ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
                          duration: 50,
                          onUpdate: (latest) => {
                            bullet.style.width = `${6 + 50 * latest}px`
                          },
                          onComplete: () => {
                            // bullet.style.width = "6px"
                            // if (index % 2) {
                            //   bullet.style.transform =
                            //     "translate3d(26px, 45px, 0px) rotate(60deg)"
                            // } else {
                            //   bullet.style.transform =
                            //     "translate3d(26px, -45px, 0px) rotate(-60deg)"
                            // }
                            // bullet.style.transition =
                            //   ".1s cubic-bezier(0.12, 0.81, 0.78, 0.98) all"

                            animate({
                              from: 0,
                              to: 1,
                              ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
                              duration: 100,
                              onUpdate: (latest) => {
                                if (index % 2) {
                                  // x: 2 -> 26;y: 2 -> 45
                                  bullet.style.transform = `translate3d(${
                                    2 + 24 * latest
                                  }px, ${2 + 43 * latest}px, 0) rotate(60deg)`
                                } else {
                                  // x: 2 -> 26;y: -2 -> -45
                                  bullet.style.transform = `translate3d(${
                                    2 + 24 * latest
                                  }px, ${-2 - 43 * latest}px, 0) rotate(-60deg)`
                                }
                                // width: 56 -> 6
                                bullet.style.width = `${56 - 50 * latest}px`
                              },
                            })

                            setTimeout(() => {
                              // if (index % 2) {
                              //   bullet.style.transform =
                              //     "translate3d(26px, 45px, 0px) rotate(60deg) scale(0)"
                              // } else {
                              //   bullet.style.transform =
                              //     "translate3d(26px, -45px, 0px) rotate(-60deg) scale(0)"
                              // }
                              // bullet.style.transformOrigin = "100% 50%"

                              bullet.style.width = "0"
                              bullet.style.height = "0"
                              bullet.style.transition = ".3s ease all"
                            }, 200)
                          },
                        })
                      }, 0)
                    },
                  })
                }, 0)

                circle.style.backgroundColor = gradientColor1
                circle.style.transition = "background-color 300ms ease"
                dash.style.backgroundColor = gradientColor1
                dash.style.transition = "background-color 300ms ease"
                setTimeout(() => {
                  animate({
                    from: 0,
                    to: 1,
                    ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
                    duration: 150,
                    onPlay: () => {
                      dash.style.opacity = "1"
                    },
                    onUpdate: (latest) => {
                      dash.style.transform = `translate3d(0, ${
                        -latest * 40
                      }px, 0)`
                      const minHeight = 2
                      const height =
                        minHeight +
                        (minHeight - 1) * Math.sin(latest * Math.PI) * 10
                      dash.style.height = `${height}px`
                    },
                    onComplete: () => {
                      dash.style.opacity = "0"
                    },
                  })
                }, 120)

                animate({
                  from: 0,
                  to: 1,
                  ease: cubicBezier(0.1, 0.76, 0.26, 0.96),
                  duration: 340,
                  onUpdate: (latest) => {
                    const minHeight = 8
                    const height =
                      minHeight +
                      (minHeight - 1) * Math.sin(latest * Math.PI) * 1.2

                    circle.style.transform = `translate3d(0, ${
                      25 - latest * 50
                    }px, 0) scaleY(1)`
                    circle.style.height = `${height}px`
                  },
                  onComplete: () => {
                    circle.style.backgroundColor = color
                    circle.style.transition = "background-color 240ms ease"
                    dash.style.backgroundColor = color
                    dash.style.transform = "translate3d(11px, -40px, 0)"
                    dash.style.transformOrigin = "center bottom"
                    dash.style.transition = "background-color 240ms ease"
                    setTimeout(() => {
                      animate({
                        from: 0,
                        to: 1,
                        ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
                        duration: 100,
                        onPlay: () => {
                          dash.style.opacity = "1"
                        },
                        onUpdate: (latest) => {
                          dash.style.transform = `translate3d(11px, ${
                            -40 + 30 * latest
                          }px, 0)`
                          const minHeight = 2
                          const height =
                            minHeight +
                            (minHeight - 1) * Math.sin(latest * Math.PI) * 18
                          dash.style.height = `${height}px`
                        },
                        onComplete: () => {
                          dash.style.opacity = "0"
                        },
                      })
                    }, 50)
                    animate({
                      from: 0,
                      to: 1,
                      ease: cubicBezier(0.12, 0.81, 0.78, 0.98),
                      duration: 250,
                      onUpdate: (latest) => {
                        // 设定一个最小高度值
                        const minHeight = 10

                        // 计算高度变化
                        const height =
                          minHeight +
                          (minHeight - 1) * Math.sin(latest * Math.PI)

                        circle.style.transform = `translate3d(0, ${
                          -25 + latest * 50
                        }px, 0) scale(${1 - latest / 1.5})`
                        circle.style.height = `${height}px`
                      },
                      onComplete: () => {
                        circle.style.opacity = "0"
                        doSpread()
                      },
                    })
                  },
                })
              },
            })
          }
        })
      }

      doTheAnimation()
    }
  }, [render])

  if (!render) {
    return null
  }

  return (
    <div className="animate-text" ref={wrapperRef} {...otherProps}>
      {(texts?.length ? texts : text.split("")).map((letter, index) => {
        if (letter === " ") {
          return (
            <i
              key={index}
              style={{
                zoom: size / 50,
                // @ts-ignore
                "--char-index": index + charIndexOffset,
                ...charStyle,
              }}
              {...otherCharProps}
            >
              &nbsp;
            </i>
          )
        }
        return (
          <span
            key={index}
            style={{
              zoom: size / 50,
              // @ts-ignore
              "--char-index": index + charIndexOffset,
              ...charStyle,
            }}
            {...otherCharProps}
          >
            {letter}
            <i
              className="driver"
              style={{ backgroundColor: color, opacity: onlySpread ? 0 : 1 }}
            />
            <i className="driver-dash" style={{ backgroundColor: color }} />
            <i
              className="bullet"
              style={{
                background: `linear-gradient(90deg, ${bulletColor1}, ${bulletColor2})`,
              }}
            />
          </span>
        )
      })}
    </div>
  )
}

export default AnimateText
