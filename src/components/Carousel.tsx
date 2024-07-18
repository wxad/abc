import DemoBox from "@/components/DemoBox"
import CarouselDemo from "./CarouselDemo"

const Carousel = (props: {
  panel: IBaseObject
  bounce?: boolean
  scale?: boolean
  stiffness?: number
  damping?: number
}) => {
  return (
    <DemoBox>
      <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.25 9a7.75 7.75 0 1 1 15.5 0v6a7.75 7.75 0 0 1-15.5 0zm7-6.205A6.251 6.251 0 0 0 5.75 9v6a6.25 6.25 0 1 0 12.5 0V9a6.251 6.251 0 0 0-5.5-6.205v3.583a2.25 2.25 0 0 1 1.5 2.122v2a2.25 2.25 0 0 1-4.5 0v-2c0-.98.626-1.813 1.5-2.122zM12 7.75a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75"
            clipRule="evenodd"
          />
        </svg>
        左右拖动体验
      </div>
      <div className="flex md:hidden absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <svg className="w-4 h-4" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M196 88a27.86 27.86 0 0 0-13.35 3.39A28 28 0 0 0 144 74.7V44a28 28 0 0 0-56 0v80l-3.82-6.13A28 28 0 0 0 35.73 146l4.67 8.23C74.81 214.89 89.05 240 136 240a88.1 88.1 0 0 0 88-88v-36a28 28 0 0 0-28-28m12 64a72.08 72.08 0 0 1-72 72c-37.63 0-47.84-18-81.68-77.68l-4.69-8.27V138A12 12 0 0 1 54 121.61a11.9 11.9 0 0 1 6-1.6a12 12 0 0 1 10.41 6a2 2 0 0 0 .14.23l18.67 30A8 8 0 0 0 104 152V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0v-12a12 12 0 0 1 24 0v20a8 8 0 0 0 16 0v-4a12 12 0 0 1 24 0Z"
          />
        </svg>
        左右滑动体验
      </div>
      <CarouselDemo {...props} />
    </DemoBox>
  )
}

export default Carousel
