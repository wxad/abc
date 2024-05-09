import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  return (
    <div className="my-16">
      <div className="mx-auto mb-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/gen-chinese-pattern.webp"
          loading="lazy"
        />
      </div>
      <Link href="https://codepen.io/aragakey/full/EzaePe">
        日本·中国の文樣事典
      </Link>
    </div>
  )
}

export default Gen
