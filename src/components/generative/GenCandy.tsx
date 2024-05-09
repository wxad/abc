import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 400
  const height = 486
  const html = `
  <style>
    css-doodle {
      --blue: #7154d3;
      --green: #71c3cc;
      --yellow: #f8d697;
      --pink: #fadfe9;
      --red: #e93d35;
      --rule-candy: (
        :doodle {
          flex: none;
          @grid: 1x20;
          @size: 172px;
          overflow: hidden;
        }
        @place: center;
        @size: calc(100% - (@i - 1) * 5%);
        border-radius: 100%;
        background: linear-gradient(var(--blue), var(--green), var(--yellow), var(--pink), var(--red));
        animation: rotate 15s linear @p(reverse, normal) both infinite;
        @keyframes rotate {
          from { transform: rotate(@r(360deg)) }
          to { transform: rotate(calc(@lr + 360deg)) }
        }
      );
    }
    #graph-candy {
      position: relative;
      display: block;
      width: 400px;
      height: 486px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5),
        0 0 0 3px black;
    
      --padding: 27px;
      --size: 172px;
    }
    #graph-candy css-doodle {
      position: absolute;
    }
    #graph-candy css-doodle:nth-child(1) {
      top: var(--padding);
      left: var(--padding);
      z-index: 1;
    }
    #graph-candy css-doodle:nth-child(2) {
      top: var(--padding);
      right: var(--padding);
      z-index: 1;
    }
    #graph-candy css-doodle:nth-child(3) {
      top: calc(var(--padding) + var(--size) / 2);
      left: var(--padding);
      z-index: 3;
    }
    #graph-candy css-doodle:nth-child(4) {
      top: calc(var(--padding) + var(--size) / 2);
      right: var(--padding);
      z-index: 3;
    }
    #graph-candy css-doodle:nth-child(5) {
      top: calc(var(--padding) + var(--size));
      left: var(--padding);
      z-index: 2;
    }
    #graph-candy css-doodle:nth-child(6) {
      top: calc(var(--padding) + var(--size));
      right: var(--padding);
      z-index: 4;
    }
    #graph-candy css-doodle:nth-child(7) {
      top: calc(var(--padding) + var(--size) * 1.5);
      left: var(--padding);
      z-index: 1;
    }
    #graph-candy css-doodle:nth-child(8) {
      top: calc(var(--padding) + var(--size) * 1.5);
      right: var(--padding);
      z-index: 1;
    }
    #graph-candy css-doodle:nth-child(9) {
      top: var(--padding);
      left: calc(var(--padding) + var(--size) * 0.5);
    }
    #graph-candy css-doodle:nth-child(10) {
      top: calc(var(--padding) + var(--size) * 0.5);
      left: calc(var(--padding) + var(--size) * 0.5);
      z-index: 5;
    }
    #graph-candy css-doodle:nth-child(11) {
      top: calc(var(--padding) + var(--size) * 1);
      left: calc(var(--padding) + var(--size) * 0.5);
      z-index: 6;
    }
    #graph-candy css-doodle:nth-child(12) {
      top: calc(var(--padding) + var(--size) * 1.5);
      left: calc(var(--padding) + var(--size) * 0.5);
    }
  </style>
  <graph id="graph-candy">
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
    <css-doodle use="var(--rule-candy)" id="doodle"></css-doodle>
  </graph>
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
      <Link href="https://codepen.io/aragakey/full/ExdaawM">Candy</Link>
    </div>
  )
}

export default Gen
