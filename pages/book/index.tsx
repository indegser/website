import Head from 'next/head'
import Shelf from 'pages/shelf/Shelf'

const Page = () => {
  return (
    <>
      <Head>
        <title>Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shelf />
    </>
  )
}

export default Page
