import { useState } from "react"
import DemoBox from "../DemoBox"
import Popover from "../springen/Popover"

const Demo = () => {
  const [maxHeight, setMaxHeight] = useState(0)

  return (
    <DemoBox className="p-0 h-[300px] overflow-auto block">
      <div className="flex-none flex flex-col gap-20 items-center justify-center py-[250px]">
        <Popover
          visible
          arrowed={false}
          popupStyle={{ padding: 0 }}
          popup={
            <div
              className="w-[200px] overflow-auto scrollbar-custom"
              style={{ maxHeight }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center pl-2 h-9">
                  name {index + 1}
                </div>
              ))}
            </div>
          }
          portal={false}
          autoPlacements={["topRight", "bottomRight"]}
          size={({ availableHeight }) => {
            setMaxHeight(availableHeight - 30)
          }}
        >
          <button className="button">list</button>
        </Popover>
      </div>
    </DemoBox>
  )
}

export default Demo
