import DemoBox from "../DemoBox"
import { useState } from "react"
import Pagination from "./Pagination"

const Demo = () => {
  const [value, setValue] = useState(1)

  return (
    <DemoBox className="flex justify-center items-center gap-4 p-10 text-sm">
      <Pagination
        showPrevNext
        totalSize={100}
        pageSize={10}
        value={value}
        onChange={(_, value) => setValue(value)}
      />
    </DemoBox>
  )
}

export default Demo
