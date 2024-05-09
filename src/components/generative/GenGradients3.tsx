import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 400
  const html = `
  <css-doodle click-to-update>
  --color: (#FE4019, #0B85CF, #FF5FB9, #36225E, #ffffff, #FFA900, transparent);
  --color-1: (#FE4019, #0B85CF, #FF5FB9, #36225E, #ffffff, #FFA900);

  :doodle {
    @grid: 5 / 400px;
    background:
      @m5000(radial-gradient(@p(--color) 50%, transparent calc(50% + 0.5px)) no-repeat @r(0, 100)% @r(0, 100)% / @r(2.4px) @lr),
      @m500(linear-gradient(@p(±45deg), @stripe(transparent, @p(--color) 1px, transparent)) no-repeat @r(0, 100)% @r(0, 100)% / @r(8px) @lr);
    background-color: #000;
  }

  :container {
    gap: 6px;
    padding: 40px;
  }

  ::before {
    --c: @p(--color-1);
    --radial: @m4(radial-gradient(var(--c) 70%, transparent calc(70% + 0.5px)) no-repeat @pn(50, 50, 10, 90)% @pn(10, 90, 50, 50)% / 8% 8%);
    --radial-1: @m4(radial-gradient(var(--c) 50%, transparent calc(50% + 0.5px)) no-repeat @pn(25%, 25%, 75%, 75%) @pn(25%, 75%, 25%, 75%)/ 10% 10%);
    --rect: @m4(linear-gradient(var(--c), var(--c)) no-repeat @pn(50, 50, 10, 90)% @pn(10, 90, 50, 50)% / 8% 8%);
    --rect-1: @m4(linear-gradient(var(--c), var(--c)) no-repeat @pn(25%, 25%, 75%, 75%) @pn(25%, 75%, 25%, 75%)/ 6% 6%);
    --stripe: radial-gradient(@stripe(@m(@r(2, 17), @P(--color)), @P(--color) 40%));
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    @size: 100%;
    background: var(--rect), var(--stripe);
    animation: rotate @r(20, 40)s linear infinite both reverse;
  }

  background: @lp;
  border-radius: @p(50%, 6px);
  overflow: hidden;

  @random(0.75) {
    ::before {
      background: @p(var(--radial-1), var(--rect-1)), @p(var(--radial), var(--rect)), var(--stripe);
    }
  }

  ::after {
    content: "";
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    width: @r(25, 40)%;
    height: 6px;
    background: @p(--color-1);
    border-radius: 6px;
    animation: rotate @r(20, 40)s linear infinite both;
    transform-origin: 3px 3px;
  }

  @keyframes rotate {
    from {
      transform: rotate(@r(0, 360deg));
    }
    to {
      transform: rotate(calc(360deg + @lr));
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
      <Link href="https://codepen.io/aragakey/full/WNXqpPE">Gradients</Link>
    </div>
  )
}

export default Gen
