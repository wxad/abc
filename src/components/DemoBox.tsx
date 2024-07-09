import { forwardRef } from "react"

export interface IDemoBoxProps extends React.HTMLProps<HTMLDivElement> {
  status?: "correct" | "wrong"
}

const DemoBox: React.FC<IDemoBoxProps> = forwardRef(
  ({ children, className = "", style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative mt-4 mb-8 bg-[length:40px_40px] border border-gray-300 rounded-md overflow-auto ${className}`}
        style={{
          backgroundImage: "url(/abc/grid.svg)",
          ...style
        }}
      >
        {children}
      </div>
    )
  }
)

export default DemoBox
