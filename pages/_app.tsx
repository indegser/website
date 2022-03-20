import { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect } from "react";

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
    const darkCss = darkTheme.toString();

    switch (theme) {
      case "light": {
        document.body.classList.remove(darkCss);
        break;
      }
      case "dark": {
        document.body.classList.add(darkCss);
        break;
      }
    }
  }, [theme]);

  return (
    <>
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
    </>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
