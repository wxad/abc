import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Demo = () => (
  <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm">
    <HoverFill bgClassName="rounded-md">
      <button className="inline-flex items-center justify-center gap-0.5 h-9 px-3 text-sm">
        light-button
      </button>
    </HoverFill>
  </DemoBox>
)

export default Demo
