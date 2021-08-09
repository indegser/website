import Head from "next/head";
import { Router } from "next/router";
import styled from "@emotion/styled";

import { Analytics } from "apis/analytics";
import GlobalStyle from "common/GlobalStyle";
import Footer from "common/organs/footer/Footer";
import Nav from "common/organs/nav/Nav";
import ThemeScript from "common/ThemeScript";
import { spacingVariables } from "common/variables";

export function reportWebVitals(metric) {
  Analytics.reportWebVitals(metric);
}

const Page = styled.div`
  display: flex;
  width: 100vw;
  overflow: hidden;
`;

const Main = styled.div`
  flex: 1 1;
`;

Router.events.on("routeChangeComplete", Analytics.pageView);

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ThemeScript />
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Page>
        <Nav />
        <Main>
          <Component {...pageProps}></Component>
        </Main>
      </Page>
    </>
  );
};

export default App;
