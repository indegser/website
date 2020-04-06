import PageContainer from 'design/atoms/container/PageContainer'
import { ShelfGrid } from './Shelf.styled'
import BookCard from './book-card/BookCard'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { defaultQueryOption } from 'apis/apolloClient'

const GET_STORIES = gql`
  query books {
    books(first: 30, orderBy: [MODIFIED_AT_DESC]) {
      nodes {
        id
        title
        cover
        citation
        createdAt
        modifiedAt
      }
    }
  }
`

const Shelf = () => {
  const { data } = useQuery(GET_STORIES, defaultQueryOption)

  return (
    <PageContainer>
      <ShelfGrid>
        {data?.books.nodes.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ShelfGrid>
    </PageContainer>
  )
}

export default Shelf
