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
  const hotjarScript = `
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:2698426,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;

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
        <script dangerouslySetInnerHTML={{ __html: hotjarScript }} />
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
