import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const html = `
  <css-doodle>
    :doodle {
      @grid: 25x1 / 400px;
      aspect-ratio: initial;
      overflow: hidden;
      --colors: (#689FC0, #CF6756, #543235, #F6C7C8, #ECBB3F, #4B639D, #5A8863, #DE7970, #FDF9CC);
    }
    :container {
      display: flex;
      flex-direction: column;
      transform: scale(1.7) rotate(45deg);
    }

    --height: @p(25, 20, 15)px;
    height: var(--height);

    --c-0: @p(--colors);
    --c-1: @P;
    --c-2: @P;
    --c-3: @P;
    --c-4: @P;
    --c-5: @P;
    --bg-h-1: calc(var(--height) * 2 / 3);
    --bg-w-1: calc(var(--bg-h-1) * 1.5);
    --bg-h-2: calc(var(--height) * 1 / 3);
    --bg-w-2: calc(var(--bg-h-2) * 3);

    --bg: @pd(
      (
        @m2(radial-gradient(circle at 50% 40%, var(--c-0) 15%, var(--c-1) calc(15% + 0.5px), var(--c-1) 30%, var(--c-2) calc(30% + 0.5px), var(--c-2) 45%, transparent calc(45% + 0.5px)) repeat-x @pn(calc(var(--height) / 2.56) calc(var(--height) / 2.42), 0 0) / calc(var(--height) / 1.31) calc(var(--height) / 1.31)),
        linear-gradient(@m2(var(--c-3)))
      ),
      (
        linear-gradient(90deg, @stripe(transparent, var(--c-1) 33.3%, transparent)) repeat-x 50% 50% / var(--bg-w-2) var(--bg-h-2),
        linear-gradient(90deg, @stripe(transparent, var(--c-0) 66.6%, transparent)) repeat-x 50% 50% / var(--bg-w-1) var(--bg-h-1),
        linear-gradient(@m2(var(--c-3)))
      ),
      (
        linear-gradient(90deg, @stripe(var(--c-0) calc(var(--height) / 20), transparent)) repeat-x calc(50% + var(--height) * 3) 55% / calc(var(--height) * 1.2) calc(var(--height) * 0.72),
        linear-gradient(30deg, @stripe(transparent, var(--c-0) calc(var(--height) / 20), transparent)) repeat-x calc(50% + var(--height) * 3) 50% / calc(var(--height) * 1.2) calc(var(--height) * 1),
        linear-gradient(90deg, @stripe(var(--c-1) calc(var(--height) / 20), transparent)) repeat-x 50% 55% / calc(var(--height) * 1.2) calc(var(--height) * 0.72),
        linear-gradient(30deg, @stripe(transparent, var(--c-1) calc(var(--height) / 20), transparent)) repeat-x 50% 50% / calc(var(--height) * 1.2) calc(var(--height) * 1),
        linear-gradient(@m2(var(--c-3)))
      ),
      (
        radial-gradient(circle at 50% 50%, var(--c-2) 20%, transparent calc(20% + 0.5px)) calc(0% + var(--height) / 5) 0 / var(--height) var(--height),
        radial-gradient(circle at 50% 50%, var(--c-3) 20%, transparent calc(20% + 0.5px)) calc(0% - var(--height) / 3.5) 0 / var(--height) var(--height),
        @m200(
          radial-gradient(var(--c-@pn(0, 1)) 66%, transparent calc(66% + 0.5px)) no-repeat calc(0% + var(--height) / 2 * @n) 50% / var(--height) var(--height)
        ),
        linear-gradient(@m2(var(--c-4)))
      ),
      (
        radial-gradient(circle at 50% 0%, @stripe(var(--c-3), var(--c-4), var(--c-5), transparent 55%)) calc(0% + var(--height) / 2) 0 / var(--height) var(--height),
        radial-gradient(circle at 50% 100%, @stripe(var(--c-1), var(--c-0), var(--c-2), transparent 55%)) 0 0 / var(--height) var(--height),
        linear-gradient(@m2(var(--c-0)))
      ),
      (
        linear-gradient(90deg, @stripe(transparent, var(--c-2), transparent)) repeat-x calc(0% + var(--height) / 1.5) 50% / var(--height) calc(var(--height) / 3),
        linear-gradient(90deg, @stripe(transparent, var(--c-1), transparent)) repeat-x calc(0% + var(--height) / 0.75) 100% / var(--height) calc(var(--height) / 3),
        linear-gradient(90deg, @stripe(transparent, var(--c-1), transparent)) repeat-x 0 0 / var(--height) calc(var(--height) / 3),
        linear-gradient(@m2(var(--c-0)))
      ),
      (
        radial-gradient(circle at 50% 50%, var(--c-2) 15%, transparent calc(15% + 0.5px)) 50% 50% / calc(var(--height) * 1.2) calc(var(--height) * 1.2),
        linear-gradient(-45deg, @stripe(transparent, var(--c-1) calc(var(--height) / 20), transparent)) repeat-x calc(50% + var(--height) * 3) 50% / calc(var(--height) * 1.2) calc(var(--height) * 0.8),
        linear-gradient(45deg, @stripe(transparent, var(--c-1) calc(var(--height) / 20), transparent)) repeat-x calc(50% + var(--height) * 3) 50% / calc(var(--height) * 1.2) calc(var(--height) * 0.8),
        linear-gradient(@m2(var(--c-0)))
      ),
      (
        conic-gradient(from 90deg at 0 0, @stripe(var(--c-1), var(--c-2), var(--c-3), var(--c-4), var(--c-3), var(--c-2), var(--c-1), transparent 75%)) 50% 50% / var(--height) var(--height),
        linear-gradient(@m2(var(--c-0)))
      ),
      ''
    );

    background: var(--bg);
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
      <Link href="https://codepen.io/aragakey/full/oNPweKq">Gradients</Link>
    </div>
  )
}

export default Gen
