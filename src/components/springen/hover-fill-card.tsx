import { Pane } from "tweakpane"
import React, { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"
import HoverFill from "./HoverFill"

const Demo = () => {
  const [params, setParams] = useState({
    scaleStart: 0.95,
  })

  const tweakpaneContainerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pane = new Pane({
      container: tweakpaneContainerRef.current as HTMLElement,
    })

    pane.addBinding(params, "scaleStart", {
      min: 0.5,
      max: 1,
      step: 0.05,
    })

    pane.on("change", (ev) => {
      setParams((prev) => ({
        ...prev,
        // @ts-ignore
        [ev.target.key]: ev.value,
      }))
    })

    return () => {
      pane.dispose()
    }
  }, [])

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.style.setProperty(
        "--odn-hoverfill-scale-start",
        params.scaleStart.toString()
      )
    }
  }, [params.scaleStart])

  return (
    <DemoBox
      className="flex justify-center items-center gap-4 p-10 pt-14 text-sm"
      ref={parentRef}
    >
      <div ref={tweakpaneContainerRef} className="absolute top-2 right-2" />
      <HoverFill bgClassName="rounded-lg">
        <div className="flex p-4 gap-3 w-[356px]">
          <img
            src="https://images.unsplash.com/photo-1744219792921-a74da6141822?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="size-[72px] object-cover rounded-full"
          />
          <div>
            <div className="mb-1 text-base font-semibold">隔壁大哥与小李</div>
            <div className="mb-1 text-xs text-neutral-500">北京</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#FA9D3B]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.95034 1.6875C2.47375 1.6875 2.93177 1.9773 3.30156 2.31113C3.68246 2.65497 4.05247 3.12099 4.40616 3.62976C4.94342 4.40259 5.49468 5.35282 6.02088 6.24805C6.55153 5.35495 7.10207 4.39995 7.62032 3.63526C7.96376 3.12852 8.31933 2.6638 8.68088 2.32066C9.02705 1.99212 9.46918 1.6875 9.98252 1.6875C10.9111 1.6875 11.1946 2.68232 11.24 3.43697C11.2884 4.24369 11.1562 5.27788 10.9361 6.27727C10.7147 7.28194 10.3941 8.2981 10.0395 9.07526C9.76384 9.67959 9.30679 10.625 8.52212 10.625C7.8495 10.625 7.30604 10.1036 6.89829 9.62485C6.60368 9.27893 6.30614 8.85579 6.01029 8.39727C5.70145 8.86029 5.38719 9.28774 5.07168 9.63712C4.6167 10.1409 4.03533 10.625 3.35858 10.625C2.5668 10.625 2.14842 9.66957 1.88823 9.06378C1.5549 8.28767 1.25496 7.27294 1.04745 6.27025C0.840836 5.27192 0.716824 4.24245 0.757797 3.44195C0.795031 2.71449 1.03384 1.6875 1.95034 1.6875ZM5.35736 7.33682C4.72087 6.26852 4.1007 5.16126 3.48244 4.27192C3.14695 3.78933 2.83433 3.40494 2.54772 3.1462C2.29911 2.92177 2.12256 2.83947 2.00977 2.81842C2.00814 2.82168 2.00641 2.8252 2.00459 2.82899C1.94996 2.94287 1.89869 3.16023 1.88133 3.49946C1.84732 4.1638 1.9515 5.08745 2.1491 6.04225C2.3458 6.99269 2.62612 7.93109 2.92193 8.61981C3.04598 8.90864 3.19348 9.26676 3.42645 9.49247C3.58999 9.45859 3.85745 9.30314 4.23674 8.88313C4.59212 8.4896 4.96652 7.95396 5.35736 7.33682ZM6.67611 7.34342C7.05778 7.96243 7.41793 8.49992 7.75476 8.89541C7.93874 9.11143 8.18034 9.4122 8.47042 9.49175C8.72587 9.26979 8.87955 8.90745 9.01601 8.60833C9.32973 7.92065 9.62845 6.98368 9.83741 6.03523C10.0475 5.0815 10.1565 4.16257 10.117 3.50444C10.104 3.28843 10.0933 2.99927 9.96195 2.8138C9.88317 2.82315 9.71847 2.88692 9.45533 3.13667C9.18196 3.39611 8.88003 3.78181 8.55159 4.26642C7.94142 5.16673 7.32933 6.26704 6.67611 7.34342Z"
                  fill="#FA9D3B"
                />
              </svg>
              视频号特色
            </div>
          </div>
        </div>
      </HoverFill>
    </DemoBox>
  )
}

export default Demo
