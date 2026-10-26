import { bundleMDX } from "mdx-bundler"
import * as fs from "fs"
import * as path from "path"
import { glob } from "glob"
import matter from "gray-matter"
import rehypePrettyCode from "rehype-pretty-code"

import { getId } from "./utils"

const CONTENT_FOLDER = `${process.cwd()}/_dist-content`
const POST_FILENAME = "index.mdx"

export type Heading = {
  id: string
  text: string
}

export type Post = {
  code: string
  frontmatter: Record<string, any>
  slug: string
  headings: Heading[]
}

export type PostMetadata = {
  frontmatter: Record<string, any>
  slug: string
}

/**
 * Gets the post from `dist/content` and bundles it using MDX bundler
 */
const readPostSource = async (slug: string) => {
  const distFolder = path.join(CONTENT_FOLDER, slug)
  const distFile = path.join(distFolder, POST_FILENAME)
  try {
    return {
      folder: distFolder,
      source: (await fs.promises.readFile(distFile)).toString(),
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }

  // build:content 会先清空 _dist-content，空窗期改读源文件
  const srcFolder = path.join(process.cwd(), "src/content", slug)
  return {
    folder: srcFolder,
    source: (await fs.promises.readFile(path.join(srcFolder, POST_FILENAME))).toString(),
  }
}

export const getPost = async (slug: string): Promise<Post> => {
  const { folder: postFolder, source: mdxSource } = await readPostSource(slug)

  const mdxOut = await bundleMDX({
    source: mdxSource,
    cwd: postFolder,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [
          rehypePrettyCode,
          {
            theme: "github-light",
          },
        ],
      ]
      return options
    },
    esbuildOptions(options) {
      /**
       * Babel saves React files with a .js extension, so we have to explicitly tell
       * esbuild to parse these files assuming it contains JSX
       */
      options.loader = {
        ".js": "jsx",
      }
      options.tsconfig = `${process.cwd()}/tsconfig-esbuild.json`
      return options
    },
  })
  return { ...mdxOut, slug, headings: getHeadings(mdxSource) }
}

const getHeadings = (content: string): Heading[] => {
  return content
    .split("\n")
    .filter((line) => line.match(/^##\s/))
    .map((line) => line.replace("##", "").trim())
    .map((text) => ({
      text,
      id: getId(text),
    }))
}

export const getAllPosts = async (): Promise<PostMetadata[]> => {
  const paths = await getAllPostPaths()
  return Promise.all(
    paths.map(async (postPath) => {
      const file = await fs.promises.readFile(
        path.join(process.cwd(), postPath)
      )
      const { data: frontmatter } = matter(file.toString())
      return {
        slug: postPath.replace("src/content/", "").replace("/index.mdx", ""),
        frontmatter,
      }
    })
  )
}

const getAllPostPaths = async () => glob("src/content/**/index.mdx")
