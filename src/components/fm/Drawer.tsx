import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

export const Item = ({
  show = false,
  bg = true,
  stacked = false,
}: {
  show?: boolean
  bg?: boolean
  stacked?: boolean
}) => {
  return (
    <>
      {bg && (
        <div
          className={`absolute-full bg-black bg-opacity-30 transition-all duration-500 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div
        className={`absolute-full flex items-end justify-center transition-all duration-500 ${
          show
            ? `opacity-100 ${
                stacked ? "-translate-y-4 scale-[0.98]" : "translate-y-0"
              }`
            : "opacity-0 translate-y-full"
        }`}
      >
        <div className="relative flex flex-col w-full h-80 bg-white border-t border-neutral-200 shadow-lg rounded-t-lg">
          <svg
            className="absolute top-3 right-3 fill-current text-neutral-400"
            width="24"
            height="24"
            viewBox="0 0 18 18"
          >
            <path d="M14.1265 4.93709C14.3218 4.74183 14.3218 4.42524 14.1265 4.22998L13.773 3.87643C13.5777 3.68117 13.2611 3.68116 13.0659 3.87643L9.00002 7.94229L4.93416 3.87643C4.7389 3.68117 4.42231 3.68117 4.22705 3.87643L3.8735 4.22998C3.67824 4.42524 3.67824 4.74183 3.8735 4.93709L7.93936 9.00295L3.8735 13.0688C3.67824 13.2641 3.67824 13.5807 3.8735 13.7759L4.22705 14.1295C4.42231 14.3247 4.7389 14.3247 4.93416 14.1295L9.00002 10.0636L13.0659 14.1295C13.2611 14.3247 13.5777 14.3247 13.773 14.1295L14.1265 13.7759C14.3218 13.5807 14.3218 13.2641 14.1265 13.0688L10.0607 9.00295L14.1265 4.93709Z" />
          </svg>
          <div className="flex items-center justify-center h-full text-sm font-semibold">
            Drawer
          </div>
        </div>
      </div>
    </>
  )
}

const Drawer = () => {
  const [show0, setShow0] = useState(false)
  const [show1, setShow1] = useState(false)
  const interval = useRef(0)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setShow0((prev) => !prev)

      setTimeout(() => {
        setShow1((prev) => !prev)
      }, 1000)

      setTimeout(() => {
        setShow1((prev) => !prev)
      }, 2000)

      setTimeout(() => {
        setShow0((prev) => !prev)
      }, 3000)
    }, 4000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="h-[420px] overflow-hidden">
      <Item show={show0} stacked={show1} />
      <Item show={show1} bg={false} />
    </DemoBox>
  )
}

export default Drawer
