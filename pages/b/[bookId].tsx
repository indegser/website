import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Axios from 'axios'
import sejongApi from 'apis/sejongApi'
import Choseh from 'pages/choseh/Choseh'
import { useRouter } from 'next/router'

const BookPage = ({ choseh, host }) => {
  const { title, cover, citation } = choseh
  const metaTitle = `<${title}>, ${citation}의 초서`

  const isLocalhost = host.includes('localhost')

  const url = useRouter()

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
      <Choseh {...choseh} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  // Get choseh of book or create choseh.
  let content: string
  let book

  try {
    ;({ book } = await sejongApi.book(`
      {
        book: getBook(id: "${params.bookId}") {
          id
          cover
          title
          citation
        }
      }
    `))

    const { data } = await Axios.get(
      `https://choseh.s3.ap-northeast-2.amazonaws.com/${params.bookId}.md`
    )

    content = data
  } catch (err) {
    console.log(err.message)
    content = ''
  }

  return {
    props: {
      host: req.headers.host,
      choseh: {
        ...book,
        content,
      },
    },
  }
}

export default BookPage
