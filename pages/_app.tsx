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

const beusableScript = `
(function(w, d, a){
  w.__beusablerumclient__ = {
    load : function(src){
      var b = d.createElement("script");
      b.src = src; b.async=true; b.type = "text/javascript";
      d.getElementsByTagName("head")[0].appendChild(b);
    }
  };w.__beusablerumclient__.load(a);
})(window, document, "//rum.beusable.net/script/b211112e215339u478/632f9e97eb");
`;

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
        <script dangerouslySetInnerHTML={{ __html: hotjarScript }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: beusableScript }}
        />
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
