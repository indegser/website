import Head from 'next/head'
import { getStories } from '../app/apis/sejong'
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
  const { data } = await getStories()
  return data
}

export default HomePage
