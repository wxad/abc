import "@/pages/global.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import Footer from "@/components/Footer"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no viewport-fit=cover"
        />
        <meta name="renderer" content="webkit" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="abc 过设计点 A，作业务目标 BC 的思考辅助垂线。它们的交点即设计垂点。 Aragakey." />
        <title>设计垂点</title>
        <link
          rel="icon"
          href="https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      {/* @ts-ignore */}
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
