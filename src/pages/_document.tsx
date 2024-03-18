import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-cmn-Hans">
      <Head>
      </Head>
      <body>
        <div
          className="pointer-events-none fixed inset-0 mix-blend-hard-light"
          style={{
            backgroundImage: "url(/noise.png)",
          }}
        />
        <Main></Main>
        <NextScript />
      </body>
    </Html>
  );
}
