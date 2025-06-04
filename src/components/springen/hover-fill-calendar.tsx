import DemoBox from "../DemoBox"
import Calendar from "./Calendar"

const Demo = () => {
  return (
    <DemoBox className="flex justify-center items-center gap-4 p-5 text-sm">
      <Calendar mode="single" />
    </DemoBox>
  )
}

export default Demo
