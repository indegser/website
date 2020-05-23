import GlobalStyle from "common/atoms/GlobalStyle";
import Footer from "common/organs/footer/Footer";
import Nav from "common/organs/nav/Nav";
import styled from "@emotion/styled";
import Head from "next/head";
import Banner from "common/organs/banner/Banner";
import Router from "next/router";
import withGA from "next-ga";
import { useEffect } from "react";
import { generateAdaptiveTheme } from "@adobe/leonardo-contrast-colors";
import { useTokenStore } from "stores/tokenStore";

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
      ratios: [2, 4.6, 7, 12],
    },
    {
      name: "border",
      colorKeys: ["#cacaca"],
      ratios: [1.3, 2, 4, 8],
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
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lusitana&family=Nanum+Myeongjo:wght@700&display=swap"
          rel="stylesheet"
        />
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

export default withGA("UA-116457571-1", Router)(App);
