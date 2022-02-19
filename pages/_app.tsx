import Head from "next/head";
import { Router } from "next/router";

import { Analytics } from "apis/analytics";
import { Nav } from "common/organs/nav/Nav";
import { AppProps } from "next/app";

Router.events.on("routeChangeComplete", Analytics.pageView);
import "apis/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAdminStore } from "common/hooks/admin.hooks";
import { globalStyles } from "common/globalStyles";
import { styled } from "common/stitches.config";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const state = useAdminStore.getState();
  state.setStatus(user ? "admin" : "anonymous");
});

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
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
      </Page>
    </>
  );
}

const Page = styled("div", {
  width: "100%",
});

const Main = styled("div", {});
