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
    <div className="m-auto px-4 pt-8 md:pt-16 pb-28 w-[min(80rem,100%)] text-sm md:text-base">
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12"
            >
              <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z" />
              <path d="M12 2v20" />
            </svg>
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
        <div className="mb-4 md:mb-8 font-mono text-gray-500">
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
