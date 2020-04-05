import Head from 'next/head'
import History from '../app/pages/history/History'

const HistoryPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <History />
    </>
  )
}

export default HistoryPage
