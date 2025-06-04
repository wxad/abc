"use client"

import React from "react"
import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Basics = () => {
  return (
    <div>
      <DemoBox className="flex justify-center p-10">
        <div className="w-[366px] max-w-[95%] bg-white">
          <div className="flex items-center justify-between px-5 h-[62px]">
            <div className="flex items-center">
              <HoverFill bgClassName="rounded-sm">
                <div className="flex items-center justify-center size-[30px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.38564 6.00727C7.09274 5.71437 6.61787 5.71437 6.32498 6.00727L6.00678 6.32547C5.71389 6.61836 5.71389 7.09323 6.00678 7.38613L10.6207 12L6.00678 16.6139C5.71389 16.9068 5.71389 17.3816 6.00678 17.6745L6.32498 17.9927C6.61787 18.2856 7.09274 18.2856 7.38564 17.9927L11.9995 13.3789L16.6134 17.9927C16.9063 18.2856 17.3811 18.2856 17.674 17.9927L17.9922 17.6745C18.2851 17.3816 18.2851 16.9068 17.9922 16.6139L13.3784 12L17.9922 7.38613C18.2851 7.09323 18.2851 6.61836 17.9922 6.32547L17.674 6.00727C17.3811 5.71437 16.9063 5.71437 16.6134 6.00727L11.9995 10.6211L7.38564 6.00727Z"
                      fill="#464749"
                    />
                  </svg>
                </div>
              </HoverFill>
              <i className="ml-3 mr-4 w-px h-[26px] bg-neutral-200" />
              <div className="text-[18px] font-semibold">自定义列表</div>
            </div>
            <HoverFill bgClassName="rounded-sm">
              <div className="flex items-center justify-center w-[46px] h-[30px] font-medium text-[13px] text-neutral-500">
                重置
              </div>
            </HoverFill>
          </div>
          <div className="flex items-center pl-6 h-[54px] text-sm bg-neutral-100 border-y border-neutral-200">
            默认列：创作者、亮点视频、亮点标签
          </div>
          <div className="p-3">
            {[
              "粉丝量级",
              "粉丝增长量",
              "粉丝增长率",
              "平均播放量",
              "播放中位数",
            ].map((item) => (
              <HoverFill bgClassName="rounded-lg" key={item}>
                <div className="flex items-center justify-between pl-3 pr-2 h-12 text-sm">
                  {item}
                  <div className="flex items-center justify-center size-8 rounded-sm hover:bg-neutral-200 transition-all">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0004 20.4446C13.4615 20.4446 11.1557 19.0515 9.08296 16.2654C8.96584 16.108 8.96584 15.8923 9.08296 15.7349C11.1557 12.9488 13.4615 11.5557 16.0004 11.5557C18.5393 11.5557 20.8451 12.9487 22.9179 15.7348C23.035 15.8922 23.035 16.1079 22.9179 16.2653C20.8451 19.0514 18.5393 20.4446 16.0004 20.4446ZM16.0004 19.1112C17.7186 19.1112 19.1115 17.7183 19.1115 16.0001C19.1115 14.2819 17.7186 12.889 16.0004 12.889C14.2822 12.889 12.8893 14.2819 12.8893 16.0001C12.8893 17.7183 14.2822 19.1112 16.0004 19.1112ZM16.0004 17.7779C15.0186 17.7779 14.2226 16.9819 14.2226 16.0001C14.2226 15.0183 15.0186 14.2223 16.0004 14.2223C16.9823 14.2223 17.7782 15.0183 17.7782 16.0001C17.7782 16.9819 16.9823 17.7779 16.0004 17.7779Z"
                        fill="#296BEF"
                      />
                    </svg>
                  </div>
                </div>
              </HoverFill>
            ))}
          </div>
        </div>
      </DemoBox>
    </div>
  )
}

export default Basics
