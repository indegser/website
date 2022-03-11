import Head from "next/head";
import { Router } from "next/router";

import { Analytics } from "@src/apis/analytics";
import { Nav } from "@src/common/organs/nav/Nav";
import { AppProps } from "next/app";

Router.events.on("routeChangeComplete", Analytics.pageView);
import "@src/apis/firebase";
import { useAdminStore } from "@src/common/hooks/admin.hooks";
import { globalStyles } from "@src/common/globalStyles";
import { styled } from "@src/common/stitches.config";
import { Footer } from "@src/common/organs/footer/Footer";
import { SWRConfig } from "swr";
import { supabase } from "@src/apis/supabase";

supabase.auth.onAuthStateChange((event) => {
  const state = useAdminStore.getState();
  state.setStatus(event === "SIGNED_IN" ? "admin" : "anonymous");
});

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Nav />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </Page>
    </SWRConfig>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", { minHeight: "100vh" });
