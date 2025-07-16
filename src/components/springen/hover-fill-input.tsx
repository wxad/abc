import { useState } from "react"
import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Demo = () => {
  const [value, setValue] = useState(
    `${new Date().toLocaleDateString()} - ${new Date().toLocaleDateString()}`
  )

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm">
      <HoverFill bgClassName="rounded-md">
        <div>
          <input
            className="p-2 w-[204px] h-[30px] bg-transparent outline-hidden transition-colors focus:bg-white focus:shadow-[0_0_0_1px_black] rounded-md"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2"
            data-spross-date-picker-icon
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              fillRule="evenodd"
              d="M3.5 6.5H14.5V5.5H3.5V6.5ZM3.5 8V14.5H14.5V8H3.5ZM13.5 4H14.9932C15.5492 4 16 4.45576 16 5.00247V14.9975C16 15.5512 15.5501 16 14.9932 16H3.00685C2.45078 16 2 15.5442 2 14.9975V5.00247C2 4.44882 2.44995 4 3.00685 4H4.5V2.25578C4.5 2.11452 4.6177 2 4.74769 2H5.75231C5.8891 2 6 2.11394 6 2.25578V4H12V2.25578C12 2.11452 12.1177 2 12.2477 2H13.2523C13.3891 2 13.5 2.11394 13.5 2.25578V4ZM5.25 9.25H6.75V10.75H5.25V9.25ZM8.25 9.25H9.75V10.75H8.25V9.25ZM11.25 9.25H12.75V10.75H11.25V9.25ZM5.25 12H6.75V13.5H5.25V12ZM8.25 12H9.75V13.5H8.25V12ZM11.25 12H12.75V13.5H11.25V12Z"
            />
          </svg>
        </div>
      </HoverFill>
    </DemoBox>
  )
}

export default Demo
