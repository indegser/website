import styles from './news-preview.module.scss'
import { INews } from 'types/dataTypes'
import { FC, useMemo } from 'react'
import { dateFns } from 'utils/dateUtils'
import { capitalize } from 'utils/stringUtils'
import Link from 'next/link'

interface Props {
  data: INews
}

const NewsPreview: FC<Props> = ({ data }) => {
  const relDate = useMemo(() => {
    const text = dateFns.formatRelative(data.modifiedAt, Date.now())
    return capitalize(text)
  }, [data.modifiedAt])

  return (
    <div className={styles.container}>
      <Link href="/story/[id]" as={`/story/${data.id}`}>
        <a>
          <div className={styles.content}>
            <div className={styles.preview}>
              <div className={styles.title}>
                As Amazon Rises, So Does the Opposition
              </div>
              <p className={styles.excerpt}>{data.body}</p>
              <div className={styles.relDate}>{relDate}</div>
            </div>
            <img
              className={styles.img}
              src="https://static01.nyt.com/images/2020/04/18/business/16virus-gigwork1-print/merlin_171653682_ac515874-b583-4614-a4ab-8121059987fc-jumbo.jpg?quality=90&auto=webp"
            />
          </div>
        </a>
      </Link>
    </div>
  )
}

export default NewsPreview
