import { IBook } from 'types/dataTypes'
import styles from './styles.module.scss'

interface Props {
  book: IBook
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className={styles.box}>
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
