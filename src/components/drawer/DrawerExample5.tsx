import { useRef } from "react"
import DemoBox from "../DemoBox"

const Demo = () => {
  const bg = useRef<HTMLDivElement>(null)
  const bgCover = useRef<HTMLDivElement>(null)
  const statusBar = useRef<HTMLImageElement>(null)
  const drawer = useRef<HTMLDivElement>(null)
  const drawerSecond = useRef<HTMLDivElement>(null)
  const drawerThird = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const secondContainer = useRef<HTMLDivElement>(null)
  const thirdContainer = useRef<HTMLDivElement>(null)
  const secondButtons = useRef<HTMLDivElement>(null)
  const secondTitle = useRef<HTMLDivElement>(null)
  const thirdTitle = useRef<HTMLDivElement>(null)
  const thirdDivider = useRef<HTMLDivElement>(null)
  const thirdButtons = useRef<HTMLDivElement>(null)
  const icon = useRef<SVGSVGElement>(null)
  const handleFirstClick = () => {
    if (
      !bg.current ||
      !statusBar.current ||
      !drawer.current ||
      !bgCover.current
    ) {
      return
    }
    bgCover.current.style.transition =
      "all 0.55s cubic-bezier(0.32, 0.72, 0, 1)"
    bgCover.current.style.opacity = "0.3"

    drawer.current.style.transition = "all 0.55s cubic-bezier(0.32, 0.72, 0, 1)"
    drawer.current.style.transform = "translate3d(0, -100%, 0)"
  }

  const handleBackSecondClick = (e) => {
    e.stopPropagation()
    drawer.current.style.transform = "translate3d(0, -100%, 0)"
    drawerThird.current.style.transform = "translate3d(0, 0, 0)"

    drawer.current.style.zIndex = "1"
    drawerThird.current.style.zIndex = "0"
  }

  const handleSecondClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation()
    if (icon.current.style.transform) {
      drawer.current.style.transform = ""
      drawerThird.current.style.transform = ""
    } else {
      bgCover.current.style.opacity = ""

      bg.current.style.transform = ""
      bg.current.style.borderRadius = ""

      statusBar.current.style.filter = ""

      drawer.current.style.transform = ""
    }
  }

  const handleToThirdClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()

    drawer.current.style.transform = "translate3d(0, 0, 0)"
    drawerThird.current.style.transform = "translate3d(0, -100%, 0)"

    drawer.current.style.zIndex = "0"
    drawerThird.current.style.zIndex = "1"

    drawer.current.style.transition = "all 0.5s cubic-bezier(0.32, 0.72, 0, 1)"
    drawerThird.current.style.transition =
      "all 0.5s cubic-bezier(0.32, 0.72, 0, 1)"
  }

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm">
      <div
        className="relative w-[404.8px] h-[820px] overflow-hidden"
        style={{
          backgroundImage:
            "url(https://wxa.wxs.qq.com/wxad-design/yijie/iphone14.png)",
          backgroundSize: "cover",
          zoom: 0.85,
        }}
      >
        <div className="absolute inset-[18px] rounded-[48px] bg-black overflow-hidden">
          <div
            className="absolute-full rounded-[48px] overflow-hidden origin-top"
            ref={bg}
          >
            <img
              src="https://wxa.wxs.qq.com/wxad-design/yijie/list-tester-1.png"
              alt=""
              className="absolute top-0 left-0 w-full cursor-pointer"
              onClick={handleFirstClick}
            />
            <div
              className="absolute-full bg-black opacity-0 pointer-events-none"
              ref={bgCover}
            />
          </div>
          <img
            className="absolute top-0 left-0 w-full pointer-events-none"
            src="https://wxa.wxs.qq.com/wxad-design/yijie/status-bar.png"
            ref={statusBar}
            alt=""
          />
          <div
            className="absolute top-full left-0 w-full origin-bottom pb-[76px] bg-white rounded-t-xl overflow-hidden"
            ref={drawer}
          >
            <div
              className="relative"
              style={{
                height: "536px",
              }}
              ref={container}
            >
              <div
                className="px-6 absolute top-0 left-0 w-full"
                style={{
                  height: "536px",
                }}
                ref={secondContainer}
              >
                <div className="relative flex items-center justify-center -mx-6 mb-2 h-16">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute top-5 left-4 bg-black/5 rounded-full cursor-pointer"
                    ref={icon}
                    onClick={handleSecondClick}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2929 15.3466C11.6834 15.7371 12.3166 15.7371 12.7071 15.3466L17.3033 10.7504L16.1248 9.5719L12 13.6967L7.87521 9.5719L6.6967 10.7504L11.2929 15.3466Z"
                      fill="black"
                      fillOpacity="0.9"
                    />
                  </svg>
                  <div className="font-medium text-[15px]">筛选订单</div>
                </div>
                <div className="mb-3 text-[15px] font-medium">期望发表日期</div>
                <div className="flex items-center">
                  <div
                    className="flex-1 flex items-center justify-center h-[45px] text-[15px] text-black/30 bg-[#F7F7F7] rounded-lg cursor-pointer"
                    onClick={handleToThirdClick}
                  >
                    开始日期
                  </div>
                  <div className="flex-none mx-2 w-2 h-px bg-black" />
                  <div
                    className="flex-1 flex items-center justify-center h-[45px] text-[15px] text-black/30 bg-[#F7F7F7] rounded-lg cursor-pointer"
                    onClick={handleToThirdClick}
                  >
                    结束日期
                  </div>
                </div>
                <div className="mt-6 mb-3 text-[15px] font-medium">
                  订单状态
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "全部",
                    "待接单",
                    "待上传脚本",
                    "脚本确认中",
                    "脚本被驳回",
                    "待提交视频",
                    "视频审核中",
                    "视频审核未通过",
                    "视频确认中",
                    "视频确认中",
                  ].map((o, i) => (
                    <div
                      className={`flex items-center justify-center h-[45px] text-[15px] rounded-lg ${
                        o === "全部"
                          ? "bg-[#FA9D3B]/10 text-[#FA9D3B] font-medium"
                          : "bg-[#F7F7F7]"
                      }`}
                      key={i}
                    >
                      {o}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="absolute bottom-[-76px] left-0 z-10 flex items-center justify-center gap-4 pt-4 w-full pb-[76px] bg-white"
                ref={secondButtons}
              >
                <div
                  className="w-[120px] flex items-center justify-center h-[48px] text-[17px] rounded-lg bg-[#F7F7F7] font-medium cursor-pointer"
                  // @ts-ignore
                  onClick={handleSecondClick}
                >
                  取消
                </div>
                <div className="w-[120px] flex items-center justify-center h-[48px] text-[17px] rounded-lg font-medium text-white bg-[#FA9D3B] cursor-pointer">
                  确定
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute top-full left-0 w-full origin-bottom pb-[76px] bg-white rounded-t-xl overflow-hidden"
            ref={drawerThird}
          >
            <div
              style={{
                height: 384,
              }}
              ref={thirdContainer}
            >
              <div className="relative flex items-center justify-center mb-2 h-16">
                <div className="font-medium text-[15px] absolute top-0 left-6 w-full h-full flex items-center pointer-events-none">
                  开始日期
                </div>
                <div className="absolute bottom-0 left-6 right-6 h-[0.5px] bg-black/10" />
              </div>
              <div
                className="px-6 w-full bg-cover"
                style={{
                  height: 272,
                  backgroundImage:
                    "url(https://wxa.wxs.qq.com/wxad-design/yijie/time-lister.png)",
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 z-10 flex items-center justify-center gap-4 pt-4 w-full pb-[76px] bg-white">
              <div
                className="w-[120px] flex items-center justify-center h-[48px] text-[17px] rounded-lg bg-[#F7F7F7] font-medium cursor-pointer"
                // @ts-ignore
                onClick={handleBackSecondClick}
              >
                取消
              </div>
              <div
                className="w-[120px] flex items-center justify-center h-[48px] text-[17px] rounded-lg font-medium text-white bg-[#FA9D3B] cursor-pointer"
                onClick={handleBackSecondClick}
              >
                确定
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute top-[-3px] left-0 w-full h-full pointer-events-none"
          src="https://wxa.wxs.qq.com/wxad-design/yijie/iphone14-notch.png"
          alt=""
        />
      </div>
    </DemoBox>
  )
}

export default Demo
