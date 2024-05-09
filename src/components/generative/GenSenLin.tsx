import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  return (
    <div className="my-16">
      <div className="mx-auto max-w-[400px] mb-2 mix-blend-darken">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/yijie-senlin.webp"
          loading="lazy"
        />
      </div>
      <Link href="https://codepen.io/aragakey/full/yLOPzgq">
        山城隆一「森・林」
      </Link>
    </div>
  )
}

export default Gen
