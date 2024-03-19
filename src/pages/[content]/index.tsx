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
} from "@/components/MdxComponents"

export default function PostPage({ content }: { content: Post }) {
  const { frontmatter, headings, slug, code } = content

  const PostContent = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="m-auto px-4 py-16 w-[min(80rem,_100%)] text-base">
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="author" content="Aragakey." />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
      </Head>
      <nav className="fixed 74:hidden bottom-0 p-4 left-1/2 transform -translate-x-1/2 z-20 w-[min(800px,_100vw)]">
        <div className="flex items-center px-2 h-[48px] bg-neutral-100 bg-opacity-95 backdrop-blur-sm rounded-md shadow-md">
          <NextLink
            className="flex items-center gap-2 text-xs font-semibold"
            href="/"
          >
            <div
              className="w-6 h-6"
              style={{
                backgroundImage: "url(/logo.png)",
                backgroundColor: "rgb(243 243 243)",
                backgroundBlendMode: "darken",
                backgroundSize: "100% 100%",
              }}
            />
            设计垂点
          </NextLink>
        </div>
      </nav>
      <nav className="fixed hidden 74:flex flex-col justify-between top-16 bottom-20 pl-6 max-w-44 text-gray-600">
        <h2>
          <NextLink
            href="/"
            className="inline-flex flex-col items-center text-sm font-semibold opacity-80"
          >
            <div
              className="w-12 h-12"
              style={{
                backgroundImage: "url(/logo.png)",
                backgroundColor: "hsl(0, 0%, 93%)",
                backgroundBlendMode: "darken",
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
        <div className="mb-8 font-mono text-gray-500">
          {new Intl.DateTimeFormat("zh-CN", {
            month: "long",
            year: "numeric",
            day: "numeric",
          }).format(new Date(frontmatter.editedAt))}
          <span className="ml-4">{frontmatter.author}</span>
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
