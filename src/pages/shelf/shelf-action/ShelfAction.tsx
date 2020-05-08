import styles from './styles.module.scss'
import { useRouter } from 'next/router'

const ShelfAction = () => {
  const { push } = useRouter()

  const handleNew = () => {
    push('/book/new')
  }

  return (
    <div className={styles.box}>
      <div></div>
      <div className={styles.new} onClick={handleNew}>
        + New
      </div>
    </div>
  )
}

export default ShelfAction
