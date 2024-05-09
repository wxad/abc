import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 400
  const html = `
  <css-doodle>
      :doodle {
        @grid: 50x1 / 400px 400px;
        overflow: hidden;
        background:
          @m600(linear-gradient(0deg, @m2(rgba(255, 255, 255, @r(0.5, 1)))) @rep2(@r(0, 100)% )/ @rep2(@r(1, 2.5)px )no-repeat),
          linear-gradient(180deg, #047dd4, #047dd4) 0 0 / 100% 100%;
      }

      --w: @r(2, 6);
      --h: @r(3, 30);
      position: absolute;
      bottom: 20%;
      left: calc((@index - 10) * 3%);
      width: calc(var(--w) * 1%);
      height: calc(var(--h) * 1%);
      background: 
        @m7(linear-gradient(0deg, @m2(hsla(calc(220 - @i() * 10), 70%, 68%, @r(0.7, 1)))) @rep2(@r(0, 100)% )/ @r(2, 6)px @r(1, 3)px no-repeat),
        @p(
          @m4(linear-gradient(0deg, #012b71, #012b71)),
          linear-gradient(0deg, hsla(calc(220 - @i() * 10), 70%, 68%, 0), hsla(calc(220 - @i() * 10), 70%, 68%, 1))
        );
      opacity: calc(1 - 1 / 700 * @var(--w) * @var(--h));
      -webkit-box-reflect: below 2.6px linear-gradient(transparent, rgba(0, 0, 0, 0.4));

      @random(.3) {
        ::after {
          content: "";
          position: absolute;
          left: @r(45, 50)%;
          bottom: 100%;
          width: @r(2, 3)px;
          height: @r(8, 20)px;
          background: #0a3782;
        }
      }

      @random(.4) {
        ::after {
          content: "";
          position: absolute;
          left: @r(45, 50)%;
          bottom: 100%;
          width: 40%;
          height: 150%;
          background: linear-gradient(0deg, rgba(255, 255, 255, .6), transparent);
          transform-origin: 50% 105%;
          clip-path: polygon(25% 0%, 75% 0%, 50% 100%, 40% 100%);
          transform: rotate(@r(-40, 40)deg);
        }
      }

      @random(.2) {
        clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0% 10%);
      }

      @random(.2) {
        clip-path: polygon(80% 0, 100% 10%, 100% 100%, 0 100%, 0 0);
      }

      @random(.2) {
        clip-path: polygon(50% 0, 100% 20%, 100% 100%, 0 100%, 0 20%);
      }

      @nth(1, 2, 3) {
        position: relative;
        z-index: 2;
        bottom: initial;
        left: initial;
        @size: initial;
        clip-path: initial;
        background: transparent;
        overflow: visible;
        opacity: 1;

        ::after {
          content: "@pn(🕺,💃,🐈)";
          position: absolute;
          bottom: @pn(22.2, 22.2, 20)%;
          left: @pn(3290, 2850, @r(50, 400))%;
          font-size: @pn(44.7744, 42.24, 21.12)px;
          color: transparent;
          text-shadow: 2px 2px 0 #0b0d2d, 2px 2px 1px rgba(255, 255, 255, 0.6);
          transform: initial;
          clip-path: initial;
          @size: initial;
          background: initial;
          overflow: visible;
        }
      }

      @nth(4) {
        z-index: 1000;
        opacity: .6;
        bottom: initial;
        clip-path: initial;
        background: transparent;
        position: absolute;
        top: 0;
        left: 0;
        @size: 100%;
        filter: @svg-filter(
          <svg>
            <filter>  
              <feTurbulence baseFrequency=".6" numOctaves="0.1" />
            </filter>
          </svg>
        )
      }

      @nth(5) {
        position: absolute;
        bottom: initial;
        clip-path: initial;
        opacity: 1;
        z-index: 1;
        top: 0;
        left: 0;
        @size: 100%;
        opacity: 1;
        --color: rgba(11, 13, 45, 1);
        background: 
          linear-gradient(90deg, transparent @r(25%, 35%), var(--color) @lr(), var(--color) calc(@lr() + 1%), transparent calc(@lr() + 1%), transparent @r(85%, 95%), var(--color) @lr(), var(--color) calc(@lr() + 1%), transparent calc(@lr() + 1%)) 0 0 / 100% 100%;
      }

      @nth(7) {
        position: absolute;
        bottom: initial;
        clip-path: initial;
        opacity: 1;
        top: 0;
        left: 0;
        @size: 100%;
        opacity: 1;
        --color: rgba(11, 13, 45, 1);
        background: linear-gradient(0deg, var(--color) 20%, transparent 20%, transparent @r(70%, 75%), var(--color) @lr(), var(--color) calc(@lr() + 1%), transparent calc(@lr() + 1%)) 0 0 / 100% 100%;
      }

      @nth(4, 5, 6, 7) {
        ::after {
          display: none;
        }
      }
      @nth(6) {
        position: absolute;
        top: 10%;
        left: 10%;
        z-index: 2;
        width: 26px;
        height: 26px;
        clip-path: initial;
        background: transparent;
        box-shadow: inset 10px 0 #efefc5;
        border-radius: 50%;
        opacity: 0.8;
        transform: rotate(18deg);
        filter: drop-shadow(0 0 10px #efefc5);
        -webkit-box-reflect: initial;
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
      <Link href="https://codepen.io/aragakey/full/qBZLNJX">La La Land</Link>
    </div>
  )
}

export default Gen
