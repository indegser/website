import Head from "next/head";
import { Router } from "next/router";
import styled from "@emotion/styled";

import { Analytics } from "apis/analytics";
import GlobalStyle from "common/GlobalStyle";
import ThemeScript from "common/ThemeScript";
import Nav from "common/organs/nav/Nav";

export function reportWebVitals(metric) {
  Analytics.reportWebVitals(metric);
}

const Page = styled.div`
  width: 100vw;
`;

const Main = styled.div``;

Router.events.on("routeChangeComplete", Analytics.pageView);

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <ThemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
        <title>Home</title>
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
