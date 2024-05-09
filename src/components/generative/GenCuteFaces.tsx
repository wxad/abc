import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 466
  const html = `
  <css-doodle>
    :doodle {
      @grid: 6x6 / 400px 466px;
      @min-size: 540px 630px;
      overflow: hidden;
      row-gap: 2vmin;
    }
    --eye-size: @r(7, 14)%;
    --eye-y: @r(55, 65)%;
    --eye-left-x: @r(20, 30)%;
    --eye-right-x: @r(70, 90)%;
    --blush-color: rgba(249, 151, 152, @r(.1, .9));
    --blush-size: calc(@r(0, 5)% + var(--eye-size));
    --blush-y: @r(80, 85)%;

    background-image:
    linear-gradient(180deg, rgba(0, 0, 0, .9) 50%, transparent 50%),
      @m4(
        radial-gradient(circle at center, @pn(#000, #000, var(--blush-color), var(--blush-color)) 50%, transparent calc(50% + 1px))
      );
    background-size:
      100% 100%,
      @m2(var(--eye-size) var(--eye-size)),
      @m2(var(--blush-size) var(--blush-size));
    background-position:
      0 0,
      var(--eye-left-x) var(--eye-y),
      var(--eye-right-x) var(--eye-y),
      calc(var(--eye-left-x) + @r(-4, 2)%) var(--blush-y),
      calc(var(--eye-right-x) - @r(-4, 2)%) var(--blush-y);
    background-repeat: no-repeat;
    border-radius: 100%;
    transform: scale(@r(0.9, 1.3)) translate(@r(-4%, 4%), @r(-12%, 12%));

    ::before {
      content: "";
      position: absolute;
      top: 60%;
      left: 50%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 @r(0.01, 0.5)vmin @r(1, 1.6)vmin @r(0.01, 0.5)vmin;
      border-color: transparent transparent #f39027 transparent;
    }

    ::after {
      content: "@p(\u25d6, \u25d6, \u25cc, \u0028, \u0029, \u25fc, \u25b8)";
      transform: rotate(-90deg) scale(@r(1.3, 1.7));
      position: absolute;
      left: @r(45, 55)%;
      bottom: @r(-10, -20)%;
      color: #ff0000;
      font-size: 12px;
      font-family: -apple-system, serif;
    }
  </css-doodle>
  `
  const { ref, scale, inView } = useDoodle(size)

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
      <Link href="https://codepen.io/aragakey/full/MWyrvmb">Cute Faces</Link>
    </div>
  )
}

export default Gen
