import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 533
  const html = `
  <css-doodle>
  :doodle {
    flex: none;
    @grid: 100x1;
    @size: 400px 533px;
    --champagne: hsl(49, 100%, 83%);
    --violet: hsl(272, 60%, 17%);
    --alloy-orange: hsl(18, 76%, 53%);
    --lemon-curry: hsl(48, 78%, 50%);
    --ksu-purple: hsl(273, 58%, 38%);
    --keppel: hsl(187, 43%, 49%);
    --american-red: hsl(354, 66%, 50%);
    border: .8vmin solid var(--american-red);
    overflow: hidden;
    --unit: 1%;
  }

  @match(i < 9 && i % 2) { transform: translateY(calc(-1 * (@i + 1) * 0.5vmin - 0.5vmin)); }
  @match(i < 9 && i % 2 = 0) { transform: translateY(calc(-@i * 0.5vmin)); }
  @match(i > 8 && i < 79 && i % 2 = 0) { transform: translateY(calc(@i * 0.5vmin - 9vmin + 1vmin)); }
  @match(i > 8 && i < 80 && i % 2) { transform: translateY(calc(@i * 0.5vmin - 9vmin)); }
  @match(i > 79 && i % 2) { transform: translateY(calc(29.5vmin - (@i - 81) * 0.5vmin)); }
  @match(i > 78 && i % 2 = 0) { transform: translateY(calc(-1 * (@i - 78) * 0.5vmin + 32vmin)); }

  ::before { bottom: 50%; }
  ::after { top: 50%; }
  ::before, ::after {
    content: "";
    position: absolute;
    left: 0;
    @size: 100%;

    background: linear-gradient(0deg, @stripe(
      var(--champagne) 5%,
      var(--violet) 3%,
      var(--alloy-orange),
      var(--lemon-curry),
      var(--violet),
      var(--alloy-orange) var(--unit),
      var(--champagne),
      var(--alloy-orange),
      var(--champagne),
      var(--lemon-curry),
      var(--alloy-orange),
      var(--ksu-purple) 1%,
      var(--keppel) 1.2%,
      var(--violet) 1.2%,
      var(--keppel) 1.4%,
      var(--lemon-curry),
      var(--american-red),
      var(--violet),
      var(--alloy-orange),
      var(--american-red) 1.2%,
      var(--champagne) 1.2%,
      var(--american-red) 1.2%,
      var(--lemon-curry) 1.2%,
      var(--american-red) 1.2%,
      var(--violet) 1.2%,
      var(--keppel),
      var(--ksu-purple),
      var(--american-red),
      var(--alloy-orange),
      var(--lemon-curry),
      var(--american-red),
      var(--violet),
      var(--keppel),
      var(--alloy-orange),
      var(--ksu-purple),
      var(--lemon-curry),
      var(--american-red),
      var(--violet)
    ));
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
      <Link href="https://codepen.io/aragakey/full/jOKgRQW">Gradients</Link>
    </div>
  )
}

export default Gen
