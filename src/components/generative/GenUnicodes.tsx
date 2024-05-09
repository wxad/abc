import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  return (
    <div className="my-16">
      <div className="mx-auto mb-2 mix-blend-darken">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/unicode-patterns.webp"
          loading="lazy"
        />
      </div>
      <Link href="https://codepen.io/aragakey/full/vwoxXQ">
        Unicode Patterns
      </Link>
    </div>
  )
}

export default Gen
