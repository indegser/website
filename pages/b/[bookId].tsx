import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Axios from 'axios'
import sejongApi from 'apis/sejongApi'
import Choseh from 'pages/choseh/Choseh'

const BookPage = ({ choseh }) => {
  return (
    <div>
      <Head>
        <title>Book</title>
      </Head>
      <Choseh {...choseh} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Get choseh of book or create choseh.
  let content: string
  let book

  try {
    ;({ book } = await sejongApi.book(`
      {
        book: getBook(id: "${params.bookId}") {
          id
          title
        }
      }
    `))

    content = await Axios.get(
      `https://choseh.s3.ap-northeast-2.amazonaws.com/${params.bookId}.md`
    )
  } catch (err) {
    console.log(err.message)
    content = ''
  }

  return {
    props: {
      choseh: {
        title: book?.title,
        content,
      },
      hello: 'bye',
    },
  }
}

export default BookPage
