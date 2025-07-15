import DemoBox from "@/components/DemoBox"

const Demo = () => {
  return (
    <DemoBox className="flex items-center justify-center py-10 gap-4">
      <div className="flex flex-col items-center gap-2 text-xs text-neutral-500">
        <div className="size-36 bg-[#7F7F7F] rounded-2xl" />
        <div>rgb(127, 127, 127)</div>
      </div>
      <div className="flex flex-col items-center gap-2 text-xs text-neutral-500">
        <div className="size-36 bg-[#7F007F] rounded-2xl" />
        <div>rgb(127, 0, 127)</div>
      </div>
    </DemoBox>
  )
}

export default Demo
