import Head from "next/head";
import { Router } from "next/router";
import styled from "@emotion/styled";

import { Analytics } from "apis/analytics";
import GlobalStyle from "common/GlobalStyle";
import ThemeScript from "common/ThemeScript";
import Nav from "common/organs/nav/Nav";
import { AppProps } from "next/app";

Router.events.on("routeChangeComplete", Analytics.pageView);
import "apis/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAdminStore } from "common/hooks/admin.hooks";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const state = useAdminStore.getState();
  state.setStatus(user ? "admin" : "anonymous");
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <ThemeScript />
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

const Page = styled.div`
  width: 100vw;
`;

const Main = styled.div``;
