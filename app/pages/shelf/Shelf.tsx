import PageContainer from 'design/atoms/container/PageContainer'
import styles from './styles.module.scss'
import BookCard from './book-card/BookCard'
import useSWR from 'swr'
import sejongApi from 'apis/sejongApi'
import ShelfAction from './shelf-action/ShelfAction'

const Shelf = () => {
  const { data } = useSWR('book', sejongApi.getBooks)

  return (
    <PageContainer>
      <ShelfAction />
      <div className={styles.grid}>
        {data?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </PageContainer>
  )
}

export default Shelf
