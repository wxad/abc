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
      <CarouselDemo {...props} />
    </DemoBox>
  )
}

export default Carousel
