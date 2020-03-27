import Head from 'next/head'
import History from '../app/pages/history/History'
import { ApolloProvider } from '@apollo/react-hooks'
import { historyApiClient } from 'apis/apolloClient'

const HistoryPage = () => {
  return (
    <ApolloProvider client={historyApiClient}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <History />
    </ApolloProvider>
  )
}

export default HistoryPage
