import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

import { Footer } from "@src/design/organs/footer/Footer";
import { Nav } from "@src/design/organs/nav/Nav";
import { globalStyles } from "@src/design/theme/globalStyles";
import { styled, theme, darkTheme } from "@src/design/theme/stitches.config";
import { BaseApp } from "@src/pages/BaseApp";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class" value={{ light: theme.toString(), dark: darkTheme.toString() }}>
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
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
