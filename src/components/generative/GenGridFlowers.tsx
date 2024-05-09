import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 400
  const html = `
  <css-doodle>
    :doodle {
      flex: none;
      @grid: 113x1 / 400px;
      overflow: hidden;
    }

    :container {
      padding: 15px 10px 0;
      grid-template-columns: repeat(16, 1fr);
      grid-template-rows: repeat(16, 1fr);
      --gap: 75ms;
    }

    --colors: (#cdb4db, #ffc8dd, #ffafcc, #bde0fe, #a2d2ff);
    --color: @p(--colors);
    --color-1: @P;
    --color-2: @P;
    
    grid-column: span 2;

    @nth(15n - 6) {
      grid-column: 2 / span 2;
    }

    @nth(7n + 98) { --delay: calc(var(--gap) * 1); }
    @nth(7n + 83) { --delay: calc(var(--gap) * 2); }
    @nth(7n + 68) { --delay: calc(var(--gap) * 3); }
    @nth(7n + 53) { --delay: calc(var(--gap) * 4); }
    @nth(7n + 38) { --delay: calc(var(--gap) * 5); }
    @nth(7n + 23) { --delay: calc(var(--gap) * 6); }
    @nth(7n + 8) { --delay: calc(var(--gap) * 7); }
    @nth(91 - 7n) { --delay: calc(var(--gap) * 8); }
    @nth(76 - 7n) { --delay: calc(var(--gap) * 9); }
    @nth(61 - 7n) { --delay: calc(var(--gap) * 10); }
    @nth(46 - 7n) { --delay: calc(var(--gap) * 11); }
    @nth(31 - 7n) { --delay: calc(var(--gap) * 12); }
    @nth(16 - 7n) { --delay: calc(var(--gap) * 13); }
    @nth(1) { --delay: calc(var(--gap) * 14); }
    @nth(113) { --delay: 0ms }


    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      @size: 10px;
      border-radius: 100%;
      background: var(--color);
      animation: before cubic-bezier(.65,.48,.16,1.27) 8000ms var(--delay) both infinite;
    }

    ::after {
      content: "@p(🌸,🌼)";
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 18.75px;
      color: transparent;
      background-image: radial-gradient(var(--color-1) 20%, var(--color) calc(20% + 0.5px));
      -webkit-background-clip: text;
      animation: after ease 8000ms var(--delay) both infinite;
    }

    @keyframes before {
      0% {
        transform: translate3d(-50%, calc(-50% - 20px), 0) scale(0);
      }
      10%, 20% {
        transform: translate3d(-50%, -50%, 0) scale(1);
      }
      30%, 100% {
        transform: translate3d(-50%, calc(-50% - 20px), 0) scale(0);
      }
    }

    @keyframes after {
      0%, 25% {
        opacity: 1;
        transform: translate3d(-50%, calc(-50% - 20px), 0) scale(0) rotate(-180deg);
      }
      30%, 50% {
        opacity: 1;
        transform: translate3d(-50%, -50%, 0) scale(1) rotate(0);
      }
      100% {
        opacity: @r(0, 0.5);
        transform: translate3d(calc(-50% + @r(-250, 0)px), -@r(400, 500)px, 0) scale(0) rotate(@r(-360, 360)deg);
      }
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
      <Link href="https://codepen.io/aragakey/full/mdKvzZa">Grid of Flowers</Link>
    </div>
  )
}

export default Gen
