import styles from './NewsGrid.module.scss'

interface Props {}

const NewsGrid: React.FC<Props> = ({ children }) => {
  const dividers = new Array(4).fill(true)

  return (
    <div className={styles.grid}>
      <div className={styles.cards}>{children}</div>
      <div className={styles.dividers}>
        {dividers.map((d, i) => {
          return (
            <div
              className={styles.divider}
              key={i}
              style={{
                // @ts-ignore
                '--divider-i': i,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default NewsGrid
