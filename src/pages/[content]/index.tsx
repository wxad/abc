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

export default function PostPage({ content }: { content: Post }) {
  const { frontmatter, headings, slug, code } = content

  const PostContent = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="m-auto px-4 pt-16 pb-28 w-[min(80rem,_100%)] text-base">
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="author" content="Aragakey." />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
      </Head>
      {/* <nav className="fixed 74:hidden bottom-0 py-6 px-4 left-1/2 transform -translate-x-1/2 z-20 w-[min(800px,_100vw)]">
        <div className="flex items-center justify-between px-4 h-[48px] bg-neutral-100 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-md">
          <NextLink
            className="flex items-center gap-2 text-xs font-semibold opacity-80"
            href="/"
          >
            <div
              className="w-6 h-6"
              style={{
                backgroundImage: "url(logo.webp)",
                backgroundSize: "100% 100%",
              }}
            />
            设计垂点
          </NextLink>
          <a
            className="flex"
            href="https://github.com/wxad/abc"
            target="_blank"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C24.2763 30.1077 27.0363 28.0664 28.9917 25.3432C30.947 22.6201 31.9991 19.3524 32 16C32 7.16 24.84 0 16 0Z"
                fill="rgba(0, 0, 0, 0.6)"
              ></path>
            </svg>
          </a>
        </div>
      </nav> */}
      <nav className="fixed hidden 74:flex flex-col justify-between top-16 bottom-20 pl-6 max-w-44 text-gray-600">
        <h2>
          <NextLink
            href="/"
            className="inline-flex flex-col items-center text-sm font-semibold opacity-80"
          >
            <div
              className="w-12 h-12"
              style={{
                backgroundImage: "url(logo.webp)",
                backgroundSize: "100% 100%",
              }}
            />
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
          <img src={frontmatter.cover} alt="" className="block mb-8 w-full rounded-lg shadow-lg" />
        ) : null}
        <div className="mb-8 font-mono text-gray-500">
          {new Intl.DateTimeFormat("zh-CN", {
            month: "long",
            year: "numeric",
            day: "numeric",
          }).format(new Date(frontmatter.editedAt))}
          <a
            className="ml-4 hover:text-blue-500 hover:underline hover:decoration-dotted hover:decoration-current hover:underline-offset-4 transition-all"
            target="_blank"
            href={frontmatter.authorLink}
          >
            @{frontmatter.author}
          </a>
        </div>
        <h1 className="mb-8 font-semibold text-3xl md:text-4xl">
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
