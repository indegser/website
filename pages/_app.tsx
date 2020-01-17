import { Provider as ReduxProvider } from 'react-redux'
import GlobalStyle from "../app/atoms/GlobalStyle";
import { store } from '../app/store/store';

export default ({ Component, pageProps }) => (
  <ReduxProvider store={store}>
    <GlobalStyle />
    <Component {...pageProps}></Component>
  </ReduxProvider>
)