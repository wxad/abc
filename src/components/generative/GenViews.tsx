import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 800
  const height = 320
  const html = `
  <style>
  #view-wrapper {
    position: relative;
    max-width: 800px;
    max-height: 320px;
    width: 100%;
  }
  
  #view-wrapper::before {
    content: "";
    display: block;
    padding-top: 40%;
    height: 0;
  }
  
  #view-wrapper content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    padding: calc(0.5px * 400 / 150);
    gap: calc(0.5px * 400 / 150);
    grid-template-columns: repeat(3, 1fr);
  }
css-doodle {
  --rule-view: (
    :doodle {
      @grid: 17x1 / 100% 100%; 
      overflow: hidden;
      border: calc(0.2px * 400 / 150) solid #000;
      background: @var(--sky);
    }
    @nth(1) {
      position: absolute;
      @place-cell: @m2(@r(0, 100)%);
      @size: @r(8px, 52px) @lr;
      ::before, ::after {
        content: "";
        position: absolute;
        @place-cell: 0 0;
        @size: 100% 100%;
        background: @var(--sun);
        border-radius: 100%;
      }
      ::before {
        opacity: 0.25;
        transform: scale(@r(1.01, 1.5));
      }
      ::after {
        border: 1px solid #000;
      }
    }
    @nth(2, 3, 4, 5, 6, 7) {
      position: absolute;
      left: @r(0, 100)%;
      bottom: 0;
      @size:@r(21.2px, 52px) @lr;
      background: @var(--mountain);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(-30deg, 30deg), @lr);
    }
    @nth(8, 9, 10, 11, 12, 13, 14, 15, 16, 17) {
      position: absolute;
      left: @r(0, 100)%;
      bottom: 0;
      @size:@r(2.6px, 16px) @lr;
      background: @var(--tree);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(30, 40deg), @lr);
    }
  );
  --rule-view-a: (:doodle {--sun: #f0943a; --sky: #3d2333; --mountain: #452340; --tree: #e284af;});
  --rule-view-b: (:doodle {--sun: #de6b70; --sky: #f0e87f; --mountain: #6a73c2; --tree: #9596be;});
  --rule-view-c: (:doodle {--sun: #f0e87f; --sky: #57b2cf; --mountain: #c79498; --tree: #9596be;});
  --rule-view-d: (:doodle {--sun: #f0933b; --sky: #de6b6f; --mountain: #85616e; --tree: #b14b34;});
  --rule-view-e: (:doodle {--sun: #f0e87f; --sky: #0e1116; --mountain: #c89598; --tree: #e284af;});
  --rule-view-f: (:doodle {--sun: #f0f0f0; --sky: #eacdb1; --mountain: #f5aeb2; --tree: #b04b35;});
  --rule-view-g: (:doodle {--sun: #f0f0f0; --sky: #57b2cf; --mountain: #85616e; --tree: #452340;});
  --rule-view-h: (:doodle {--sun: #f0f0f0; --sky: #de6b6f; --mountain: #f5aeb2; --tree: #e284ae;});
  --rule-view-i: (:doodle {--sun: #f0f0f0; --sky: #25272b; --mountain: #452340; --tree: #85616e;});
}
</style>
    <wrapper id="view-wrapper">
      <content>
        <css-doodle use="var(--rule-view-a), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-b), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-c), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-d), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-e), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-f), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-g), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-h), var(--rule-view)"></css-doodle>
        <css-doodle use="var(--rule-view-i), var(--rule-view)"></css-doodle>
      </content>
    </wrapper>
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
              height: height,
              transform: `scale(${scale})`,
            }}
            className="origin-top-left"
          />
        )}
      </div>
      <Link href="https://codepen.io/aragakey/full/VwyYpgx">Views</Link>
    </div>
  )
}

export default Gen
