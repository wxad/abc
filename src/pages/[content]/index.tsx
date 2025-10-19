import fs from "fs"
import React from "react"
import { GetStaticPropsContext } from "next"
import { getMDXComponent } from "mdx-bundler/client"
import Head from "next/head"
import NextLink from "next/link"
import { getAllPosts, getPost, type Post } from "@/lib/content.server"
import {
  H2,
  H3,
  P,
  A,
  Ol,
  Code,
  Strong,
  Pre,
  BlockQuote,
  Img,
  Hr,
} from "@/components/MdxComponents"
import { Comments } from "@/components/Comments"
import { siteConfig } from "@/lib/config"
import { Pyramid, Calendar, CalendarClock, Signature } from "lucide-react"

export default function PostPage({ content }: { content: Post }) {
  const { frontmatter, headings, slug, code } = content

  const PostContent = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="m-auto px-4 pt-8 md:pt-16 pb-28 w-[min(80rem,100%)] text-sm leading-relaxed md:text-base">
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="author" content="Aragakey." />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
      </Head>
      <nav className="fixed hidden 74:flex flex-col justify-between top-16 bottom-[7.2rem] pl-6 max-w-44 text-gray-600">
        <h2>
          <NextLink
            href="/"
            className="inline-flex flex-col items-center text-sm font-semibold"
          >
            <Pyramid className="size-12" />
            设计垂点
          </NextLink>
        </h2>
        <div className="grid gap-2 text-xs">
          {headings.map((heading) => (
            <div key={heading.id}>
              <a href={`#${heading.id}`} className="hover:text-blue-500">
                {heading.text}
              </a>
            </div>
          ))}
        </div>
      </nav>
      <div className="m-auto max-w-[800px] ">
        {frontmatter.cover ? (
          <img
            src={frontmatter.cover}
            alt=""
            className="block mb-8 w-full rounded-lg shadow-lg"
          />
        ) : null}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 md:mb-8 font-mono text-neutral-500">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span>{frontmatter.publishedAt}</span>
            {frontmatter.editedAt && (
              <span className="ml-4">
                <span className="flex items-center gap-1">
                  <CalendarClock className="size-3.5" />
                  <span>{frontmatter.editedAt}</span>
                </span>
              </span>
            )}
          </span>
          <span className="flex items-center gap-1">
            <Signature className="size-3.5" />
            <a
              className="hover:text-blue-500 hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4 transition-all"
              target="_blank"
              href={frontmatter.authorLink}
            >
              {frontmatter.author}
            </a>
          </span>
        </div>
        <h1 className="mb-8 font-semibold text-2xl md:text-4xl">
          {frontmatter.title}
        </h1>
        <PostContent
          components={{
            h2: H2 as any,
            h3: H3 as any,
            p: P as any,
            a: A as any,
            ol: Ol as any,
            pre: Pre as any,
            code: Code as any,
            strong: Strong as any,
            blockquote: BlockQuote as any,
            img: Img as any,
            hr: Hr as any,
          }}
        />

        {/* GitHub 评论区域 */}
        {/* {siteConfig.comments.enabled && (
          <Comments
            repo={siteConfig.github.repo}
            theme={siteConfig.comments.theme}
            issueTerm={siteConfig.comments.issueTerm}
          />
        )} */}
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => ({ params: { content: post.slug } })),
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      content: await getPost(context.params?.content as string),
    },
  }
}
