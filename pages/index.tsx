import Head from 'next/head'
import Home from '../app/pages/home/Home'

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  )
}

HomePage.getInitialProps = async ctx => {
  // const {
  //   data: { currentUser },
  // } = await jongroApi.me(ctx.req)

  // const [{ data: stories }, { data: histories }] = await Promise.all([
  //   getStories(),
  //   getHistories(),
  // ])
  return {
    currentUser: null,
    // data: {
    //   ...stories.data,
    //   ...histories.data,
    // },
  }
}

export default HomePage
