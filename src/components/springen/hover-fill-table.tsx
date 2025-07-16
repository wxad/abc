import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Demo = () => (
  <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm">
    <div className="bg-white w-full">
      <div className="flex items-center justify-between pl-6 pr-4 h-[68px] border-b border-neutral-100">
        <div className="text-[18px] font-semibold">已选达人</div>
        <div className="flex">
          <HoverFill bgClassName="rounded-md">
            <div className="inline-flex items-center justify-center gap-0.5 h-9 px-3 text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8.65 3C8.65 2.72386 8.42614 2.5 8.15 2.5H7.85C7.57386 2.5 7.35 2.72386 7.35 3V7.35H3C2.72386 7.35 2.5 7.57386 2.5 7.85V8.15C2.5 8.42614 2.72386 8.65 3 8.65H7.35V13C7.35 13.2761 7.57386 13.5 7.85 13.5H8.15C8.42614 13.5 8.65 13.2761 8.65 13V8.65H13C13.2761 8.65 13.5 8.42614 13.5 8.15V7.85C13.5 7.57386 13.2761 7.35 13 7.35H8.65V3Z"
                  fill="#464749"
                />
              </svg>
              添加达人
            </div>
          </HoverFill>
          <HoverFill bgClassName="rounded-md">
            <div className="inline-flex items-center justify-center gap-0.5 h-9 px-3 text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <mask id="path-1-inside-1_1118_48610" fill="white">
                  <rect x="2" y="2" width="11" height="12" rx="0.8" />
                </mask>
                <rect
                  x="2"
                  y="2"
                  width="11"
                  height="12"
                  rx="0.8"
                  stroke="black"
                  strokeWidth="2"
                  mask="url(#path-1-inside-1_1118_48610)"
                />
                <rect x="8" y="8" width="7" height="7" fill="#F7F7F7" />
                <path d="M4 5H11" stroke="black" />
                <path d="M4 7.5H11" stroke="black" />
                <path d="M4 10H8" stroke="black" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5 12.5V15H12.5V12.5H15V11.5H12.5V9H11.5V11.5H9V12.5H11.5Z"
                  fill="black"
                />
              </svg>
              从名单添加
            </div>
          </HoverFill>
        </div>
      </div>
      <div className="flex items-center justify-between pl-6 pr-5 h-10 bg-neutral-50 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <img
            className="size-5 rounded-full"
            src="https://images.unsplash.com/photo-1744219792921-a74da6141822?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="text-sm font-semibold">微品牌</div>
        </div>
        <HoverFill bgClassName="rounded-xs">
          <div className="flex items-center justify-center size-[26px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 5V15C14 15.5523 13.5523 16 13 16H5C4.44772 16 4 15.5523 4 15V5H2.5C2.22386 5 2 4.77614 2 4.5V4C2 3.72386 2.22386 3.5 2.5 3.5H6V2.5C6 2.22386 6.22386 2 6.5 2H11.5C11.7761 2 12 2.22386 12 2.5V3.5H15.5C15.7761 3.5 16 3.72386 16 4V4.5C16 4.77614 15.7761 5 15.5 5H14ZM5.5 5V14.5H12.5V5H5.5ZM7 6.5H8.5V13H7V6.5ZM9.5 6.5H11V13H9.5V6.5Z"
                fill="#455066"
                fillOpacity="0.25"
              />
            </svg>
          </div>
        </HoverFill>
      </div>
      <div className="flex">
        <div className="w-[128px] border-r border-neutral-100">
          <div className="flex items-center pl-6 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            视频时长
          </div>
          <div className="h-[44px] border-b border-neutral-100">
            <div className="ml-2 p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm">1至60秒</div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9834 6.32322C13.081 6.42085 13.081 6.57915 12.9834 6.67678L8.17505 11.4851C8.07742 11.5827 7.91913 11.5827 7.8215 11.4851L3.01317 6.67678C2.91554 6.57915 2.91554 6.42086 3.01317 6.32322L3.57886 5.75754C3.67649 5.65991 3.83478 5.65991 3.93241 5.75754L7.99828 9.8234L12.0641 5.75754C12.1618 5.65991 12.3201 5.65991 12.4177 5.75754L12.9834 6.32322Z"
                      fill="#3E4552"
                      fillOpacity="0.36"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
          <div className="h-[44px]">
            <div className="ml-2 p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm">60秒以上</div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9834 6.32322C13.081 6.42085 13.081 6.57915 12.9834 6.67678L8.17505 11.4851C8.07742 11.5827 7.91913 11.5827 7.8215 11.4851L3.01317 6.67678C2.91554 6.57915 2.91554 6.42086 3.01317 6.32322L3.57886 5.75754C3.67649 5.65991 3.83478 5.65991 3.93241 5.75754L7.99828 9.8234L12.0641 5.75754C12.1618 5.65991 12.3201 5.65991 12.4177 5.75754L12.9834 6.32322Z"
                      fill="#3E4552"
                      fillOpacity="0.36"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
        </div>
        <div className="flex-1 border-r border-neutral-100">
          <div className="flex items-center pl-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            额外服务
          </div>
          <div className="h-[44px] border-b border-neutral-100">
            <div className="p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm text-neutral-500">
                    选填额外服务
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9834 6.32322C13.081 6.42085 13.081 6.57915 12.9834 6.67678L8.17505 11.4851C8.07742 11.5827 7.91913 11.5827 7.8215 11.4851L3.01317 6.67678C2.91554 6.57915 2.91554 6.42086 3.01317 6.32322L3.57886 5.75754C3.67649 5.65991 3.83478 5.65991 3.93241 5.75754L7.99828 9.8234L12.0641 5.75754C12.1618 5.65991 12.3201 5.65991 12.4177 5.75754L12.9834 6.32322Z"
                      fill="#3E4552"
                      fillOpacity="0.36"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
          <div className="h-[44px]">
            <div className="p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm">出镜拍摄</div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9834 6.32322C13.081 6.42085 13.081 6.57915 12.9834 6.67678L8.17505 11.4851C8.07742 11.5827 7.91913 11.5827 7.8215 11.4851L3.01317 6.67678C2.91554 6.57915 2.91554 6.42086 3.01317 6.32322L3.57886 5.75754C3.67649 5.65991 3.83478 5.65991 3.93241 5.75754L7.99828 9.8234L12.0641 5.75754C12.1618 5.65991 12.3201 5.65991 12.4177 5.75754L12.9834 6.32322Z"
                      fill="#3E4552"
                      fillOpacity="0.36"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
        </div>
        <div className="w-[240px] border-r border-neutral-100">
          <div className="flex items-center pl-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            期望发表时间段
          </div>
          <div className="h-[44px] border-b border-neutral-100">
            <div className="p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm text-neutral-500">
                    请选择期望发表的时间段
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 1C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1H2ZM14 2.07692H2V13.9231H14V2.07692Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M2 5H14V6H2V5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4.5 0C4.77614 1.20706e-08 5 0.223858 5 0.5L5 3.5C5 3.77614 4.77614 4 4.5 4C4.22386 4 4 3.77614 4 3.5V0.5C4 0.223858 4.22386 -1.20706e-08 4.5 0Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M11.5 0C11.7761 1.20706e-08 12 0.223858 12 0.5V3.5C12 3.77614 11.7761 4 11.5 4C11.2239 4 11 3.77614 11 3.5V0.5C11 0.223858 11.2239 -1.20706e-08 11.5 0Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4 11.5C4 11.2239 4.22386 11 4.5 11H11.5C11.7761 11 12 11.2239 12 11.5C12 11.7761 11.7761 12 11.5 12H4.5C4.22386 12 4 11.7761 4 11.5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4 8.5C4 8.22386 4.22386 8 4.5 8H11.5C11.7761 8 12 8.22386 12 8.5C12 8.77614 11.7761 9 11.5 9H4.5C4.22386 9 4 8.77614 4 8.5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
          <div className="h-[44px]">
            <div className="p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm">2025-03-11 ~ 2025-03-31</div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 1C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1H2ZM14 2.07692H2V13.9231H14V2.07692Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M2 5H14V6H2V5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4.5 0C4.77614 1.20706e-08 5 0.223858 5 0.5L5 3.5C5 3.77614 4.77614 4 4.5 4C4.22386 4 4 3.77614 4 3.5V0.5C4 0.223858 4.22386 -1.20706e-08 4.5 0Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M11.5 0C11.7761 1.20706e-08 12 0.223858 12 0.5V3.5C12 3.77614 11.7761 4 11.5 4C11.2239 4 11 3.77614 11 3.5V0.5C11 0.223858 11.2239 -1.20706e-08 11.5 0Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4 11.5C4 11.2239 4.22386 11 4.5 11H11.5C11.7761 11 12 11.2239 12 11.5C12 11.7761 11.7761 12 11.5 12H4.5C4.22386 12 4 11.7761 4 11.5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4 8.5C4 8.22386 4.22386 8 4.5 8H11.5C11.7761 8 12 8.22386 12 8.5C12 8.77614 11.7761 9 11.5 9H4.5C4.22386 9 4 8.77614 4 8.5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
        </div>
        <div className="w-[120px] border-r border-neutral-100">
          <div className="flex items-center justify-end pl-4 pr-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            合作报价
          </div>
          <div className="h-[44px] border-b border-neutral-100">
            <div className="flex items-center pr-4 justify-end h-[44px] text-sm">
              ￥60,000
            </div>
          </div>
          <div className="h-[44px]">
            <div className="flex items-center pr-4 justify-end h-[44px] text-sm">
              ￥8,888,888
            </div>
          </div>
        </div>
        <div className="w-[84px]">
          <div className="flex items-center pl-[30px] pr-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            操作
          </div>
          <div className="flex items-center pl-3 h-[44px] border-b border-neutral-100">
            <HoverFill bgClassName="rounded-xs">
              <div className="flex items-center justify-center size-[26px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM5 8.25V9.75H13V8.25H5Z"
                    fill="#455066"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>
            </HoverFill>
            <HoverFill bgClassName="rounded-xs">
              <div className="flex items-center justify-center size-[26px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 8.25H5V9.75H8.25V13H9.75V9.75H13V8.25H9.75V5H8.25V8.25Z"
                    fill="#455066"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>
            </HoverFill>
          </div>
          <div className="flex items-center pl-3 h-[44px] border-b border-neutral-100">
            <HoverFill bgClassName="rounded-xs">
              <div className="flex items-center justify-center size-[26px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM5 8.25V9.75H13V8.25H5Z"
                    fill="#455066"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>
            </HoverFill>
            <HoverFill bgClassName="rounded-xs">
              <div className="flex items-center justify-center size-[26px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 8.25H5V9.75H8.25V13H9.75V9.75H13V8.25H9.75V5H8.25V8.25Z"
                    fill="#455066"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>
            </HoverFill>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pl-6 pr-5 h-10 bg-neutral-50 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <img
            className="size-5 rounded-full"
            src="https://images.unsplash.com/photo-1744219792921-a74da6141822?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="text-sm font-semibold">菜菜美食日记</div>
        </div>
        <HoverFill bgClassName="rounded-xs">
          <div className="flex items-center justify-center size-[26px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 5V15C14 15.5523 13.5523 16 13 16H5C4.44772 16 4 15.5523 4 15V5H2.5C2.22386 5 2 4.77614 2 4.5V4C2 3.72386 2.22386 3.5 2.5 3.5H6V2.5C6 2.22386 6.22386 2 6.5 2H11.5C11.7761 2 12 2.22386 12 2.5V3.5H15.5C15.7761 3.5 16 3.72386 16 4V4.5C16 4.77614 15.7761 5 15.5 5H14ZM5.5 5V14.5H12.5V5H5.5ZM7 6.5H8.5V13H7V6.5ZM9.5 6.5H11V13H9.5V6.5Z"
                fill="#455066"
                fillOpacity="0.25"
              />
            </svg>
          </div>
        </HoverFill>
      </div>
      <div className="flex">
        <div className="w-[128px] border-r border-neutral-100">
          <div className="flex items-center pl-6 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            视频时长
          </div>
          <div className="h-[44px]">
            <div className="ml-2 p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm">1至60秒</div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9834 6.32322C13.081 6.42085 13.081 6.57915 12.9834 6.67678L8.17505 11.4851C8.07742 11.5827 7.91913 11.5827 7.8215 11.4851L3.01317 6.67678C2.91554 6.57915 2.91554 6.42086 3.01317 6.32322L3.57886 5.75754C3.67649 5.65991 3.83478 5.65991 3.93241 5.75754L7.99828 9.8234L12.0641 5.75754C12.1618 5.65991 12.3201 5.65991 12.4177 5.75754L12.9834 6.32322Z"
                      fill="#3E4552"
                      fillOpacity="0.36"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
        </div>
        <div className="flex-1 border-r border-neutral-100">
          <div className="flex items-center pl-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            额外服务
          </div>
          <div className="h-[44px]">
            <div className="p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm text-neutral-500">
                    选填额外服务
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9834 6.32322C13.081 6.42085 13.081 6.57915 12.9834 6.67678L8.17505 11.4851C8.07742 11.5827 7.91913 11.5827 7.8215 11.4851L3.01317 6.67678C2.91554 6.57915 2.91554 6.42086 3.01317 6.32322L3.57886 5.75754C3.67649 5.65991 3.83478 5.65991 3.93241 5.75754L7.99828 9.8234L12.0641 5.75754C12.1618 5.65991 12.3201 5.65991 12.4177 5.75754L12.9834 6.32322Z"
                      fill="#3E4552"
                      fillOpacity="0.36"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
        </div>
        <div className="w-[240px] border-r border-neutral-100">
          <div className="flex items-center pl-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            期望发表时间段
          </div>
          <div className="h-[44px]">
            <div className="p-1">
              <HoverFill bgClassName="rounded">
                <div className="flex items-center px-3 h-9">
                  <div className="flex-1 text-sm text-neutral-500">
                    请选择期望发表的时间段
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 1C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1H2ZM14 2.07692H2V13.9231H14V2.07692Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M2 5H14V6H2V5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4.5 0C4.77614 1.20706e-08 5 0.223858 5 0.5L5 3.5C5 3.77614 4.77614 4 4.5 4C4.22386 4 4 3.77614 4 3.5V0.5C4 0.223858 4.22386 -1.20706e-08 4.5 0Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M11.5 0C11.7761 1.20706e-08 12 0.223858 12 0.5V3.5C12 3.77614 11.7761 4 11.5 4C11.2239 4 11 3.77614 11 3.5V0.5C11 0.223858 11.2239 -1.20706e-08 11.5 0Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4 11.5C4 11.2239 4.22386 11 4.5 11H11.5C11.7761 11 12 11.2239 12 11.5C12 11.7761 11.7761 12 11.5 12H4.5C4.22386 12 4 11.7761 4 11.5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                    <path
                      d="M4 8.5C4 8.22386 4.22386 8 4.5 8H11.5C11.7761 8 12 8.22386 12 8.5C12 8.77614 11.7761 9 11.5 9H4.5C4.22386 9 4 8.77614 4 8.5Z"
                      fill="#33373D"
                      fillOpacity="0.58"
                    />
                  </svg>
                </div>
              </HoverFill>
            </div>
          </div>
        </div>
        <div className="w-[120px] border-r border-neutral-100">
          <div className="flex items-center justify-end pl-4 pr-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            合作报价
          </div>
          <div className="h-[44px]">
            <div className="flex items-center pr-4 justify-end h-[44px] text-sm">
              ￥60,000
            </div>
          </div>
        </div>
        <div className="w-[84px]">
          <div className="flex items-center pl-[30px] pr-4 h-[44px] text-neutral-500 text-sm border-b border-neutral-100">
            操作
          </div>
          <div className="flex items-center pl-3 h-[44px]">
            <HoverFill bgClassName="rounded-xs">
              <div className="flex items-center justify-center size-[26px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM5 8.25V9.75H13V8.25H5Z"
                    fill="#455066"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>
            </HoverFill>
            <HoverFill bgClassName="rounded-xs">
              <div className="flex items-center justify-center size-[26px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 8.25H5V9.75H8.25V13H9.75V9.75H13V8.25H9.75V5H8.25V8.25Z"
                    fill="#455066"
                    fillOpacity="0.25"
                  />
                </svg>
              </div>
            </HoverFill>
          </div>
        </div>
      </div>
    </div>
  </DemoBox>
)

export default Demo
