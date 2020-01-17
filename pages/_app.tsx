import GlobalStyle from "../app/atoms/GlobalStyle";

export default ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps}></Component>
  </>
)