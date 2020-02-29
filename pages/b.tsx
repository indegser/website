import Head from 'next/head'
import Shelf from 'pages/shelf/Shelf'

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Bookshelf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shelf />
    </div>
  )
}

export default HomePage
