import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Choseh from 'pages/choseh/Choseh'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import gql from 'graphql-tag'
import apolloClient from 'apis/apolloClient'
import chosehApi from 'apis/chosehApi'
import { IBook, IChoseh } from 'types/dataTypes'

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
  query getBook($id: UUID!) {
    book: book(id: $id) {
      id
      cover
      title
      citation
    }
  }
`

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  // Get choseh of book or create choseh.
  let props: {
    choseh?: IChoseh
    meta?: Pick<IBook, 'cover' | 'title' | 'citation'>
  } = {}

  try {
    const { data } = await apolloClient.query({
      query: GET_BOOK,
      variables: { id: params.bookId },
      fetchPolicy: 'network-only',
    })

    const choseh = await chosehApi.getChoseh(data.book.id)

    props.meta = data.book
    props.choseh = choseh
  } catch (err) {
    console.log(err.networkError.result, '!!!')
  }

  return {
    props: {
      host: req.headers.host,
      ...props,
    },
  }
}

export default BookPage
