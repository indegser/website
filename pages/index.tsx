import Head from 'next/head'
import History from '../app/pages/history/History'

const HistoryPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <History />
    </div>
  )
}

export default HistoryPage
