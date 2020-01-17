import { Provider as ReduxProvider } from 'react-redux'
import GlobalStyle from "../app/atoms/GlobalStyle";
import { store } from '../app/store/store';
import Footer from '../app/organs/footer/Footer';

export default ({ Component, pageProps }) => (
  <ReduxProvider store={store}>
    <GlobalStyle />
    <Component {...pageProps}></Component>
    <Footer />
  </ReduxProvider>
)