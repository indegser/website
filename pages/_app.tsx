import '@src/design/globals.css';

import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { globalStyles } from '@src/design/globalStyles';
import { Footer } from '@src/design/organs/footer/Footer';
import { Nav } from '@src/design/organs/nav/Nav';
import { BaseApp } from '@src/pages/BaseApp';

const queryClient = new QueryClient();

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(localizedFormat);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
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
      <Analytics />
    </>
  );
}

const Page = styled.div`
  width: 100%;
`;

const Main = styled.div`
  min-height: 100vh;
`;
