"use client"

import React from "react"
import Popover from "../springen/Popover"
import DemoBox from "../DemoBox"

const Flip = () => {
  return (
    <div>
      <DemoBox className="px-0 pb-0 pt-48 flex items-center justify-center h-[240px] overflow-auto">
        <div className="flex-none flex flex-col gap-20 items-center justify-center w-[200%] pt-32 pb-40">
          <Popover
            visible
            popup="This is a popup.This is a popup."
            portal={false}
          >
            <button className="sticky left-1 px-2 py-1 text-black bg-white text-[13px] font-medium cursor-pointer rounded-md whitespace-nowrap">
              ↕️ flip + ↔️ shift
            </button>
          </Popover>
          <Popover
            visible
            popup={
              <div>
                This is a popup.
                <br />
                <br />
                This is a popup.
              </div>
            }
            placement="left"
            portal={false}
          >
            <button className="sticky bottom-1 px-2 py-1 text-black bg-white text-[13px] font-medium cursor-pointer rounded-md whitespace-nowrap">
              ↔️ flip + ↕️ shift
            </button>
          </Popover>
        </div>
      </DemoBox>
    </div>
  )
}

export default Flip
