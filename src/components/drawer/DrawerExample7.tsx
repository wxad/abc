import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Demo = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm">
      <div
        className="relative w-[390px] h-[791px] overflow-hidden"
        style={
          {
            // zoom: 0.85,
          }
        }
      >
        <div className="absolute inset-0 bg-[#ededed] overflow-hidden">
          <img
            src="https://wxa.wxs.qq.com/wxad-design/yijie/Navbar-2x.png"
            className="absolute top-[47px] left-0 w-full"
          />
          <div className="px-9">
            <div className="mb-4 pt-[139px] text-[19px] font-medium">
              广告主已确认，请正式发表视频
            </div>
            <div className="text-neutral-500 text-sm">
              正式发表前，若需修改视频，请在电脑端操作（修改后将重新发起审核确认流程）操作指引
            </div>
            <div className="mt-16 p-5 h-44 bg-white rounded-xl">
              <div className="mt-5 w-1/2 bg-neutral-200 h-5 rounded-sm" />
              <div className="mt-5 bg-neutral-100 h-3 rounded-sm" />
              <div className="mt-2 bg-neutral-100 h-3 rounded-sm" />
              <div className="mt-2 w-1/2 bg-neutral-100 h-3 rounded-sm" />
            </div>
          </div>
          <div
            className="absolute-full overflow-hidden origin-top"
            // ref={bg}
          >
            {/* <img
              src="https://wxa.wxs.qq.com/wxad-design/yijie/list-tester-2.png"
              alt=""
              className="absolute top-0 left-0 w-full cursor-pointer"
              // onClick={handleFirstClick}
            /> */}
            <div
              className="absolute-full bg-black opacity-0 pointer-events-none"
              // ref={bgCover}
            />
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full bg-black/25 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer",
                expanded && "opacity-100"
              )}
              onClick={() => {
                setExpanded((bool) => !bool)
              }}
            />
            <div
              className={cn(
                "absolute bottom-0 left-0 w-full bg-white rounded-t-2xl transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]",
                expanded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[30%] opacity-0"
              )}
            >
              <div className="relative h-16">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  className="absolute top-5 left-4 cursor-pointer"
                  onClick={() => {
                    setExpanded((bool) => !bool)
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9987 13.9033L5.55857 20.3421L4.49801 19.2814L10.9379 12.8427L4.49707 6.40301L5.55763 5.34225L11.9987 11.7821L18.4423 5.33972L19.5029 6.40048L13.0594 12.8427L19.5029 19.285L18.4424 20.3458L11.9987 13.9033Z"
                    fill="black"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <div className="mb-3 text-center text-[17px] font-medium">
                确定正式发表视频
              </div>
              <div className="text-center text-sm">
                发表视频到 “是绒绒呀” 的视频号
              </div>
              <img
                src="https://wxa.wxs.qq.com/wxad-design/yijie/channel-preview-3_4-1.png"
                alt=""
                className="block mt-6 mb-10 w-[154px] mx-auto"
              />
              <div className="flex items-center justify-center gap-4 pb-[64px]">
                <div className="h-[48px]" />
              </div>
            </div>
            <div
              className={cn(
                "absolute left-[32px] bottom-[42px] flex items-center justify-center h-[48px] rounded-[8px] text-black bg-[#e5e5e5] text-[14px] font-medium cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-left",
                expanded
                  ? "w-[156px] translate-y-[-22px] opacity-100"
                  : "w-[40px] translate-y-0 opacity-0"
              )}
              onClick={() => {
                setExpanded((bool) => !bool)
              }}
            >
              取消
            </div>
            <div
              className={cn(
                "absolute right-[32px] bottom-[42px] flex items-center justify-center w-[326px] h-[48px] rounded-[8px] text-white text-[14px] font-medium bg-[#FA9D3B] cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-left",
                expanded && "w-[156px] translate-y-[-22px]"
              )}
              onClick={() => {
                setExpanded((bool) => !bool)
              }}
            >
              发表
            </div>
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
