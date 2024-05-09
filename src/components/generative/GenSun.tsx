import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  const size = 800
  const height = 450
  const html = `
  <css-doodle>
  :doodle {
    flex: none;
    @grid: 2x4;
    @size: 300px 450px;
    border-radius: 5%;
    overflow: hidden;

    filter: @svg-filter(
      feTurbulence {
        type: fractalNoise;
        baseFrequency: .01 @r(0.1, 0.2);
      }
      feDisplacementMap {
        in: SourceGraphic;
        scale: @r(1, 2);
      }
    );
  }
  overflow: hidden;
  background: linear-gradient(#b31e0f calc(100% - @index * @index * 2.5%), #ffff00);
  --wave: rgba(255, 255, 255, 0.8);
  --waves: @m7(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(1, 4)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  --white: linear-gradient(#f4a0a0, rgba(169, 17, 17, calc(1 - @index * 0.02)) calc(15% * @index - 15%));

  ::before {
    content: "";
    @place: 50% calc(90% - @index * 8% + @r(±2%));
    @size: 40px;
    background: #f96118;
    border-bottom: 2px solid #eaea00;
    border-radius: 100%;
    transform: rotate(calc(-@index() * 15deg));
  }

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    @size: 100% 40%;
    background: var(--waves), var(--white);
  }

  @nth(3) {
    --waves:
      @m3(linear-gradient(90deg, @stripe(var(--wave) calc(50% + @r(±2.5%) - (5% + 10% * (@n() - 1)) / 2), transparent calc(5% + 10% * (@n() - 1)), var(--wave))) 0 calc(100% - (@n() + 4) * 12%) / 100% 1px no-repeat),
      @m4(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  }

  @nth(4, 5) {
    --waves:
      linear-gradient(90deg, @stripe(var(--wave) calc(50% + @r(±2.5%) - (5% + 10% * (3 - 1)) / 2), transparent calc(5% + 10% * (3 - 1)), var(--wave))) 0 calc(100% - (4 + 3) * 12%) / 100% 1px no-repeat,
      @m3(linear-gradient(90deg, @stripe(var(--wave) calc(50% + @r(±2.5%) - (5% + 10% * (@n() - 1)) / 2), transparent calc(5% + 10% * (@n() - 1)), var(--wave))) 0 calc(100% - (@n() + 3) * 12%) / 100% 1px no-repeat),
      @m3(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  }

  @nth(6) {
    --waves:
      @m5(linear-gradient(90deg, @stripe(var(--wave) calc(@r(±2.5%) + @pn(42.5, 37.5, 32.5, 37.5, 42.5)%), transparent @pn(15, 25, 35, 25, 15)%, var(--wave))) 0 calc(100% - (@n() + 2) * 12%) / 100% 1px no-repeat),
      @m2(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  }

  @nth(7) {
    --waves:
      @m2(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @pn(1, 7) * 12%) / 100% 1px no-repeat),
      @m5(linear-gradient(90deg, @stripe(var(--wave) calc(@r(±2.5%) + @pn(42.5, 37.5, 32.5, 37.5, 42.5)%), transparent @pn(15, 25, 35, 25, 15)%, var(--wave))) 0 calc(100% - (@n() + 1) * 12%) / 100% 1px no-repeat);
  }

  @nth(8) {
    --waves:
      @m2(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - (@n() + 5) * 12%) / 100% 1px no-repeat),
      @m5(linear-gradient(90deg, @stripe(var(--wave) calc(@r(±2.5%) + @pn(42.5, 37.5, 32.5, 37.5, 42.5)%), transparent @pn(15, 25, 35, 25, 15)%, var(--wave))) 0 calc(100% - (@n() + 0) * 12%) / 100% 1px no-repeat);
  }
</css-doodle>
<css-doodle>
  :doodle {
    flex: none;
    @grid: 2x4;
    @size: 300px 450px;
    border-radius: 5%;
    overflow: hidden;

    filter: @svg-filter(
      feTurbulence {
        type: fractalNoise;
        baseFrequency: .01 @r(0.1, 0.2);
      }
      feDisplacementMap {
        in: SourceGraphic;
        scale: @r(1, 2);
      }
    );
  }
  overflow: hidden;
  background: linear-gradient(180deg, #141335 calc(@index * 10% - 40%), #4b6aa3);
  --wave: rgba(255, 255, 255, 0.8);
  --waves: @m7(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(1, 4)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  --white: linear-gradient(rgb(107, 138, 173), rgba(34, 46, 67, calc(1 - (9 - @index) * 0.02)) calc(15% * (9 - @index) - 15%));

  ::before {
    content: "";
    @place: 50% calc(90% - (9 - @index) * 8% + @r(±2%));
    @size: 40px;
    background: #f96118;
    border-bottom: 2px solid #eaea00;
    border-radius: 100%;
    transform: rotate(calc(-@index * 15deg));
  }

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    @size: 100% 40%;
    background: var(--waves), var(--white);
  }

  @nth(6) {
    --waves:
      @m3(linear-gradient(90deg, @stripe(var(--wave) calc(50% + @r(±2.5%) - (5% + 10% * (@n() - 1)) / 2), transparent calc(5% + 10% * (@n() - 1)), var(--wave))) 0 calc(100% - (@n() + 4) * 12%) / 100% 1px no-repeat),
      @m4(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  }

  @nth(4, 5) {
    --waves:
      linear-gradient(90deg, @stripe(var(--wave) calc(50% + @r(±2.5%) - (5% + 10% * (3 - 1)) / 2), transparent calc(5% + 10% * (3 - 1)), var(--wave))) 0 calc(100% - (4 + 3) * 12%) / 100% 1px no-repeat,
      @m3(linear-gradient(90deg, @stripe(var(--wave) calc(50% + @r(±2.5%) - (5% + 10% * (@n() - 1)) / 2), transparent calc(5% + 10% * (@n() - 1)), var(--wave))) 0 calc(100% - (@n() + 3) * 12%) / 100% 1px no-repeat),
      @m3(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  }

  @nth(3) {
    --waves:
      @m5(linear-gradient(90deg, @stripe(var(--wave) calc(@r(±2.5%) + @pn(42.5, 37.5, 32.5, 37.5, 42.5)%), transparent @pn(15, 25, 35, 25, 15)%, var(--wave))) 0 calc(100% - (@n() + 2) * 12%) / 100% 1px no-repeat),
      @m2(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @n() * 12%) / 100% 1px no-repeat);
  }

  @nth(2) {
    --waves:
      @m2(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - @pn(1, 7) * 12%) / 100% 1px no-repeat),
      @m5(linear-gradient(90deg, @stripe(var(--wave) calc(@r(±2.5%) + @pn(42.5, 37.5, 32.5, 37.5, 42.5)%), transparent @pn(15, 25, 35, 25, 15)%, var(--wave))) 0 calc(100% - (@n() + 1) * 12%) / 100% 1px no-repeat);
  }

  @nth(1) {
    --waves:
      @m2(linear-gradient(90deg, @stripe(var(--wave) @r(10, 95)%, transparent @r(2, 5)%, var(--wave))) 0 calc(100% - (@n() + 5) * 12%) / 100% 1px no-repeat),
      @m5(linear-gradient(90deg, @stripe(var(--wave) calc(@r(±2.5%) + @pn(42.5, 37.5, 32.5, 37.5, 42.5)%), transparent @pn(15, 25, 35, 25, 15)%, var(--wave))) 0 calc(100% - (@n() + 0) * 12%) / 100% 1px no-repeat);
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
              height,
              transform: `scale(${scale})`,
            }}
            className="origin-top-left flex justify-center gap-4"
          />
        )}
      </div>
      <Link href="https://codepen.io/aragakey/full/poKzKQJ">sunrise & sunset</Link>
    </div>
  )
}

export default Gen
