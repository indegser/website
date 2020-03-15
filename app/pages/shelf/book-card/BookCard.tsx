import { IBook } from 'types/dataTypes'
import {
  BookCardBox,
  BookCardCover,
  BookCardTitle,
  BookCardCoverBox,
  BookCardCoverShadow,
  BookCardLight,
  BookCardInfoBox,
  BookCardCitation,
} from './BookCard.styled'
import { dateFns } from 'utils/dateUtils'
import { CitationText } from 'design/atoms/typography/LabelText'
import Box from 'design/atoms/box/Box'
import Link from 'next/link'

interface IProps {
  book: IBook
}

const BookCard: React.FC<IProps> = ({ book }) => {
  const added = `Added, ${dateFns.formatRelative(book.createdAt, Date.now())}`

  return (
    <Link href={`/b/${book.id}`}>
      <a>
        <BookCardBox>
          <BookCardCoverBox>
            <BookCardCoverShadow
              style={{ backgroundImage: `url(${book.cover})` }}
            />
            <BookCardCover src={book.cover} />
            <BookCardLight />
          </BookCardCoverBox>
          <BookCardInfoBox>
            <Box mt={3}>
              <BookCardTitle>{book.title}</BookCardTitle>
            </Box>
            <Box mt={2}>
              <BookCardCitation>{book.citation}</BookCardCitation>
            </Box>
            <Box mt={1}>
              <BookCardCitation>{added}</BookCardCitation>
            </Box>
          </BookCardInfoBox>
        </BookCardBox>
      </a>
    </Link>
  )
}

export default BookCard
