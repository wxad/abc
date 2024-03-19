import Cover2023 from "@/components/2023Cover"
import CarouselCover from "@/components/CarouselCover"
import NextLink from "next/link"

const posts = [
  {
    title: "转盘交互动画：以关键参数，细化我们的感受",
    slug: "horizontal-carousel",
    description:
      "我们将通过文字和交互式 demo 穿插的方式，一起思考和体验：有哪些关键参数影响着最终结果。以此细化对交互动画的感受，体会“对”或“不对”之间的具体差异。",
    publishedAt: "2024-03-16",
    editedAt: "2024-03-16",
    author: "Aragakey.",
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
    children: <Cover2023 />,
  },
]

const Home = () => {
  return (
    <div className="m-auto px-4 md:px-16 max-w-[1088px]">
      <div className="mb-8 py-6 md:mb-16 md:py-12">
        <h1 className="flex flex-col items-center text-sm text-gray-600 font-semibold opacity-80">
          <div
            className="w-12 h-12"
            style={{
              backgroundImage: "url(/abc/logo.png)",
              backgroundColor: "hsl(0, 0%, 93%)",
              backgroundBlendMode: "darken",
              backgroundSize: "100% 100%",
            }}
          />
          设计垂点
        </h1>
        <div className="mt-4 text-center font-sm text-gray-500">
          过设计点 A，作业务目标 BC 的思考辅助垂线。
          <br className="md:hidden" />
          它们的交点即设计垂点。
        </div>
      </div>
      <div className="">
        {posts.map(
          ({ title, description, children, slug, editedAt, author }, index) => {
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
                    <span className="ml-4">{author}</span>
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
