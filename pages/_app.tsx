import { AppProps } from "next/app";
import Head from "next/head";

import { styled } from "@src/common/stitches.config";
import { GlobalStyles } from "@src/design/GlobalStyles";
import { Footer } from "@src/design/organs/footer/Footer";
import { Nav } from "@src/design/organs/nav/Nav";
import { BaseApp } from "@src/pages/BaseApp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseApp>
      <Head>
        <title>Home</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <GlobalStyles />
        <Nav />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </Page>
    </BaseApp>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
