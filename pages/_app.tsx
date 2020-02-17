import GlobalStyle from '../app/atoms/GlobalStyle'
import Footer from '../app/organs/footer/Footer'
import Nav from '../app/organs/nav/Nav'
import SignIn from '../app/organs/sign-in/SignIn'

export default ({ Component, pageProps }) => {
  // const store = useMemo(() => {
  //   const { data: page, currentUser } = pageProps
  //   const s = createStore({ page, currentUser })

  //   if (process.browser) {
  //     ;(window as any).getState = () => s.getState()
  //   }

  //   return s
  // }, [])
  return (
    <>
      <GlobalStyle />
      <div className="page">
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
    </>
  )
}
