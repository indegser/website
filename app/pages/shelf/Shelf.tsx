import PageContainer from 'design/atoms/container/PageContainer'
import useSWR from 'swr'
import sejongApi from 'apis/sejongApi'
import { ShelfGrid } from './Shelf.styled'
import BookCard from './book-card/BookCard'

const Shelf = () => {
  const { data } = useSWR(
    `{
    books: getBooks {
      id
      title
      cover
      citation
      createdAt
      modifiedAt
    }
  }`,
    sejongApi.getBooks
  )

  return (
    <PageContainer>
      <ShelfGrid>
        {data?.books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </ShelfGrid>
    </PageContainer>
  )
}

export default Shelf
