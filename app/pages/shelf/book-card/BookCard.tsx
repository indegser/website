import { IBook } from 'types/dataTypes'
import {
  BookCardBox,
  BookCardCover,
  BookCardTitle,
  BookCardCoverBox,
  BookCardCoverShadow,
  BookCardLight,
} from './BookCard.styled'
import { dateFns } from 'utils/dateUtils'
import { CitationText } from 'design/atoms/typography/LabelText'
import Box from 'design/atoms/box/Box'

interface IProps {
  book: IBook
}

const BookCard: React.FC<IProps> = ({ book }) => {
  const citation = `${book.authors.join(', ')} (${book.publishedYear})`
  const added = `${dateFns.formatRelative(
    book.createdAt,
    Date.now()
  )}, 서재에 추가`

  return (
    <BookCardBox>
      <BookCardCoverBox>
        <BookCardCoverShadow
          style={{ backgroundImage: `url(${book.cover})` }}
        />
        <BookCardCover src={book.cover} />
        <BookCardLight />
      </BookCardCoverBox>
      <Box mt={3}>
        <BookCardTitle>{book.title}</BookCardTitle>
      </Box>
      <Box mt={1}>
        <CitationText>{citation}</CitationText>
      </Box>
      <Box>
        <CitationText>{added}</CitationText>
      </Box>
    </BookCardBox>
  )
}

export default BookCard
