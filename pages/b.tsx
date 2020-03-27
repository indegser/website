import Head from 'next/head'
import Shelf from 'pages/shelf/Shelf'
import { ApolloProvider } from '@apollo/react-hooks'
import { bookApiClient } from 'apis/apolloClient'

const BookshelfPage = () => {
  return (
    <ApolloProvider client={bookApiClient}>
      <Head>
        <title>Bookshelf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shelf />
    </ApolloProvider>
  )
}

export default BookshelfPage
