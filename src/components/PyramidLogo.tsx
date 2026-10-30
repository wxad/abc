import { cn } from "@/lib/utils"

/**
 * 设计垂点 logo：线性描边的 3D 四棱锥。
 * 四个三角面（stroke only）绕竖轴转，面在换，保持 Lucide Pyramid 的线感。
 */
const FACE_Y = [0, 90, 180, 270] as const

const PyramidLogo = ({
  className,
}: {
  className?: string
}) => {
  return (
    <span
      className={cn(
        "relative inline-block aspect-square shrink-0 text-neutral-800",
        className,
      )}
      style={{
        perspective: "240px",
        perspectiveOrigin: "50% 35%",
      }}
      aria-hidden
    >
      <span className="abc-pyramid absolute inset-0 [transform-style:preserve-3d]">
        {FACE_Y.map((y) => (
          <svg
            key={y}
            className="abc-pyramid-face absolute left-[14%] top-[4%] h-[92%] w-[72%] overflow-visible"
            viewBox="0 0 100 100"
            fill="none"
            style={{
              transformOrigin: "50% 0%",
              transform: `rotateY(${y}deg) rotateX(68deg)`,
            }}
          >
            <polygon
              points="50,1 1,99 99,99"
              stroke="currentColor"
              strokeWidth="3.25"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </span>
    </span>
  )
}

export default PyramidLogo
