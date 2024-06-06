import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Item = ({
  show = true,
  sync = false,
}: {
  show?: boolean
  sync?: boolean
}) => {
  return (
    <div
      className={`mb-1 flex w-80 px-3 rounded-[4px] bg-neutral-200 border border-neutral-300 ${
        show ? "opacity-100 mb-1 h-16" : "opacity-0 mb-0 h-0"
      }`}
      style={{
        transition: sync
          ? ".3s ease all"
          : show
          ? ".3s ease all, 0.3s opacity ease .2s"
          : "0.3s all ease .2s, .3s ease opacity",
      }}
    >
      <svg
        className="flex-none mt-2 mr-2 fill-current text-neutral-500"
        width="22"
        height="22"
        viewBox="0 0 18 18"
      >
        <path d="M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 4.5V6H9.75V4.5H8.25ZM8.25 13.5H9.75V7H8.25V13.5Z" />
      </svg>
      <div className="flex-1 py-2 text-sm">
        <div className="font-semibold">提醒标题</div>
        <div>这是一条提示信息</div>
      </div>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        className="mt-2 flex-none fill-current text-neutral-400"
      >
        <path d="M14.1265 4.93709C14.3218 4.74183 14.3218 4.42524 14.1265 4.22998L13.773 3.87643C13.5777 3.68117 13.2611 3.68116 13.0659 3.87643L9.00002 7.94229L4.93416 3.87643C4.7389 3.68117 4.42231 3.68117 4.22705 3.87643L3.8735 4.22998C3.67824 4.42524 3.67824 4.74183 3.8735 4.93709L7.93936 9.00295L3.8735 13.0688C3.67824 13.2641 3.67824 13.5807 3.8735 13.7759L4.22705 14.1295C4.42231 14.3247 4.7389 14.3247 4.93416 14.1295L9.00002 10.0636L13.0659 14.1295C13.2611 14.3247 13.5777 14.3247 13.773 14.1295L14.1265 13.7759C14.3218 13.5807 14.3218 13.2641 14.1265 13.0688L10.0607 9.00295L14.1265 4.93709Z" />
      </svg>
    </div>
  )
}

const Alert = ({ sync = false }: { sync?: boolean }) => {
  const [show0, setShow0] = useState(false)
  const interval = useRef(0)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setShow0((prev) => !prev)

      setTimeout(() => {
        setShow0((prev) => !prev)
      }, 2000)
    }, 4000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="flex flex-col justify-center items-center h-72 overflow-hidden">
      <Item />
      <Item show={show0} sync={sync} />
      <Item />
    </DemoBox>
  )
}

export default Alert
