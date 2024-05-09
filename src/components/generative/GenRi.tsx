import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 720
  const html = `
  <css-doodle>
  :doodle {
    flex: none;
    @grid: 1x100;
    @size: 400px 720px;
    background: linear-gradient(#f3efde, #697679);
    overflow: hidden;
    filter: @svg-filter(
      feTurbulence {
        type: fractalNoise;
        baseFrequency: .01 @r(0.1, 0.5);
      }
      feDisplacementMap {
        in: SourceGraphic;
        scale: @r(2, 3);
      }
    );
  }
  @place: 50% calc(100% - @index() * @index()% / 100);
  @size: 100% 1px;

  @match(y < 70) {
    ::before {
      content: "";
      @place: center calc(100% - 20px);
      @size: 100% 40px;
      background: @m10(radial-gradient(#f3efde 50%, transparent calc(50% + 0.75px)) @r(0, 100)% @r(0, 100)% / @r(1, 4)px @lr()px no-repeat);
    }
  }
  @nth(97,98,99,100) {
    ::before {
      content: ")";
      @place: 50% calc(10.94091904px * 8);
      @size: calc(4.37636761px * 8);
      color: #f3efde;
      font-size: calc(4.37636761px * 8);
      transform: rotate(-40deg) skew(30deg);
    }
    ::after {
      content: "(";
      @place: 50.5% calc(14.66083151px * 8);
      @size: calc(4.37636761px * 8);
      color: #f3efde;
      font-size: 2.18818381vmin;
      transform: rotate(100deg) skew(30deg);
    }
  }
  @nth(97) {
    transform: translate3d(-27%, -22px, 0) scale(0.5);
  }
  @nth(98) {
    transform: translate3d(-20%, -7px, 0) scale(0.7);
  }
  @nth(99) {
    transform: translate3d(-6%, 32px, 0) scale(1.1);
  }
  @nth(100) {
    transform: translate3d(15%, 60px, 0) scale(1.5);
  }
  @nth(96) {
    ::before {
      content: "";
      @place: 32% calc(1px * 8);
      @size: calc(28px * 8);
      background:
        @m1000(radial-gradient(rgba(243, 239, 222, @r(0.2, 0.8)) 50%, transparent calc(50% + 0.75px)) @r(0, 100)% @r(0, 100)% / 1px 1px no-repeat),
        linear-gradient(#c8755b, #b1473e);
      border-radius: 100%;
    }
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
      <Link href="https://codepen.io/aragakey/full/bGKbKyX">日</Link>
    </div>
  )
}

export default Gen
