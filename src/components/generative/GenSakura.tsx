import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const html = `
  <css-doodle>
    :doodle {
      @grid: 6 / 400px;
      background-image: linear-gradient(rgba(168, 224, 255, .3), rgba(162, 232, 246, .3), rgba(248, 237, 204, .3));;
      overflow: hidden;
    }
    :container {
      background-image: url("http://wximg.qq.com/wxp/temp/sakura.png");
      background-size: 15% 15%;
      background-position: 50% 48%;
      background-repeat: no-repeat;
    }
    ::before {
      content: "";
      position: absolute;
      bottom: 8%;
      left: 8%;
      width: @r(40%, 50%);
      height: @r(40%, 50%);
      background-image: linear-gradient(to left, #FFBFEC, #FFC0E8, 60%, #FF86C6);
      border-radius: 100% 0;
      border-bottom: @r(10px) solid #FFBFEC;
      border-left: @r(10px) solid #FFBFEC;
      transition: .2s ease all @r(.2s);
    }

    opacity: @r(.3, 1);
    transform: skewX(@r(0, 20)deg) skewY(@r(0, 20)deg) scale(@r(.1, .8)) rotate(@r(360deg)) translate(@r(-100%, 100%), @r(50%, 100%));
    transition: .2s ease all @r(.2s);
    -webkit-filter: blur(@p(0, 4px));
  </css-doodle>
  `
  const { ref, scale, inView } = useDoodle(size)

  return (
    <div ref={ref} className="my-16">
      <div
        className="mx-auto mb-2"
        style={{
          width: size * scale,
          height: size * scale,
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
      <Link href="https://codepen.io/aragakey/full/JVKBmm">Sakura</Link>
    </div>
  )
}

export default Gen
