import Head from 'next/head'
import Home from '../app/pages/home/Home'

const HistoryPage = () => {
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

export default HistoryPage
