import Popover from "./Popover"
import HoverFill from "./HoverFill"
import Calendar from "./Calendar"
import React, { useState } from "react"
import DemoBox from "../DemoBox"
const convertDateToString = (
  date?: Date | "" | null,
  locale: "zhCN" | "enUS" = "zhCN"
) => {
  if (!date) {
    return ""
  }
  let year = ""
  let month = ""
  let day = ""
  try {
    if (locale === "zhCN") {
      ;[year, month, day] = date.toLocaleDateString("zh-Hans-CN").split("/")
    } else {
      ;[month, day, year] = date.toLocaleDateString("en-US").split("/")
    }
  } catch (error) {
    ;[month, day, year] = date.toLocaleDateString("en-US").split("/")
  }

  const addZero = (s: string) => {
    if (parseInt(s, 10) < 10) {
      return `0${s}`
    }
    return s
  }
  return locale === "zhCN"
    ? `${year}-${addZero(month)}-${addZero(day)}`
    : `${addZero(month)}/${addZero(day)}/${year}`
}

const Basic = () => {
  let thisYear = new Date().getFullYear()
  const tm = new Date().getMonth() + 1
  const thisMonth = tm < 10 ? `0${tm}` : `${tm}`

  const infos = [
    {
      date: new Date(`${thisYear}-${thisMonth}-23`),
      broadcasts: [
        {
          startTime: "15:03",
        },
        {
          startTime: "00:16",
          endTime: "03:46",
        },
      ],
    },
    {
      date: new Date(`${thisYear}-${thisMonth}-22`),
      broadcasts: [
        {
          startTime: "15:03",
          endTime: "18:00",
        },
        {
          startTime: "10:54",
          endTime: "11:04",
        },
      ],
    },
    {
      date: new Date(`${thisYear}-${thisMonth}-18`),
      broadcasts: [
        {
          startTime: "15:03",
          endTime: "18:00",
        },
      ],
    },
    {
      date: new Date(`${thisYear}-${thisMonth}-17`),
      broadcasts: [
        {
          startTime: "15:03",
          endTime: "18:00",
        },
      ],
    },
    {
      date: new Date(`${thisYear}-${thisMonth}-12`),
      broadcasts: [
        {
          startTime: "15:03",
          endTime: "18:00",
        },
      ],
    },
  ]

  const [value, setValue] = useState<Date | undefined>(infos[0].date)
  const [visible, setVisible] = useState(false)

  return (
    <DemoBox className="flex justify-center p-10">
      <Popover
        popup={
          <div className="flex">
            <Calendar mode="single" selected={value} onSelect={setValue} />
            <div className="flex-1 py-1.5 border-l border-neutral-200 h-[255px] overflow-x-hidden overflow-y-auto scrollbar-custom">
              {infos.map((info, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center pl-4 h-8 text-neutral-400">
                    {convertDateToString(info.date)}
                  </div>
                  {info.broadcasts?.map((info, index) => (
                    <HoverFill key={index}>
                      <div className="flex items-center pl-4 h-9 text-sm">
                        {info.endTime ? (
                          <>
                            <span className="mr-0.5">{info.startTime}</span>至
                            <span className="mx-0.5">{info.endTime}</span>的直播
                          </>
                        ) : (
                          <>
                            <span className="mr-0.5">{info.startTime}</span>
                            开始的直播
                          </>
                        )}
                        {!info.endTime && (
                          <div className="ml-2 flex items-center px-1.5 h-[22px] text-[13px] text-[#FF6146] bg-[#ff6146]/12 rounded-sm">
                            进行中
                          </div>
                        )}
                      </div>
                    </HoverFill>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        }
        popupStyle={{ padding: 0 }}
        arrowed={false}
        placement="bottom"
        matchWidth
        trigger="click"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <HoverFill bgClassName="rounded-md">
          <div
            className={`py-3 pl-6 pr-5 rounded-md ${
              visible ? "bg-[#21222614]" : ""
            }`}
          >
            <div className="mb-1 text-base leading-7 font-semibold">
              直播场次
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4 text-base leading-7">
                <div className="mr-2">开播时间</div>
                <div className="mr-5 text-black/58">2024-12-17 15:03</div>
                <div className="mr-2">直播时长</div>
                <div className="w-[66px] whitespace-nowrap text-black/58">
                  03:48:08
                </div>
              </div>
              <div className="flex items-center mr-4 px-2 h-6 rounded-sm text-sm text-[#FF6146] bg-[#ff6146]/12">
                进行中
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.0707 8.93327L18.5993 8.46186C18.339 8.20151 17.9168 8.20151 17.6565 8.46186L12.0006 14.119L6.34279 8.46186C6.08244 8.20151 5.66033 8.20151 5.39998 8.46186L4.92858 8.93327C4.66823 9.19362 4.66823 9.61573 4.92858 9.87608L11.5282 16.4757C11.7886 16.7361 12.2107 16.7361 12.471 16.4757L19.0707 9.87608C19.3311 9.61573 19.3311 9.19362 19.0707 8.93327Z"
                  fill="black"
                  fillOpacity="0.58"
                />
              </svg>
            </div>
          </div>
        </HoverFill>
      </Popover>
    </DemoBox>
  )
}

export default Basic
