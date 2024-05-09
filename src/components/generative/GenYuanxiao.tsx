import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 400
  const html = `
  <css-doodle>
    :doodle {
      @grid: 16x10 / 400px 400px;
      overflow: hidden;
      background: linear-gradient(#1B0F0E, #521E18);
      border-radius: 4px;
    }
    background-image: radial-gradient(circle at @r(45, 55)% 100%, #fff 0%, #fff @r(5, 10)%, #F7E076 20%, #ffc88a 30%, #ebd15b 40%, #c57010 80%);
    border-radius: @r(0, 4)px;

    --rotate: @r(±15)deg;
    --translate-x: @r(±20)%;
    --translate-y: @r(±20)%;
    --scale: @p(0.1, 0.2, 0.3, 0.5, 0.2, 0.8);
    --delta: @r(±10)vmin;

    animation: k 10s linear infinite both;

    @keyframes k {
      from { transform: rotate(var(--rotate)) translate(var(--translate-x), var(--translate-y)) scale(var(--scale)); }
      to { transform: rotate(var(--rotate)) translate(calc(var(--translate-x) + var(--delta)), calc(var(--translate-y) - @r(3, 6)vmin)) scale(var(--scale)); }
    }

    filter: @svg-filter(
      feTurbulence {
        type: fractalNoise;
        baseFrequency: @r(0.01, 0.1) @r(0.2, 1);
      }
      feDisplacementMap {
        in: SourceGraphic;
        scale: @r(3, 4.5);
      }
    );

    @row(1, 2) {
      opacity: @p(0, 0, 1);
      transform: rotate(@r(-25, 25)deg) scale(@r(0.1, 0.5));
    }

    @row(10) {
      animation: none;
      background: radial-gradient(circle at 50% 44%, #000 0%, #000 10%, transparent 10%);
      transform: rotateY(@p(0, 180)deg) translate(@r(±50)%, @r(0, 10)%) scale(@r(0.5, 1.2));
      transform-origin: center bottom;
      filter: drop-shadow(@r(±30)vmin 0 0 @p(transparent, black));
      opacity: @r(0.6, 0.8);

      ::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 42%;
        width: 21%;
        height: 50%;
        background: #000;
        border-radius: 40% 20% 0 0;
      }

      ::before {
        content: "";
        position: absolute;
        bottom: 48%;
        left: 50%;
        width: @r(42, 50)%;
        height: 5%;
        background: #000;
        border-radius: 1vmin;
        transform: rotate(-38deg);
      }
    }

    @at(1, 10) {
      animation: none;
      opacity: 0;
    }

    @at(2, 10) {
      animation: none;
      opacity: 0;
    }

    @nth(1) {
      animation: none;
      opacity: .6;
      position: absolute;
      top: 0;
      left: 0;
      @size: 100%;
      transform: initial;
      filter: @svg-filter(
        feTurbulence {
          baseFrequency: 0.7;
          numOctaves: 2;
        }
      )
    }

    @nth(2) {
      animation: none;
      position: absolute;
      top: @r(3, 8)%;
      left: @r(5, 10)%;
      z-index: 2;
      width: 3vmin;
      height: 3vmin;
      background: #fff;
      border-radius: 50%;
      opacity: 0.8;
      transform: rotate(@r(-20, 20)deg);
      filter: drop-shadow(0 0 10px #fff);
    }
  </css-doodle>
`
  const { ref, scale, inView } = useDoodle(size, { update: false })

  return (
    <div ref={ref} className="my-16">
      <div
        className="mx-auto mb-2"
        style={{
          width: size * scale,
          height: height * scale,
        }}
      >
        {inView && (
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
            style={{
              width: size,
              height: size,
              transform: `scale(${scale})`,
            }}
            className="origin-top-left"
          />
        )}
      </div>
      <Link href="https://codepen.io/aragakey/full/LYOzPzw">今年元夜时</Link>
    </div>
  )
}

export default Gen
