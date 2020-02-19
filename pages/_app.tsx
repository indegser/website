import GlobalStyle from '../app/design/atoms/GlobalStyle'
import Footer from '../app/design/organs/footer/Footer'
import Nav from '../app/design/organs/nav/Nav'
import styled from 'styled-components'

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
    <>
      <GlobalStyle />
      <Page>
        <Nav />
        <main>
          <Component {...pageProps}></Component>
        </main>
        <Footer />
      </Page>
    </>
  )
}
