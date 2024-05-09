import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const html = `
  <css-doodle>
    :doodle {
      @grid: 30x1 / 400px;
    }
    :container {
      transform: rotate(45deg) scale(2);
    }
    border-right: 4px @p(dotted, solid, dashed, double) @p(
      #bff4ed, #280f34,
      #b30753, #f6c667
    );
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
    </div>
  )
}

export default Gen
