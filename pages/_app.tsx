import { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import { SWRConfig } from "swr";

import { globalStyles } from "@src/common/globalStyles";
import { Footer } from "@src/common/organs/footer/Footer";
import { Nav } from "@src/common/organs/nav/Nav";
import { darkTheme, styled } from "@src/common/stitches.config";
import { Analytics } from "@src/sdks/analytics";

Router.events.on("routeChangeComplete", Analytics.pageView);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page className={darkTheme}>
        <Nav />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </Page>
    </SWRConfig>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
