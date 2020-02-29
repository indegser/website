import Head from 'next/head'
import Home from '../app/pages/home/Home'

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Bookshelf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  )
}

export default HomePage
