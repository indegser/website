import styles from './style.module.scss'

const PageContainer = ({ children }) => {
  return <div className={styles.page}>{children}</div>
}

export default PageContainer
