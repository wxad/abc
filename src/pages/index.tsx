import Cover2023 from "@/components/2023Cover"
import CarouselCover from "@/components/CarouselCover"
import TrailCover from "@/components/trail/TrailCover"
import LikesCover from "@/components/likes/LikesCover"
import GenCover from "@/components/generative/GenCover"
import ConicCover from "@/components/conic/ConicCover"
import CircularCover from "@/components/circular/CircularCover"
import FmCover from "@/components/fm/FmCover"
import FontFamilyCover from "@/components/font-family/FontFamilyCover"
import NextLink from "next/link"

const posts = [
  {
    title: "画出完美的文字圆形环绕 UI",
    description:
      "2024 年 7 月 5 日是微信广告十周年的日子。做了一些围绕“文字圆形环绕”（实在不知道如何取名）的 UI 及过渡。当时做得不够好，我在这里完善一下。",
    slug: "circular-text",
    publishedAt: "2024-07-09",
    editedAt: "2024-07-09",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <CircularCover />,
  },
  {
    title: "用 framer-motion 实现优雅的 conic-gradient 旋转动画",
    description:
      "随着今年微信广告榜单页面的升级，我和设计师一起完成了基于 conic-gradient 的旋转动画。这篇文章中，我将简单总结使用 framer-motion 逐步优化的过程。",
    slug: "conic-gradient",
    publishedAt: "2024-06-21",
    editedAt: "2024-06-21",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <ConicCover />,
  },
  {
    title: "Functional Motion：UI 组件库的动效设计细节",
    slug: "functional-motion",
    description: "功能优先的动效设计。you see, fun is in functional.",
    publishedAt: "2024-06-06",
    editedAt: "2024-06-06",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <FmCover />,
  },
  {
    title: "我的 CSS 生成艺术世界",
    slug: "generative",
    description:
      "在 2019 年第五届 CSS 大会上，一位名为 yuanchuan 的分享者花了 10 分钟的时间差点让我睡着。但是在这之后的时间里，我被他的 CSS 艺术世界深深地震撼，直到今天也是。",
    publishedAt: "2024-06-02",
    editedAt: "2024-06-02",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <GenCover />,
  },
  {
    title: "我做的点赞/投票动画集合",
    description:
      "好像在工作的这些年中，我做的最多的动画就是点赞或按钮动画。那就简单地整一个集合吧。",
    slug: "likes",
    publishedAt: "2024-04-30",
    editedAt: "2024-04-30",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <LikesCover />,
  },
  {
    title: "用 react-spring 设计有“惯性”的交互动画",
    description:
      "最近我为设计垂点的链接文字加入了一个交互动画。思考一个有趣的交互动画并且将它实现，是一件让人快乐的事。",
    slug: "trail",
    publishedAt: "2024-04-16",
    editedAt: "2024-04-16",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <TrailCover />,
  },
  {
    title: "转盘交互动画：以关键参数，细化我们的感受",
    slug: "carousel",
    description:
      "我们将通过文字和交互式 demo 穿插的方式，一起思考和体验：有哪些关键参数影响着最终结果。以此细化对交互动画的感受，体会“对”或“不对”之间的具体差异。",
    publishedAt: "2024-03-16",
    editedAt: "2024-03-16",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <CarouselCover />,
  },
  {
    title: "2023：面对自我的提问与面对自我的回答",
    slug: "2023",
    description:
      "记录了我于 2023 一整年间，断断续续自说自话的一些文字。我喜欢，并且需要用文字的形式梳理思绪。",
    publishedAt: "2023-12-31",
    editedAt: "2023-12-31",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <Cover2023 />,
  },
  {
    title: "我们认真地想了想 font-family",
    description:
      "一个设计团队，存在一些需要标准化的课题。字体，也许是其中最为基础的一环。",
    slug: "font-family",
    publishedAt: "2016-09-26",
    editedAt: "2016-09-26",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <FontFamilyCover />,
  },
]

const Home = () => {
  return (
    <div className="m-auto px-4 md:px-16 max-w-[1088px]">
      <div className="flex items-end justify-between mb-8 py-6 md:mb-16 md:py-12">
        <div className="flex-1 flex flex-col items-center 74:flex-row">
          <div
            className="relative w-12 h-12 74:top-1 74:mr-2 74:w-10 74:h-10 opacity-80"
            style={{
              backgroundImage: "url(/abc/logo.webp)",
              backgroundSize: "100% 100%",
            }}
          />
          <div className="text-center 74:text-left">
            <h1 className="relative left-[-1px] text-neutral-500 74:text-neutral-800 font-semibold text-sm 74:text-base">
              设计垂点
            </h1>
            <div className="mt-4 74:mt-0 text-xs text-gray-500">
              过设计点 A，作业务目标 BC 的思考辅助垂线。
              <br className="md:hidden" />
              它们的交点即设计垂点。
            </div>
          </div>
        </div>
        <a href="https://wxad.design" className="hidden 74:block">
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
        </a>
      </div>
      <div className="">
        {posts.map(
          (
            {
              title,
              description,
              children,
              slug,
              editedAt,
              author,
              authorLink,
            },
            index
          ) => {
            return (
              <div
                key={index}
                className={`flex flex-col-reverse items-center mb-16 pb-16 border-b-[1px] border-dashed border-gray-300 ${
                  index % 2 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div
                  className={`flex-1 min-w-0 border-dashed border-gray-300 ${
                    index % 2
                      ? "md:pl-16 md:border-l-[1px]"
                      : "md:pr-16 md:border-r-[1px]"
                  }`}
                >
                  <div className="mb-6 font-mono text-gray-500">
                    {new Intl.DateTimeFormat("zh-CN", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    }).format(new Date(editedAt))}
                    <a
                      className="ml-4 hover:text-blue-500 hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4 transition-all"
                      target="_blank"
                      href={authorLink}
                    >
                      @{author}
                    </a>
                  </div>
                  <NextLink
                    href={slug}
                    className="block mb-8 font-semibold text-2xl md:text-3xl hover:text-blue-500 transition-all"
                  >
                    {title}
                  </NextLink>
                  <div className="text-sm text-gray-500">{description}</div>
                  <NextLink
                    href={slug}
                    className="inline-flex items-center mt-8 md:mt-32 gap-2 text-sm text-gray-600 hover:text-blue-500 font-medium hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4 transition-all"
                  >
                    阅读文章
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      ></path>
                    </svg>
                  </NextLink>
                </div>
                <div
                  className={`flex-1 min-w-0 w-full pb-8 max-w-[300px] md:pb-0 md:max-w-[initial] md:w-auto ${
                    index % 2 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  {children}
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default Home
