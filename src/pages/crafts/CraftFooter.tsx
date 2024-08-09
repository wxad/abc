"use client"

import { useSpring, animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { twMerge } from "tailwind-merge"

const CraftFooterItem = ({
  className = "",
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [{ x, y, cursor, color }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    cursor: "grab",
    color: "rgba(0, 0, 0, 0.2)",
    config: {
      tension: 300,
      friction: 20,
      precision: 0.1,
    },
  }))
  const bind = useDrag(({ movement: [mx, my], down }) => {
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      cursor: down ? "grabbing" : "grab",
      color: down ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.2)",
    })
    // document.body.style.overflow = down ? "hidden" : "auto"
  })

  return (
    <animated.div
      className={twMerge("touch-none aspect-square", className)}
      style={{
        x,
        y,
        cursor,
        color,
      }}
      // @ts-ignore
      {...bind()}
      {...otherProps}
    />
  )
}

const CraftFooter = () => {
  return (
    <div className="mt-16 mb-32 mx-auto w-full min-w-96 grid grid-cols-9 grid-rows-3 gap-1">
      <CraftFooterItem className="row-start-2 row-end-3 col-start-1 col-end-2">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M90,0V180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M180,90H0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M153.64,26.36,26.36,153.64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M153.64,153.64,26.36,26.36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M176.93,66.71,3.05,113.33"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M113.29,176.93,66.67,3.05"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M176.93,113.29,3.05,66.67"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M66.71,176.93,113.33,3.05"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M167.94,135,12.06,45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M45,167.94,135,12.06"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M135,167.94,45,12.06"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12.06,135,167.94,45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-3 row-end-4 col-start-1 col-end-2">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <line
            y1="1"
            x2="174.98"
            y2="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="71.4"
            x2="165.93"
            y2="71.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="124.69"
            x2="168.95"
            y2="124.69"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="89.5"
            x2="114.64"
            y2="89.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="107.6"
            x2="174.98"
            y2="107.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="36.2"
            x2="163.92"
            y2="36.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="54.3"
            x2="148.84"
            y2="54.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="18.1"
            x2="154.87"
            y2="18.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="142.8"
            x2="159.9"
            y2="142.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="160.9"
            x2="168.95"
            y2="160.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            y1="179"
            x2="137.77"
            y2="179"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-2 row-end-3 col-start-2 col-end-3">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M179,1h0a0,0,0,0,1,0,0V179a0,0,0,0,1,0,0H1a0,0,0,0,1,0,0v0A178,178,0,0,1,179,1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-1 row-end-2 col-start-3 col-end-4">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r="89"
            fill="none"
            stroke="#efefef"
            strokeWidth="2"
          />
          <ellipse
            cx="90"
            cy="90.51"
            rx="70.8"
            ry="70.29"
            fill="none"
            stroke="#efefef"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="90"
            rx="48.04"
            ry="47.53"
            fill="none"
            stroke="#efefef"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="90"
            rx="23.77"
            ry="23.26"
            fill="none"
            stroke="#efefef"
            strokeWidth="2"
          />
          <circle
            cx="90"
            cy="90"
            r="89"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="90"
            cy="90.51"
            rx="70.8"
            ry="70.29"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="90"
            rx="48.04"
            ry="47.53"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="90"
            rx="23.77"
            ry="23.26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-2 row-end-3 col-start-3 col-end-4">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M121.42,131.89c-5.76,0-8.52-3.68-8.52-9.21,0-17.72,12.66-70.66,15.88-81.94C79.06,38,48.68,77.57,48.68,118.31c0,14.5,7.59,22.1,16.11,22.1,12,0,25.55-26.71,58-90.46l1.38.46c-5.75,16.57-15.65,45.34-15.65,58,0,17.27,7.13,31.77,16.11,32,15.65,0,50.41-23.25,50.41-67.44,0-41.9-28.31-73-63.76-73C50.52,0,5,55.48,5,106.57,5,149.62,33.26,180,70.78,180c18.87,0,38.21-12.43,47.65-24.63l-.93-.92c-14,10.59-31.07,18.87-51.56,18.87-33.14,0-55.7-20.48-55.7-57.08,0-57.54,42.35-110,105.19-110,31.08,0,53.63,20.25,53.63,53.63C169.06,109.57,142.82,131.89,121.42,131.89ZM62,130.28c-7.36,0-11.51-3.91-11.51-12.2,0-26.47,26.24-64.22,74.35-75.72C90.8,108.19,74,130.28,62,130.28Z"
            fill="currentColor"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-2 row-end-3 col-start-4 col-end-5">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <rect
            x="1.01"
            y="1"
            width="177.98"
            height="178"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="45.85"
            y="45.84"
            width="88.3"
            height="88.32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="27.07"
            y="27.06"
            width="125.86"
            height="125.87"
            transform="translate(-37.28 90) rotate(-45)"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="aspect-auto row-start-3 row-end-4 col-start-2 col-end-5">
        <svg className="block w-full h-full" viewBox="0 0 540 180">
          <rect x="3" y="1" width="534" height="178" rx="83" fill="none" />
          <rect
            x="1"
            y="1"
            width="538"
            height="178"
            rx="89"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-3 row-end-4 col-start-5 col-end-6">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M42.79,39.62c0-20.38,9.48-29.86,31-29.86,24.4,0,33.3,9.76,33.3,27,0,18.08-16.94,31.86-50.24,45.64C48.24,66.6,42.79,51.1,42.79,39.62Zm136.08,95.6c-3.45,26.12-8.9,35-19.52,35-14.07,0-30.15-8-45.94-20.38,16.66-14.35,27.85-35,34.45-50.53,5.46-12.34,8.33-13.78,17.52-15.21l7.17-.86v-2H103.08v2L127.77,85c10.33.86,11.48,2.59,11.48,9.76,0,14.36-9.76,35-27,54.26-21-16.94-41.06-41.34-54-64.31,25.55-10.91,58-25,58-54.26C116.29,16.08,105.38,2,82.41,2,58.58,2,34.47,21,34.47,47.08c0,8.61,5.17,22.68,13.78,38.76C23.56,95.88.88,109.38.88,137.51.88,164.5,20.4,180,50.83,180c24.4,0,40.19-10.33,54.83-23,16.37,13.21,33.88,22.11,50.53,22.11,17.51,0,21.53-20.67,24.69-43.93Zm-121.15,37c-30.72,0-47.37-14.93-47.37-39,0-17.8,9.76-31.87,39.05-45.36,12.63,23.25,32.72,49.66,54.83,68C88.73,165.65,70.64,172.25,57.72,172.25Z"
            fill="currentColor"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-2 row-end-3 col-start-6 col-end-7">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M165.26,37.35a46.87,46.87,0,0,0-66.29,0l0,0-9,9-9-9a46.89,46.89,0,0,0-66.3,66.31l9,9L89.92,179l66.31-66.31,9-9a46.87,46.87,0,0,0,0-66.29l0,0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-3 row-end-4 col-start-6 col-end-7">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <rect
            x="1.01"
            y="1"
            width="177.98"
            height="178"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M1.42,1.27,179,178.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M1.49,178.82,178.94,1.21"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-3 row-end-4 col-start-7 col-end-8">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M51.93,180c-28-2.45-38.25-7.57-38.25-17.8,0-16.56,22.91-40.7,22.91-56.45,0-13.09-11-16.36-36.61-16.57V87.34c29.45-.41,36.61-5.73,36.61-19.23,0-17-22.09-34.77-22.09-47,0-10.43,11.87-17.18,35-21.07l.2,1C26,5.93,22.07,9.82,22.07,18.82c0,11.66,19.64,29.45,19.64,45.82,0,15.75-11.25,21.27-28.44,23.11v1c16.57,1,28.44,4.71,28.44,15.14,0,19.63-19.64,45.61-19.64,57.07,0,10.43,5.73,14.72,29.86,17.79Zm105.66-18.2c0-11.66-19.64-34.37-19.64-51.55,0-14.93,11.45-19.84,28.64-21.48v-1C149.81,86.32,138,82.64,138,71.8c0-19.44,19.64-41.12,19.64-52.37,0-10-5.73-14.73-29.25-18.2V0c26.79,2.86,37.43,8.39,37.43,18.61,0,15.55-22.5,35.59-22.5,51.75,0,12.89,9.82,16.78,36.61,17l-.2,1.84c-28.43.41-36.41,5.11-36.41,18.21,0,17,22.09,39.06,22.09,52.36,0,10.43-11.46,16.77-35.8,20.25l-.2-1.23C153.7,174.27,157.59,171,157.59,161.8Z"
            fill="currentColor"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-2 row-end-3 col-start-8 col-end-9">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M88.79,0c-1,22.68-1.93,60.32-4.34,81.07-18.82-8.69-52.11-26.54-71.9-37.15L11.1,46.81c19.79,12.06,51.15,31.36,68,43.43-16.4,11.58-48.73,31.37-68,43.44l1.45,2.89c20.27-11.1,53.56-28.95,72.38-37.16,1.93,20.27,2.9,57.91,3.86,80.59h2.9c1-22.68,1.93-60.32,3.86-80.59,18.82,8.69,51.63,26.06,71.9,37.16l1.45-2.89c-19.31-12.07-51.64-31.85-68-43.44,16.89-12.06,48.73-31.36,68-43.43l-1.45-2.9c-19.79,10.62-53.08,28.47-71.9,37.16C93.62,60.32,92.65,22.68,91.69,0Z"
            fill="currentColor"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-3 row-end-4 col-start-8 col-end-9">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r="89"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="109.22"
            cy="90.51"
            rx="69.78"
            ry="69.28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="91.01"
            rx="23.77"
            ry="23.26"
            fill="none"
            stroke="#efefef"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="91.01"
            rx="23.77"
            ry="23.26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="90.51"
            cy="91.01"
            rx="51.07"
            ry="51.58"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="104.16"
            cy="91.01"
            rx="37.42"
            ry="38.43"
            fill="none"
            stroke="#efefef"
            strokeWidth="2"
          />
          <ellipse
            cx="104.16"
            cy="91.01"
            rx="37.42"
            ry="38.43"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="row-start-1 row-end-2 col-start-9 col-end-10">
        <svg className="block w-full h-full" viewBox="0 0 180 180">
          <path
            d="M90.54,0H89.46C71.61,23.72,49,47,27.43,65.3l.87,1.08c22-14.14,39.61-31.56,60.72-52C88.8,69,86.41,139.09,84.23,180H95.77c-2.18-40.92-4.79-111-5-165.64,20.89,19.81,38.75,37.66,60.94,52l.87-1.08C130.81,47.67,108.39,23.72,90.54,0Z"
            fill="currentColor"
          />
        </svg>
      </CraftFooterItem>
      <CraftFooterItem className="aspect-auto row-start-2 row-end-4 col-start-9 col-end-10">
        <svg className="block w-full h-full" viewBox="0 0 180 360">
          <rect
            x="1"
            y="1"
            width="178"
            height="358"
            rx="89"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </CraftFooterItem>
    </div>
  )
}

export default CraftFooter
