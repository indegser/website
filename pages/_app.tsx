import GlobalStyle from '../app/design/atoms/GlobalStyle'
import Footer from '../app/design/organs/footer/Footer'
import Nav from '../app/design/organs/nav/Nav'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'design/theme'
import Head from 'next/head'
import Banner from 'design/organs/banner/Banner'
import Router from 'next/router'
import withGA from 'next-ga'
import { ApolloProvider } from '@apollo/react-hooks'
import { createApolloClient } from 'apis/apolloClient'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex: 1 1;
    width: 100%;
  }
`

const uriMap = {
  '/b': '/api/book',
  '/': '/api/history',
}

const App = ({ Component, pageProps, router }) => {
  const { route } = router
  const client = createApolloClient(uriMap[route])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
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
          <ApolloProvider client={client}>
            <Component {...pageProps}></Component>
          </ApolloProvider>
        </main>
        <Footer />
      </Page>
      <div id="context-menu"></div>
    </ThemeProvider>
  )
}

export default withGA('UA-116457571-1', Router)(App)
