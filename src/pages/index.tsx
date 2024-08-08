import Cover2023 from "@/components/2023Cover"
import CarouselCover from "@/components/CarouselCover"
import TrailCover from "@/components/trail/TrailCover"
import LikesCover from "@/components/likes/LikesCover"
import GenCover from "@/components/generative/GenCover"
import ConicCover from "@/components/conic/ConicCover"
import CircularCover from "@/components/circular/CircularCover"
import FmCover from "@/components/fm/FmCover"
import FontFamilyCover from "@/components/font-family/FontFamilyCover"
import AduiCover from "@/components/adui/AduiCover"
import WxadCover from "@/components/wxad/WxadCover"
import BmCover from "@/components/bm/BmCover"
import DepthCover from "@/components/designing-depth/DepthCover"
import NextLink from "next/link"

const posts = [
  {
    title: "交互动画的层级设计",
    description:
      "所谓“感觉很好”的二维 UI 设计，基本来源于人们对真实三维世界的认知。只不过是在此之上，或效仿，或衍伸。这篇文章的主题是层级，是我反向地从 UI 出发，去寻找关于层级的原型的一次尝试。",
    slug: "designing-depth",
    publishedAt: "2024-08-03",
    editedAt: "2024-08-03",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <DepthCover />,
  },
  // {
  //   title: "文字环绕过渡动画",
  //   description: "asd",
  //   slug: "circular-animation",
  //   publishedAt: "2024-07-30",
  //   editedAt: "2024-07-30",
  //   author: "Aragakey.",
  //   authorLink: "https://codepen.io/aragakey",
  //   children: <BmCover />,
  // },
  {
    title: "回顾：制作朋友圈广告年度评选",
    description:
      "我享受和设计师合作的创作过程。我们职责互补，但不模糊。我们忘却时间，将对个人实现的追求托付于我们的作品。我这个人很简单，只想要做优雅和精致的 UI。我很庆幸遇到这样适配自己特长的项目。",
    slug: "bm",
    publishedAt: "2024-07-22",
    editedAt: "2024-07-22",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <BmCover />,
  },
  {
    title: "回顾：制作微信广告官网",
    description:
      "微信广告官网是一个非常完整的项目。我将总结自己在设计、前端及支撑其内容的后台系统上的工作，全面地回顾官网的开发历程。",
    slug: "wxad",
    publishedAt: "2024-07-16",
    editedAt: "2024-07-16",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <WxadCover />,
  },
  {
    title: "回顾：制作微信广告设计语言 AD UI",
    description:
      "我对设计语言的价值观，主要分为设计、组件、效能、流程这四个方面。我将从这四个方面阐述我对设计语言的理解，以及我的具体工作。",
    slug: "adui",
    publishedAt: "2024-07-10",
    editedAt: "2024-07-10",
    author: "Aragakey.",
    authorLink: "https://codepen.io/aragakey",
    children: <AduiCover />,
  },
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
    <>
      <div className="mx-auto mb-32 px-4 md:px-16 max-w-[1088px]">
        <div className="flex items-end justify-between mb-8 py-6 md:py-10">
          <div className="flex-1 flex flex-col items-center 74:flex-row">
            <div
              className="relative w-12 h-12 74:top-[0.15rem] 74:mr-2 74:w-10 74:h-10 opacity-80"
              style={{
                backgroundImage: "url(/abc/logo.webp)",
                backgroundSize: "100% 100%",
              }}
            />
            <div className="text-center 74:text-left">
              <h1 className="relative left-[-1px] text-neutral-500 74:text-neutral-800 font-semibold text-sm 74:text-base">
                设计垂点
              </h1>
              <div className="mt-4 74:mt-0 text-xs text-neutral-500">
                过设计点 A，作业务目标 BC 的思考辅助垂线。
                <br className="md:hidden" />
                它们的交点即设计垂点。
              </div>
            </div>
          </div>
          <a
            href="https://jiangyijie27.github.io/aragakey"
            target="_blank"
            className="hidden 74:block"
          >
            <svg className="block w-24 h-auto" viewBox="0 0 50 12" fill="none">
              <path
                d="M48.3359 8.31445C48.3359 7.875 48.6934 7.51172 49.1387 7.51172C49.5781 7.51172 49.9414 7.875 49.9414 8.31445C49.9414 8.75977 49.5781 9.12305 49.1387 9.12305C48.6934 9.12305 48.3359 8.75977 48.3359 8.31445Z"
                fill="black"
              />
              <path
                d="M48.373 2.80664C48.1094 3.66797 46.2695 8.90039 46.2637 8.91797L46.1055 9.3457C45.5957 10.7168 44.9102 11.1738 43.7031 11.1738C43.4746 11.1738 43.1992 11.1504 43.0176 11.1152V10.1309C43.1172 10.1484 43.3223 10.1602 43.4922 10.1602C44.1953 10.1602 44.5293 9.92578 44.6641 9.31641L44.7402 9.04688L42.5312 2.80664H43.9727L45.4551 7.72852H45.4961L46.9961 2.80664H48.373Z"
                fill="black"
              />
              <path
                d="M39.3574 9.10547C37.6992 9.10547 36.6445 8.00977 36.6445 6.17578V5.54883C36.6445 3.82031 37.6758 2.70117 39.3047 2.70117C40.957 2.70117 41.9531 3.86133 41.9531 5.60742V6.19922H37.9277V6.3457C37.9277 7.38867 38.4902 8.08008 39.375 8.08008C40.0371 8.08008 40.4883 7.75195 40.6465 7.21875H41.8828C41.6953 8.2207 40.8867 9.10547 39.3574 9.10547ZM37.9277 5.29102H40.6816V5.2793C40.6816 4.40039 40.1367 3.70898 39.3105 3.70898C38.4727 3.70898 37.9277 4.40039 37.9277 5.2793V5.29102Z"
                fill="black"
              />
              <path
                d="M32.2695 6.82617V9H30.9688V0.580078H32.2695V5.4375H32.3223L34.5488 2.80664H36.0898L33.7461 5.49023L36.2422 9H34.6895L32.7676 6.26367L32.2695 6.82617Z"
                fill="black"
              />
              <path
                d="M26.3438 9.09375C25.1426 9.09375 24.3164 8.37305 24.3164 7.21875C24.3164 6.11719 25.0781 5.41992 26.502 5.41992H28.0723V4.82812C28.0723 4.11914 27.6504 3.72656 26.9238 3.72656C26.2148 3.72656 25.8105 4.0957 25.7637 4.64648H24.5449C24.5977 3.5918 25.3008 2.71289 26.9531 2.71289C28.3301 2.71289 29.3555 3.39844 29.3555 4.78125V9H28.1191V8.23828H28.0723C27.8027 8.71289 27.2578 9.09375 26.3438 9.09375ZM26.7363 8.10352C27.4922 8.10352 28.0723 7.63477 28.0723 6.96094V6.27539H26.7246C25.9688 6.27539 25.623 6.63281 25.623 7.14844C25.623 7.79297 26.1621 8.10352 26.7363 8.10352Z"
                fill="black"
              />
              <path
                d="M20.2383 10.2656C21.1348 10.2656 21.6914 9.74414 21.6914 8.84766V7.95117H21.6445C21.4043 8.49023 20.7422 8.92969 19.8867 8.92969C18.4629 8.92969 17.4727 7.91602 17.4727 6.04102V5.5957C17.4727 3.74414 18.457 2.72461 19.8867 2.72461C20.7363 2.72461 21.4043 3.1582 21.668 3.70312H21.7148V2.80664H22.9863V8.90625C22.9863 10.5527 21.627 11.2676 20.2266 11.2676C18.5391 11.2676 17.7246 10.4531 17.6074 9.42188H18.8965C19.002 9.88477 19.4883 10.2656 20.2383 10.2656ZM20.2676 3.78516C19.3418 3.78516 18.7969 4.45312 18.7969 5.66016V6.0293C18.7969 7.21289 19.3418 7.9043 20.2676 7.9043C21.1582 7.9043 21.6914 7.21289 21.6914 6.0293V5.66016C21.6914 4.49414 21.1289 3.78516 20.2676 3.78516Z"
                fill="black"
              />
              <path
                d="M13.1016 9.09375C11.9004 9.09375 11.0742 8.37305 11.0742 7.21875C11.0742 6.11719 11.8359 5.41992 13.2598 5.41992H14.8301V4.82812C14.8301 4.11914 14.4082 3.72656 13.6816 3.72656C12.9727 3.72656 12.5684 4.0957 12.5215 4.64648H11.3027C11.3555 3.5918 12.0586 2.71289 13.7109 2.71289C15.0879 2.71289 16.1133 3.39844 16.1133 4.78125V9H14.877V8.23828H14.8301C14.5605 8.71289 14.0156 9.09375 13.1016 9.09375ZM13.4941 8.10352C14.25 8.10352 14.8301 7.63477 14.8301 6.96094V6.27539H13.4824C12.7266 6.27539 12.3809 6.63281 12.3809 7.14844C12.3809 7.79297 12.9199 8.10352 13.4941 8.10352Z"
                fill="black"
              />
              <path
                d="M7.13281 9V2.80664H8.43359V3.62109H8.48047C8.63867 3.23438 9.10156 2.71875 9.96289 2.71875C10.1328 2.71875 10.2793 2.73047 10.4023 2.75391V3.90234C10.291 3.87305 10.0625 3.85547 9.8457 3.85547C8.80273 3.85547 8.45117 4.5 8.45117 5.33203V9H7.13281Z"
                fill="black"
              />
              <path
                d="M2.51953 9.09375C1.31836 9.09375 0.492188 8.37305 0.492188 7.21875C0.492188 6.11719 1.25391 5.41992 2.67773 5.41992H4.24805V4.82812C4.24805 4.11914 3.82617 3.72656 3.09961 3.72656C2.39062 3.72656 1.98633 4.0957 1.93945 4.64648H0.720703C0.773438 3.5918 1.47656 2.71289 3.12891 2.71289C4.50586 2.71289 5.53125 3.39844 5.53125 4.78125V9H4.29492V8.23828H4.24805C3.97852 8.71289 3.43359 9.09375 2.51953 9.09375ZM2.91211 8.10352C3.66797 8.10352 4.24805 7.63477 4.24805 6.96094V6.27539H2.90039C2.14453 6.27539 1.79883 6.63281 1.79883 7.14844C1.79883 7.79297 2.33789 8.10352 2.91211 8.10352Z"
                fill="black"
              />
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
                <div key={index} className="mb-12">
                  <div
                    className={`flex flex-col-reverse items-center pb-12 ${
                      index % 2 ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    <div
                      className={`flex-1 min-w-0 border-solid border-neutral-200 ${
                        index % 2
                          ? "md:pl-16 md:border-l-[1px]"
                          : "md:pr-16 md:border-r-[1px]"
                      }`}
                    >
                      <div className="mb-6 font-mono text-neutral-500">
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
                      <div className="text-sm text-neutral-500">{description}</div>
                      <NextLink
                        href={slug}
                        className="inline-flex items-center mt-8 md:mt-16 gap-2 text-sm text-neutral-600 hover:text-blue-500 font-medium hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4 transition-all"
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
                  <hr
                    className="flex-none h-[1px] bg-neutral-300"
                    style={{
                      maskImage:
                        "linear-gradient(90deg, transparent, rgb(255, 255, 255) 20%, rgb(255, 255, 255) calc(100% - 20%), transparent)",
                    }}
                  />
                </div>
              )
            }
          )}
        </div>
      </div>
    </>
  )
}

export default Home
