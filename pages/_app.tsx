import { AppProps } from "next/app";
import Head from "next/head";

import { Footer } from "@src/design/organs/footer/Footer";
import { Nav } from "@src/design/organs/nav/Nav";
import { globalStyles } from "@src/design/theme/globalStyles";
import { styled } from "@src/design/theme/stitches.config";
import { StoreProvider } from "@src/hooks/store/StoreProvider";
import { BaseApp } from "@src/pages/BaseApp";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <StoreProvider value={pageProps.store}>
      <BaseApp>
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Page>
          <Nav />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </Page>
      </BaseApp>
    </StoreProvider>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
