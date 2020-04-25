import { IBook } from 'types/dataTypes'
import styles from './styles.module.scss'
import More from 'design/organs/card/More'
import { useRouter } from 'next/router'
import sejongApi from 'apis/sejongApi'
import Authorized from 'hocs/Authorized'

interface Props {
  book: IBook
}

const BookCard: React.FC<Props> = ({ book }) => {
  const Router = useRouter()
  const handleEdit = () => {
    Router.push(`/book/[bookId]/edit`, `/book/${book.id}/edit`)
  }

  const handleDelete = () => {
    sejongApi
      .deleteBook(book)
      .then((r) => void console.log(r))
      .catch((err) => void console.log(err))
  }

  return (
    <div className={styles.box}>
      <Authorized>
        <More onEdit={handleEdit} onDelete={handleDelete} />
      </Authorized>
      <div className={styles.cover}>
        <div
          className={styles.coverShadow}
          style={{ backgroundImage: `url(${book.cover})` }}
        />
        <img className={styles.coverImage} src={book.cover} />
        <div className={styles.coverLight} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.citation}>{book.citation}</div>
      </div>
    </div>
  )
}

export default BookCard
