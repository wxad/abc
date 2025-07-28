import { AnimatePresence, motion, useSpring } from "motion/react"
import { useEffect, useRef, useState } from "react"

export interface TextSwapProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string | number
  /** 是否 key 反向 */
  keyReverse?: boolean
}

export interface TextSwapFlipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 字符动画延迟(ms) */
  delay?: number
  /** 动画持续时间(ms) */
  duration?: number
  /** 原始文字 */
  originalText: string
  /** 替换文字 */
  swappedText: string
  /** 是否翻转 */
  flipped?: boolean
  /** 是否反向 */
  reversed?: boolean
  /** 模糊程度 */
  blur?: number
  /** 偏移量 */
  y?: number
}

const Flip = ({
  delay = 30,
  duration = 700,
  originalText,
  swappedText,
  flipped = false,
  reversed = false,
  blur = 3,
  y = 13,
  ...props
}: TextSwapFlipProps) => {
  const length = Math.max(originalText.length, swappedText.length)

  const variants = {
    originalInitial: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      transition: {
        duration: duration / 1000,
        ease: [0.32, 0.72, 0, 1],
        delay: (reversed ? length - i : i) * (delay / 1000),
      },
    }),
    originalEnter: (i: number) => ({
      filter: `blur(${blur}px)`,
      opacity: 0,
      y: -y,
      z: 0,
      rotateX: 80,
      transition: {
        duration: duration / 1000,
        ease: [0.32, 0.72, 0, 1],
        delay: i * (delay / 1000),
      },
    }),
    swappedInitial: (i: number) => ({
      filter: `blur(${blur}px)`,
      opacity: 0,
      y: y,
      z: 0,
      rotateX: -90,
      transition: {
        delay: (reversed ? length - i : i) * (delay / 1000),
        duration: duration / 1000,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
    swappedEnter: (i: number) => ({
      filter: `blur(0px)`,
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      transition: {
        delay: i * (delay / 1000),
        duration: duration / 1000,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  }

  return (
    <div data-text-swap-flip {...props}>
      <div data-text-swap-flip-original>
        {[...originalText].map((char, index) => (
          <motion.span
            key={index}
            initial={{ filter: "blur(0px)", opacity: 1, y: 0, rotateX: 0 }}
            animate={flipped ? "originalEnter" : "originalInitial"}
            custom={index}
            // @ts-ignore
            variants={variants}
            data-text-swap-flip-char
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <div data-text-swap-flip-swapped>
        {[...swappedText].map((char, index) => (
          <motion.span
            key={index}
            initial={{ filter: `blur(${blur}px)`, opacity: 0, y, rotateX: -90 }}
            animate={flipped ? "swappedEnter" : "swappedInitial"}
            custom={index}
            // @ts-ignore
            variants={variants}
            data-text-swap-flip-char
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

const TextSwapChar = ({
  children,
  index,
}: {
  children: string | number
  index: number
}) => {
  const charRef = useRef<HTMLSpanElement>(null)
  const width = useSpring(0, {
    stiffness: 170,
    damping: 26,
  })

  return (
    <motion.span
      ref={charRef}
      data-text-swap-char
      initial={{
        opacity: 0,
        y: "80%",
        scale: 0.4,
        filter: "blur(3px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.5,
          delay: 0.015 * index,
          ease: [0.34, 1.3, 0.64, 1],
        },
      }}
      onAnimationStart={(props) => {
        if (charRef.current) {
          // @ts-ignore
          if (props.opacity) {
            width.set(charRef.current.offsetWidth)
          } else {
            charRef.current.style.left = `${charRef.current.offsetLeft}px`
            charRef.current.style.top = `${charRef.current.offsetTop}px`
            setTimeout(() => {
              if (charRef.current) {
                charRef.current.style.position = "absolute"
              }
            }, 0)
          }
        }
      }}
      exit={{
        opacity: 0,
        y: "-0%",
        scale: 0,
        filter: "blur(3px)",
        transition: {
          duration: 0.5,
          ease: [0.34, 1.4, 0.64, 1],
        },
      }}
      style={{
        display: "inline-block",
        transformOrigin: "50% 0%",
      }}
    >
      {children}
    </motion.span>
  )
}

const TextSwap: React.FC<TextSwapProps> & {
  Flip: typeof Flip
} = ({ children, style = {}, keyReverse = false, ...props }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (innerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect
        if (wrapperRef.current) {
          setSize({
            width,
            height,
          })
        }
      })
      resizeObserver.observe(innerRef.current)

      return () => resizeObserver.disconnect()
    }
  }, [innerRef])

  const childrenArray =
    typeof children === "number" ? children.toString() : children

  return (
    // @ts-ignore
    <motion.div
      data-text-swap
      ref={wrapperRef}
      style={{
        width: size.width ?? undefined,
        height: size.height ?? undefined,
        ...style,
      }}
      {...props}
    >
      <motion.div data-text-swap-inner ref={innerRef}>
        <AnimatePresence>
          {[...childrenArray].map((char, i) => {
            const key = keyReverse
              ? childrenArray.length - i + "-" + char
              : i + "-" + char
            return (
              <TextSwapChar index={i} key={key}>
                {char}
              </TextSwapChar>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

TextSwap.Flip = Flip

export default TextSwap
