import Head from 'next/head'
import { getStories, getHistories } from '../app/apis/sejong'
import Home from '../app/pages/home/Home'
import { getMe } from '../app/apis/seoul'

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
  const currentUser = await getMe(ctx.req)

  const [{ data: stories }, { data: histories }] = await Promise.all([
    getStories(),
    getHistories(),
  ])
  return {
    currentUser,
    data: {
      ...stories.data,
      ...histories.data,
    },
  }
}

export default HomePage
