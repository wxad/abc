import { useEffect } from "react"
import { Link, useDoodle } from "./commons"

const Gen = () => {
  return (
    <div className="my-16">
      <div className="mx-auto max-w-[280px] mb-2">
        <img
          src="https://wxa.wxs.qq.com/wxad-design/yijie/aragakey-gradient-alphabet.webp"
          loading="lazy"
        />
      </div>
      <Link href="https://codepen.io/aragakey/full/dyegEpv">
        Gradient Alphabet
      </Link>
    </div>
  )
}

export default Gen
