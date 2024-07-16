import { useEffect, useRef, useState } from "react"
import DemoBox from "../DemoBox"

const Item = ({
  text,
  index,
  active,
  ...otherProps
}: {
  text: string
  index: number
  active: boolean
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`relative z-10 flex items-center px-2 py-1 gap-1 font-medium cursor-pointer whitespace-nowrap transition-all ${
        active ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
      }`}
      data-index={index}
      {...otherProps}
    >
      {text}
    </div>
  )
}

const NavigationMenu = () => {
  const indicator = useRef<HTMLDivElement>(null)
  const interval = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setActiveIndex(1)

      setTimeout(() => {
        setActiveIndex(2)
      }, 2000)

      setTimeout(() => {
        setActiveIndex(0)
      }, 4000)
    }, 6000)

    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  return (
    <DemoBox className="flex flex-col h-[500px]">
      <div className="flex-none flex items-center px-6 h-16 bg-white border-b border-neutral-300">
        <svg className="block w-[6.5rem] h-auto" viewBox="0 0 1618 262">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1237.6 23.0797C1237.6 35.1197 1247.68 45.1997 1259.72 45.1997C1272.04 45.1997 1282.12 35.1197 1282.12 23.0797C1282.12 11.0397 1272.04 0.679688 1259.72 0.679688C1247.68 0.679688 1237.6 11.0397 1237.6 23.0797ZM1241.8 61.9997V202H1277.92V61.9997H1241.8ZM1418.22 62.0001H1453.5V195.28C1453.5 241.2 1417.38 261.92 1380.42 261.92C1350.46 261.92 1326.38 250.44 1314.06 227.76L1344.86 210.12C1350.74 221.04 1359.98 229.72 1381.54 229.72C1404.22 229.72 1418.22 217.4 1418.22 195.28V180.16C1408.42 193.32 1393.3 201.44 1373.42 201.44C1333.66 201.44 1303.7 169.24 1303.7 129.76C1303.7 90.5601 1333.66 58.0801 1373.42 58.0801C1393.3 58.0801 1408.42 66.2001 1418.22 79.3601V62.0001ZM1379.02 168.12C1401.7 168.12 1418.22 152.16 1418.22 129.76C1418.22 107.64 1401.7 91.6801 1379.02 91.6801C1356.34 91.6801 1339.82 107.64 1339.82 129.76C1339.82 152.16 1356.34 168.12 1379.02 168.12ZM1564.09 58.0801C1593.77 58.0801 1617.01 78.8001 1617.01 116.04V202H1580.89V120.52C1580.89 101.48 1569.41 91.6801 1553.17 91.6801C1535.53 91.6801 1522.37 102.04 1522.37 126.4V202H1486.25V62.0001H1522.37V77.6801C1530.77 65.0801 1545.33 58.0801 1564.09 58.0801ZM1146.33 101.76C1146.33 109.801 1157.21 112.782 1170.53 116.43C1191.52 122.182 1218.57 129.593 1218.57 161.12C1218.57 191.36 1192.25 205.92 1162.29 205.92C1134.29 205.92 1113.57 194.16 1103.49 172.6L1134.85 154.96C1138.77 166.44 1148.29 173.16 1162.29 173.16C1173.77 173.16 1181.61 169.24 1181.61 161.12C1181.61 153.113 1170.53 149.961 1157.04 146.127C1136.1 140.174 1109.37 132.575 1109.37 102.6C1109.37 74.0401 1133.73 58.0801 1162.57 58.0801C1185.25 58.0801 1204.85 68.4401 1215.77 87.7601L1184.97 104.56C1180.77 95.6001 1172.93 90.2801 1162.57 90.2801C1153.61 90.2801 1146.33 94.2001 1146.33 101.76ZM1025.79 173.16C1006.75 173.16 991.346 165.32 986.306 146.84H1091.87C1092.71 142.08 1093.27 137.32 1093.27 132C1093.27 90.8401 1063.87 58.0801 1022.43 58.0801C978.466 58.0801 948.506 90.2801 948.506 132C948.506 173.72 978.186 205.92 1025.23 205.92C1052.11 205.92 1073.11 195 1086.27 175.96L1057.15 159.16C1050.99 167.28 1039.79 173.16 1025.79 173.16ZM1057.15 118.84H985.746C989.946 100.92 1003.11 90.5601 1022.43 90.5601C1037.55 90.5601 1052.67 98.6801 1057.15 118.84ZM886.632 6H922.752V202H886.632V185.48C876.552 198.36 861.712 205.92 841.272 205.92C803.752 205.92 772.952 173.72 772.952 132C772.952 90.28 803.752 58.08 841.272 58.08C861.712 58.08 876.552 65.64 886.632 78.52V6ZM847.992 171.48C870.112 171.48 886.632 155.52 886.632 132C886.632 108.48 870.112 92.52 847.992 92.52C825.592 92.52 809.072 108.48 809.072 132C809.072 155.52 825.592 171.48 847.992 171.48ZM714.001 181.84C714.001 195 724.641 205.64 737.801 205.64C750.961 205.64 761.601 195 761.601 181.84C761.601 168.68 750.961 158.04 737.801 158.04C724.641 158.04 714.001 168.68 714.001 181.84ZM647.648 6H683.768V202H647.648V185.48C637.568 198.36 622.728 205.92 602.288 205.92C564.768 205.92 533.968 173.72 533.968 132C533.968 90.28 564.768 58.08 602.288 58.08C622.728 58.08 637.568 65.64 647.648 78.52V6ZM609.008 171.48C631.128 171.48 647.648 155.52 647.648 132C647.648 108.48 631.128 92.52 609.008 92.52C586.608 92.52 570.088 108.48 570.088 132C570.088 155.52 586.608 171.48 609.008 171.48ZM508.775 62.0001H472.655V78.5201C462.575 65.9201 447.455 58.0801 427.015 58.0801C389.775 58.0801 358.975 90.2801 358.975 132C358.975 173.72 389.775 205.92 427.015 205.92C447.455 205.92 462.575 198.08 472.655 185.48V202H508.775V62.0001ZM472.655 132C472.655 155.52 456.135 171.48 433.735 171.48C411.615 171.48 395.095 155.52 395.095 132C395.095 108.48 411.615 92.5201 433.735 92.5201C456.135 92.5201 472.655 108.48 472.655 132ZM358.069 202H316.349L286.109 159.44L255.589 202H213.869L265.109 130.6L216.109 62H257.829L286.109 101.48L314.389 62H355.829L306.829 130.32L358.069 202ZM209.52 62H171.16L147.36 148.24L121.88 62H87.7201L62.2401 147.96L38.4401 62H0.0800781L44.6001 202H79.0401L104.8 117.16L130.56 202H165L209.52 62Z"
            fill="url(#paint0_linear_4512_12543)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4512_12543"
              x1="0.0800781"
              y1="132"
              x2="1617"
              y2="131"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stopColor="#666666" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative flex ml-6 text-sm">
          <div
            className="absolute top-0 left-0 h-full bg-neutral-200 bg-opacity-50 rounded-2xl pointer-events-none transition-all duration-300 cursor-pointer"
            ref={indicator}
          />
          {["商业推广", "流量变现", "优秀案例"].map((item, index) => {
            return (
              <Item
                key={index}
                index={index}
                active={activeIndex === index}
                text={item}
                onClick={() => {
                  setActiveIndex(index)
                }}
              />
            )
          })}
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center m-6 font-medium text-sm">
        {[
          "https://wxa.wxs.qq.com/wxad-design/yijie/wxbrand-intro.webp",
          "https://wxa.wxs.qq.com/wxad-design/yijie/wxbrand-showcase-03.webp",
          "https://wxa.wxs.qq.com/wxad-design/yijie/wxbrand-showcase-01.webp",
        ].map((item, index) => {
          const active = activeIndex === index
          return (
            <img
              className={`absolute-full object-cover shadow-sm rounded-lg overflow-hidden
                ${
                  active
                    ? "wipe-in-animation opacity-100"
                    : "wipe-out-animation opacity-0"
                }`}
              style={{}}
              key={index}
              src={item}
            />
          )
        })}
      </div>
    </DemoBox>
  )
}

export default NavigationMenu
