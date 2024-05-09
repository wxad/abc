import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  return (
    <div className="my-16">
      <div className="mx-auto max-w-[400px] mb-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/yijie-i.gif"
          loading="lazy"
        />
      </div>
      <Link href="https://codepen.io/aragakey/full/ZNwEQr">
        the letter i - composition and motion studies
      </Link>
    </div>
  )
}

export default Gen
