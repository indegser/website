import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import Head from "next/head";

import { Footer } from "@src/design/organs/footer/Footer";
import { Nav } from "@src/design/organs/nav/Nav";
import { globalStyles } from "@src/design/theme/globalStyles";
import { styled } from "@src/design/theme/stitches.config";
import { BaseApp } from "@src/pages/BaseApp";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
          <BaseApp>
            <Head>
              <title>Home</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
              />
              <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              <link rel="apple-touch-icon" href="/icon-512x512.png" />
              <link rel="manifest" href="/manifest.webmanifest" />
              <meta name="theme-color" content="" />
            </Head>
            <Page>
            <Nav />
              <Main>
                <Component {...pageProps} />
              </Main>
              <Footer />
            </Page>
          </BaseApp>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
