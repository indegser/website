import PageContainer from 'design/atoms/container/PageContainer'
import useSWR from 'swr'
import sejongApi from 'apis/sejongApi'
import { ShelfGrid } from './Shelf.styled'
import BookCard from './book-card/BookCard'

const Shelf = () => {
  const { data } = useSWR('books', sejongApi.getBooks)
  const books = data?.data.books || []

  return (
    <PageContainer>
      <ShelfGrid>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </ShelfGrid>
    </PageContainer>
  )
}

export default Shelf
