import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const MainHead = Head as any;
  const MainNextScript = NextScript as any;
  return (
    <Html>
      <MainHead>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </MainHead>
      <body className={"dark:bg-neutral-800"}>
        <Main />
        <MainNextScript />
      </body>
    </Html>
  );
}
