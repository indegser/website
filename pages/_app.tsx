import GlobalStyle from '../app/design/atoms/GlobalStyle'
import Footer from '../app/design/organs/footer/Footer'
import Nav from '../app/design/organs/nav/Nav'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'design/theme'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex: 1 1;
    width: 100%;
  }
`

export default ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Nav />
        <main>
          <Component {...pageProps}></Component>
        </main>
        <Footer />
      </Page>
    </ThemeProvider>
  )
}
