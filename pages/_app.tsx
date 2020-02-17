import GlobalStyle from '../app/atoms/GlobalStyle'
import Footer from '../app/organs/footer/Footer'
import Nav from '../app/organs/nav/Nav'
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
