import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  return (
    <div className="my-16">
      <div className="mx-auto max-w-[400px] mb-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/yijie-railway.webp"
          loading="lazy"
        />
      </div>
      <Link href="https://codepen.io/aragakey/full/eYaObKJ">
        The Coastal Railway
      </Link>
    </div>
  )
}

export default Gen
