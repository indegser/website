import { Provider as ReduxProvider } from 'react-redux'
import GlobalStyle from '../app/atoms/GlobalStyle'
import { createStore } from '../app/store/store'
import Footer from '../app/organs/footer/Footer'
import Nav from '../app/organs/Nav'
import { useMemo } from 'react'
import SignIn from '../app/organs/sign-in/SignIn'

export default ({ Component, pageProps, router }) => {
  const store = useMemo(() => {
    const s = createStore({ page: pageProps.data })

    if (process.browser) {
      ;(window as any).getState = () => s.getState()
    }

    return s
  }, [])

  return (
    <ReduxProvider store={store}>
      <GlobalStyle />
      <div className="page">
        {router.query.provider && <SignIn />}
        <Nav />
        <main>
          <Component {...pageProps}></Component>
        </main>
        <Footer />
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        main {
          flex: 1 1;
          width: 100%;
        }
      `}</style>
    </ReduxProvider>
  )
}
