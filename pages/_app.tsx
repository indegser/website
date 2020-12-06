import GlobalStyle from "common/atoms/GlobalStyle";

import Footer from "common/organs/footer/Footer";
import Nav from "common/organs/nav/Nav";
import styled from "@emotion/styled";
import Head from "next/head";
import Banner from "common/organs/banner/Banner";
import { Router } from "next/router";
import { Analytics } from "apis/analytics";
import { themes } from "common/theme";

export function reportWebVitals(metric) {
  Analytics.reportWebVitals(metric);
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex: 1 1;
    width: 100%;
  }
`;

Router.events.on("routeChangeComplete", Analytics.pageView);

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.THEME = ${JSON.stringify(themes)}
            function changeTheme() {
              let theme = localStorage.getItem("theme");
              if (!theme) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  theme = 'dark';
                } else {
                  theme = 'light';
                }
              }
              
              let rules = THEME[theme];
              let root = document.documentElement.style;
              for (const [property, value] of rules) {
                root.setProperty(property, value);
              }

              root.setProperty('--theme', theme);
            }

            changeTheme();
          `,
          }}
        ></script>
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
        <Banner />
        <Nav />
        <main>
          <Component {...pageProps}></Component>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default App;
