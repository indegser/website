import GlobalStyle from "common/atoms/GlobalStyle";
import Footer from "common/organs/footer/Footer";
import Nav from "common/organs/nav/Nav";
import styled from "@emotion/styled";
import Head from "next/head";
import Banner from "common/organs/banner/Banner";
import { useEffect } from "react";
import { generateAdaptiveTheme } from "@adobe/leonardo-contrast-colors";
import { useTokenStore } from "stores/tokenStore";

import { Router } from "next/router";
import { Analytics } from "apis/analytics";

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

const COLORSPACE = "CAM02";

const palette = {
  colorScales: [
    {
      name: "text",
      colorKeys: ["#cacaca"],
      colorspace: COLORSPACE,
      ratios: [2, 4.6, 8, 12, 15],
    },
    {
      name: "border",
      colorKeys: ["#cacaca"],
      ratios: [1.3, 2, 4, 8],
    },
    {
      name: "bg",
      colorKeys: ["#1b1f23"],
      ratios: [1.09],
    },
    {
      name: "primary",
      colorKeys: ["#0088ff"],
      colorspace: COLORSPACE,
      ratios: [4.6, 6],
    },
  ],
  baseScale: "text",
};

const generator = generateAdaptiveTheme(palette);
const createTheme = (brightness: number) => {
  const variables = [];
  const [{ background }, ...rules] = generator(brightness);
  variables.push([`--background`, background]);
  for (const rule of rules) {
    for (const color of rule.values) {
      const { name, value } = color;
      variables.push([`--${name}`, value]);
    }
  }
  return variables;
};

const themes = JSON.stringify({
  light: createTheme(99),
  dark: createTheme(12),
});

Router.events.on("routeChangeComplete", Analytics.pageView);

const App = ({ Component, pageProps }) => {
  const setToken = useTokenStore((s) => s.setToken);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    token && setToken(token);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.THEME = ${themes}
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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&display=swap"
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
      <div id="context-menu"></div>
    </>
  );
};

export default App;
