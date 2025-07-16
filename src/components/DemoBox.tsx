import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface IDemoBoxProps extends React.HTMLProps<HTMLDivElement> {
  status?: "correct" | "wrong"
}

const DemoBox: React.FC<IDemoBoxProps> = forwardRef(
  ({ children, className = "", style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mt-4 mb-8 bg-size-[40px_40px] border border-gray-300 rounded-md overflow-auto scrollbar-custom",
          className
        )}
        style={{
          backgroundImage: "url(/abc/grid.svg)",
          ...style,
        }}
      >
        {children}
      </div>
    )
  }
)

export default DemoBox
