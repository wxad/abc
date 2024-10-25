import { useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Demo = () => {
  const [isMobile, toggle] = useState(false)
  return (
    <DemoBox className="">
      <button
        className="absolute right-2 top-2"
        onClick={() => {
          toggle(!isMobile)
        }}
      >
        变换
      </button>
      <div className="h-[400px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-[350ms] ${
              isMobile
                ? "rounded-xl w-[360px] h-[56px]"
                : "rounded-lg opacity-0 w-[676px] h-[72px]"
            }`}
            style={{
              boxShadow:
                "rgba(28, 107, 212, 0.08) 0px 8px 16px 0px, rgba(28, 107, 212, 0.08) 0px 12px 32px 0px",
            }}
          />
          <div
            className={`relative flex items-center transition-all duration-[350ms] ${
              isMobile ? "gap-2" : "gap-3"
            }`}
          >
            {["品牌宣传", "商品销售", "搜索营销", "线索留资"].map(
              (item, index) => {
                return (
                  <div
                    key={index}
                    className={`relative flex items-center justify-center bg-white rounded-lg transition-all duration-[350ms] ${
                      isMobile ? "w-[80px] h-[40px]" : "w-[160px] h-[72px]"
                    }`}
                    style={{
                      fontWeight: index === 0 ? 500 : 400,
                      boxShadow: isMobile
                        ? ""
                        : "rgba(0, 104, 255, 0.05) 0px 3px 6px 0px",
                      background:
                        index === 0 &&
                        "linear-gradient(rgb(189, 233, 255) 0%, rgb(217, 232, 255) 100%)",
                    }}
                  >
                    <span
                      className={`text-[18px] transition-all duration-[350ms] ${
                        isMobile
                          ? "scale-[0.7]"
                          : index === 0
                          ? "-translate-x-3"
                          : ""
                      }`}
                    >
                      {item}
                    </span>
                    {index === 0 && (
                      <img
                        src="https://qzonestyle.gdtimg.com/gdt_ui_proj/imghub/dist/eqq-adResource-filter-brand-promotion.png?max_age=31536000"
                        className={`absolute bottom-0 right-0 w-[68px] aspect-square translate-x-[20.5%] translate-y-[20.5%] transition-all origin-bottom-right ${
                          isMobile
                            ? "scale-[0.7] opacity-0 duration-[200ms]"
                            : "duration-[350ms]"
                        }`}
                      />
                    )}
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

export default Demo
