import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Demo = () => {
  const [expanded, setExpanded] = useState(false)

  const handleEdit = () => {
    setExpanded((bool) => !bool)
  }

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm">
      <div
        className="relative w-[390px] h-[791px] overflow-hidden"
        style={{
          backgroundImage:
            "url(https://wxa.wxs.qq.com/wxad-design/yijie/list-tester-2.png)",
          backgroundSize: "100% auto",
          // zoom: 0.85,
        }}
      >
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 transition-all duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer"
          )}
        />
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full bg-white transition-all duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
            expanded ? "translate-y-0" : "translate-y-[451px] rounded-t-2xl"
          )}
        >
          <div
            className={cn(
              "relative h-16 transition-all duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              expanded ? "translate-y-[32px]" : "translate-y-0"
            )}
          >
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
          <div
            className={cn(
              "overflow-hidden transition-all",
              expanded ? "opacity-0 invisible" : "opacity-100 visible"
            )}
          >
            <div className="mx-8 mt-2 flex p-3 pb-4 bg-neutral-100 rounded-xl cursor-pointer transition-all active:bg-neutral-200 active:scale-[0.96]">
              <div>
                <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8.33366 6.66675H7.08366L8.417 9.33343H7.08366V10.3334H9.50024V11.2501H7.08366V12.2501H9.50024V13.7501H10.5002V12.2501H12.917V11.2501H10.5002V10.3334H12.917V9.33343H11.5837L12.917 6.66675H11.667L10.3337 9.33343H9.667L8.33366 6.66675Z"
                    fill="black"
                    fillOpacity="0.9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0003 18.3334C5.39795 18.3334 1.66699 14.6025 1.66699 10.0001C1.66699 5.39771 5.39795 1.66675 10.0003 1.66675C14.6027 1.66675 18.3337 5.39771 18.3337 10.0001C18.3337 14.6025 14.6027 18.3334 10.0003 18.3334ZM10.0003 17.3334C14.0504 17.3334 17.3337 14.0502 17.3337 10.0001C17.3337 5.94999 14.0504 2.66675 10.0003 2.66675C5.95024 2.66675 2.66699 5.94999 2.66699 10.0001C2.66699 14.0502 5.95024 17.3334 10.0003 17.3334Z"
                    fill="black"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <div className="flex-1 ml-2 mt-1">
                <div
                  className="font-medium text-base mb-[2px]"
                  onClick={handleEdit}
                >
                  修改价格
                </div>
                <div className="text-sm text-neutral-500">
                  若上调价格，需填写具体的原因，等待广告主同意后方可按新价格确认接单。
                </div>
              </div>
            </div>
            <div className="mx-8 mt-4 mb-10 flex p-3 pb-4 bg-neutral-100 rounded-xl cursor-pointer transition-all active:bg-neutral-200 active:scale-[0.96]">
              <div>
                <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12.593 6.70024L13.3002 7.40735L10.7074 10.0001L13.2667 12.5593L12.5596 13.2664L10.0003 10.7072L7.4076 13.2999L6.70049 12.5928L9.29323 10.0001L6.667 7.37384L7.37411 6.66674L10.0003 9.29296L12.593 6.70024Z"
                    fill="black"
                    fillOpacity="0.9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001ZM17.3337 10.0001C17.3337 14.0502 14.0504 17.3334 10.0003 17.3334C5.95024 17.3334 2.66699 14.0502 2.66699 10.0001C2.66699 5.94999 5.95024 2.66675 10.0003 2.66675C14.0504 2.66675 17.3337 5.94999 17.3337 10.0001Z"
                    fill="black"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <div className="flex-1 ml-2 mt-1">
                <div className="font-medium text-base mb-[2px]">拒绝订单</div>
                <div className="text-sm text-neutral-500">
                  若上调价格，需填写具体的原因，等待广告主同意后方可按新价格确认接单。
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "absolute top-20 left-0 transition-all pointer-events-none",
              expanded ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          >
            <img
              className="block w-full"
              src="https://wxa.wxs.qq.com/wxad-design/yijie/Frame1303098672.png"
            />
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
