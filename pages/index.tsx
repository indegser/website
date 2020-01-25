import Head from 'next/head'
import { getStories, getHistories } from '../app/apis/sejong'
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

HomePage.getInitialProps = async () => {
  const [{ data: stories }, { data: histories }] = await Promise.all([
    getStories(),
    getHistories(),
  ])
  return {
    data: {
      ...stories.data,
      ...histories.data,
    },
  }
}

export default HomePage
