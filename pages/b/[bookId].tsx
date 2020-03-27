import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Choseh from 'pages/choseh/Choseh'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import gql from 'graphql-tag'
import { bookApiClient } from 'apis/apolloClient'

const BookPage = ({ choseh, meta, host }) => {
  const { title, cover, citation } = meta
  const metaTitle = `<${title}>, ${citation}의 초서`

  const isLocalhost = host.includes('localhost')

  const url = useRouter()

  const child = useMemo(() => {
    return <Choseh meta={meta} choseh={choseh} />
  }, [choseh])

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:image" content={cover} />
        <meta
          property="og:url"
          content={`${isLocalhost ? 'http' : 'https'}://${host}${url.asPath}`}
        />
      </Head>
      {child}
    </div>
  )
}

const GET_BOOK = gql`
  query getBook($id: ID!) {
    book: getBook(id: $id) {
      id
      cover
      title
      citation
      choseh {
        edition
        modifiedAt
        content
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  // Get choseh of book or create choseh.
  let book

  try {
    const { data } = await bookApiClient.query({
      query: GET_BOOK,
      variables: { id: params.bookId },
      fetchPolicy: 'network-only',
    })

    if (data) {
      book = data.book
    }
  } catch (err) {
    console.log(err.message)
  }

  const { choseh, ...meta } = book

  return {
    props: {
      host: req.headers.host,
      meta,
      choseh,
    },
  }
}

export default BookPage
