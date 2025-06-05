import HoverFill from "./HoverFill"
import Tooltip from "./Tooltip"
import React, { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Basic = () => {
  const operations = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="2"
            y="13.6665"
            width="12"
            height="1.33333"
            rx="0.5"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <path
            d="M9.5 3.5L11.5 5.5"
            stroke="#0A0A0A"
            strokeOpacity="0.84"
            strokeWidth="1.33333"
            strokeLinecap="square"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.3143 1.87953C10.6779 1.51594 11.2674 1.51594 11.631 1.87953L12.9477 3.19619C13.3112 3.55978 13.3112 4.14927 12.9477 4.51286L5.9753 11.4852L2.72146 12.3329C2.58386 12.3687 2.45848 12.2433 2.49433 12.1057L3.34197 8.85188L10.3143 1.87953Z"
            stroke="#0A0A0A"
            strokeOpacity="0.84"
            strokeWidth="1.33333"
          />
        </svg>
      ),
      tip: "Edit ad unit",
      offset: -26,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 4.66699H10.333C10.5171 4.66699 10.667 4.8159 10.667 5V13.667C10.6668 13.8509 10.517 14 10.333 14H3C2.81601 14 2.66717 13.8509 2.66699 13.667V5C2.66699 4.8159 2.81591 4.66699 3 4.66699Z"
            stroke="#0A0A0A"
            strokeOpacity="0.84"
            strokeWidth="1.33333"
          />
          <rect
            x="4.66797"
            y="7.3335"
            width="4"
            height="1.33333"
            rx="0.25"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <rect
            x="4.66797"
            y="10"
            width="4"
            height="1.33333"
            rx="0.25"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <path
            d="M13.0996 1.33838C13.6037 1.38972 13.9971 1.81582 13.9971 2.3335V11.0005L13.9922 11.1021C13.9445 11.5727 13.5702 11.9467 13.0996 11.9946L12.9971 12.0005H11.3301V10.6665H12.6641V2.6665H5.99707V4.00049H4.66406V2.3335C4.66406 1.81582 5.05739 1.38971 5.56152 1.33838L5.66406 1.3335H12.9971L13.0996 1.33838Z"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
        </svg>
      ),
      tip: "Copy ad unit",
      offset: 13,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="8"
            r="6.33333"
            stroke="#0A0A0A"
            strokeOpacity="0.84"
            strokeWidth="1.33333"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.16536 5.3335C6.44151 5.3335 6.66536 5.55735 6.66536 5.8335V10.1668C6.66536 10.443 6.44151 10.6668 6.16536 10.6668H5.83203C5.55589 10.6668 5.33203 10.443 5.33203 10.1668V5.8335C5.33203 5.55735 5.55589 5.3335 5.83203 5.3335H6.16536Z"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.1654 5.3335C10.4415 5.3335 10.6654 5.55735 10.6654 5.8335V10.1668C10.6654 10.443 10.4415 10.6668 10.1654 10.6668H9.83203C9.55589 10.6668 9.33203 10.443 9.33203 10.1668V5.8335C9.33203 5.55735 9.55589 5.3335 9.83203 5.3335H10.1654Z"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
        </svg>
      ),
      tip: "Pause ad unit",
      offset: 54,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="2"
            y="3.3335"
            width="12"
            height="1.33333"
            rx="0.5"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <rect
            x="4.66797"
            y="1"
            width="6.66667"
            height="1.33333"
            rx="0.5"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <rect
            x="6"
            y="6"
            width="1.33333"
            height="5.33333"
            rx="0.5"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <rect
            x="8.66797"
            y="6"
            width="1.33333"
            height="5.33333"
            rx="0.5"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <path
            d="M13 13.6665C13 14.4028 12.4032 15.0003 11.667 15.0005H4.33301C3.64287 15.0003 3.07521 14.4754 3.00684 13.8032L3 13.6665H13Z"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <path
            d="M3 6.1665C3 5.89036 3.22386 5.6665 3.5 5.6665H3.83333C4.10948 5.6665 4.33333 5.89036 4.33333 6.1665V13.6665C4.33333 14.0347 4.03486 14.3332 3.66667 14.3332C3.29848 14.3332 3 14.0347 3 13.6665V6.1665Z"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
          <path
            d="M11.668 6.1665C11.668 5.89036 11.8918 5.6665 12.168 5.6665H12.5013C12.7774 5.6665 13.0013 5.89036 13.0013 6.1665V13.6665C13.0013 14.0347 12.7028 14.3332 12.3346 14.3332C11.9664 14.3332 11.668 14.0347 11.668 13.6665V6.1665Z"
            fill="#0A0A0A"
            fillOpacity="0.84"
          />
        </svg>
      ),
      tip: "Delete ad unit",
      offset: 98,
    },
  ]

  return (
    <div>
      <DemoBox
        className="flex flex-col gap-10 items-center p-10"
        style={{
          // @ts-ignore
          "--odn-hoverfill-duration": "0",
        }}
      >
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
          <div>去除背景与弹出层共享：</div>
          {operations.map((operation, index) => (
            <Tooltip
              arrowed={false}
              placement="bottom"
              popup={operation.tip}
              popupStyle={{
                padding: "4px 8px",
              }}
              key={index}
            >
              <HoverFill bgClassName="rounded-lg" key={index}>
                <div className="flex items-center justify-center size-8">
                  {operation.icon}
                </div>
              </HoverFill>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
          <div>去除鼠标移入延时共享：</div>
          {operations.map((operation, index) => (
            <Tooltip
              arrowed={false}
              placement="bottom"
              popup={operation.tip}
              popupStyle={{
                padding: "4px 8px",
              }}
              mouseEnterDelay={0.3}
              key={index}
            >
              <HoverFill bgClassName="rounded-lg" key={index}>
                <div className="flex items-center justify-center size-8">
                  {operation.icon}
                </div>
              </HoverFill>
            </Tooltip>
          ))}
        </div>
      </DemoBox>
    </div>
  )
}

export default Basic
