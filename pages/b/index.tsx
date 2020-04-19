import Head from 'next/head'
import Shelf from 'pages/shelf/Shelf'

const BookshelfPage = () => {
  return (
    <>
      <Head>
        <title>Bookshelf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shelf />
    </>
  )
}

export default BookshelfPage
