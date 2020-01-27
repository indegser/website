import Head from 'next/head'
import { getStories, getHistories } from '../app/apis/sejong'
import Home from '../app/pages/home/Home'
import jongroApi from '../app/apis/jongroApi'

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
  let currentUser

  try {
    const {
      data: { currentUser },
    } = await jongroApi.me(ctx.req)
  } catch (err) {
    console.log(err.message)
  }

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
