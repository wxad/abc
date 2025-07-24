"use client"

import React from "react"
import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Basics = () => {
  return (
    <div>
      <DemoBox className="flex justify-center p-10">
        <div className="w-[280px] text-sm">
          <HoverFill bgClassName="rounded">
            <div className="flex items-center px-2 gap-2 h-8">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="m1 9.5.826-3.717A1 1 0 0 1 2.802 5H13V4H7.125A1.125 1.125 0 0 1 6 2.875V2H1v7.5zm.247 3.5h11.95l1.556-7H2.803l-1.556 7zM13 14H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.25a.75.75 0 0 1 .75.75v1.125c0 .069.056.125.125.125H13a1 1 0 0 1 1 1v1h.753a1 1 0 0 1 .977 1.217l-1.556 7a1 1 0 0 1-.976.783H13z"></path>
              </svg>
              Item One
            </div>
          </HoverFill>
          <HoverFill className="ml-6" bgClassName="rounded">
            <div className="flex items-center px-2 gap-2 h-8">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M3 2a1 1 0 0 1 1-1h4.707L13 5.293V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2Zm5 0H4v12h8V6H9a1 1 0 0 1-1-1V2Zm1 .707L11.293 5H9V2.707Z"
                  clipRule="evenodd"
                />
              </svg>
              Item A
            </div>
          </HoverFill>
          <HoverFill className="ml-6" bgClassName="rounded">
            <div className="flex items-center px-2 gap-2 h-8">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="m8 10.293 5.646-5.647.708.708L8 11.707 1.646 5.354l.708-.708L8 10.293Z"
                  clipRule="evenodd"
                />
              </svg>
              Item B
            </div>
          </HoverFill>
          <HoverFill className="ml-12" bgClassName="rounded">
            <div>
              <div className="flex items-center px-2 gap-2 h-8">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M3 2a1 1 0 0 1 1-1h4.707L13 5.293V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2Zm5 0H4v12h8V6H9a1 1 0 0 1-1-1V2Zm1 .707L11.293 5H9V2.707Z"
                    clipRule="evenodd"
                  />
                </svg>
                Item B - 1
              </div>
            </div>
          </HoverFill>
          <HoverFill className="ml-12" bgClassName="rounded">
            <div>
              <div className="flex items-center px-2 gap-2 h-8">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M3 2a1 1 0 0 1 1-1h4.707L13 5.293V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2Zm5 0H4v12h8V6H9a1 1 0 0 1-1-1V2Zm1 .707L11.293 5H9V2.707Z"
                    clipRule="evenodd"
                  />
                </svg>
                Item B - 2
              </div>
            </div>
          </HoverFill>
          <HoverFill bgClassName="rounded">
            <div className="flex items-center px-2 gap-2 h-8">Item Two</div>
          </HoverFill>
        </div>
      </DemoBox>
    </div>
  )
}

export default Basics
