import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="zh-cmn-Hans">
      <Head></Head>
      <body className="scrollbar-custom">
        <div
          className="pointer-events-none fixed inset-0 mix-blend-hard-light"
          style={{
            backgroundImage:
              "url(https://wxa.wxs.qq.com/wxad-design/yijie/noise.png)",
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "-9999px",
            left: "-9999px",
          }}
        >
          防止微信内出现全文翻译提示。因此在这里放一个充满中文的分区。
          防止微信内出现全文翻译提示。因此在这里放一个充满中文的分区。
          防止微信内出现全文翻译提示。因此在这里放一个充满中文的分区。
          防止微信内出现全文翻译提示。因此在这里放一个充满中文的分区。
        </div>
        <Main></Main>
        <NextScript />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.39.0/css-doodle.min.js"></script>
      </body>
    </Html>
  )
}
