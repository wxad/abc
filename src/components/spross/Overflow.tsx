import DemoBox from "../DemoBox"
import Popover from "../springen/Popover"

const Demo = () => (
  <DemoBox className="px-0 pt-8 h-[200px] flex items-center justify-center">
    <div className="flex-none flex items-center justify-center w-[200%] py-32">
      <Popover visible popup="This is a popup.This is a popup.">
        <button className="sticky left-0 px-2 py-1 text-black bg-white text-[13px] font-medium cursor-pointer rounded-md whitespace-nowrap">
          Inner scrollable
        </button>
      </Popover>
    </div>
  </DemoBox>
)

export default Demo
