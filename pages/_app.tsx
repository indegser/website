import { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect } from "react";
import { SWRConfig } from "swr";

import { Footer } from "@src/common/organs/footer/Footer";
import { Nav } from "@src/common/organs/nav/Nav";
import { darkTheme, styled } from "@src/common/stitches.config";
import { GlobalStyles } from "@src/design/GlobalStyles";
import { useThemeStore } from "@src/design/themeStore";
import { Analytics } from "@src/sdks/analytics";

Router.events.on("routeChangeComplete", Analytics.pageView);

export default function App({ Component, pageProps }: AppProps) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.body.classList.toggle(darkTheme.toString());
  }, [theme]);

  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    </SWRConfig>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
