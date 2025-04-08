import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <body>
        <div id="root">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
