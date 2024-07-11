import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Item = ({ show, forward }: { show: boolean; forward?: boolean }) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const lastShow = useRef(false)

  useEffect(() => {
    if (show && wrapper.current) {
      wrapper.current.style.transform = "translate3d(0, -56px, 0)"
      wrapper.current.style.transition = ""
    }

    setTimeout(() => {
      let transformValue = "translate3d(0, 0, 0)"
      if (!show) {
        if (forward) {
          if (lastShow.current) {
            transformValue = "translate3d(0, 56px, 0)"
          } else {
            transformValue = "translate3d(0, -56px, 0)"
          }
        } else {
          transformValue = "translate3d(0, -56px, 0)"
        }
      }

      lastShow.current = show
      if (wrapper.current) {
        wrapper.current.style.transform = transformValue
        wrapper.current.style.transition = ".5s ease all"
      }
    }, 50)
  }, [show])

  return (
    <>
      <div
        ref={wrapper}
        className={`absolute-full flex items-center justify-center ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative flex flex-col w-80 h-64 bg-white shadow-lg rounded-xl">
          <svg
            className="absolute top-3 right-3 fill-current text-neutral-400"
            width="24"
            height="24"
            viewBox="0 0 18 18"
          >
            <path d="M14.1265 4.93709C14.3218 4.74183 14.3218 4.42524 14.1265 4.22998L13.773 3.87643C13.5777 3.68117 13.2611 3.68116 13.0659 3.87643L9.00002 7.94229L4.93416 3.87643C4.7389 3.68117 4.42231 3.68117 4.22705 3.87643L3.8735 4.22998C3.67824 4.42524 3.67824 4.74183 3.8735 4.93709L7.93936 9.00295L3.8735 13.0688C3.67824 13.2641 3.67824 13.5807 3.8735 13.7759L4.22705 14.1295C4.42231 14.3247 4.7389 14.3247 4.93416 14.1295L9.00002 10.0636L13.0659 14.1295C13.2611 14.3247 13.5777 14.3247 13.773 14.1295L14.1265 13.7759C14.3218 13.5807 14.3218 13.2641 14.1265 13.0688L10.0607 9.00295L14.1265 4.93709Z" />
          </svg>
          <div className="flex-1 flex items-center justify-center">
            <svg
              className="flex-none mr-4"
              width="48"
              height="48"
              viewBox="0 0 18 18"
              fill="#000"
              data-interactive="false"
              data-icon="info-circle"
            >
              <path d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 4.5V6H9.75V4.5H8.25ZM8.25 13.5H9.75V7H8.25V13.5Z" />
            </svg>
            <div>
              <div className="text-base font-semibold">
                是否确认提交你的修改？
              </div>
              <div className="text-sm">我已阅读《广告投放规则》</div>
            </div>
          </div>
          <div className="flex-none flex items-center gap-4 justify-center h-16 border-t border-neutral-200">
            <div
              className={`flex items-center justify-center w-16 h-8 text-xs rounded-md border border-neutral-300 ${
                !forward
                  ? "outline outline-2 outline-offset-2 outline-neutral-900"
                  : ""
              }`}
            >
              取消
            </div>
            <div
              className={`flex items-center justify-center w-16 h-8 text-xs rounded-md text-white bg-neutral-900 ${
                forward
                  ? "outline outline-2 outline-offset-2 outline-neutral-900"
                  : ""
              }`}
            >
              确认
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const DialogNew = () => {
  const [show, setShow] = useState(false)
  const [forward, setForward] = useState(true)
  const interval = useRef(0)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setForward((prev) => !prev)
      setShow((prev) => !prev)
      setTimeout(() => {
        setShow((prev) => !prev)
      }, 1500)
    }, 3000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="h-[420px] overflow-hidden">
      <div
        className={`absolute-full bg-black bg-opacity-30 transition-all duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />
      <div>
        <Item show={show} forward={forward} />
      </div>
    </DemoBox>
  )
}

export default DialogNew
