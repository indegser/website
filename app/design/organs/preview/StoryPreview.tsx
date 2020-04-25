import styles from './styles.module.scss'
import { IStory } from 'types/dataTypes'
import { FC, useMemo } from 'react'
import { dateFns } from 'utils/dateUtils'
import { capitalize } from 'utils/stringUtils'
import Link from 'next/link'

interface Props {
  data: IStory
}

const StoryPreview: FC<Props> = ({ data }) => {
  const relDate = useMemo(() => {
    const text = dateFns.formatRelative(data.modifiedAt, Date.now())
    return capitalize(text)
  }, [data.modifiedAt])

  return (
    <div className={styles.container}>
      <Link href="/story/[...slug]" as={`/story/${data.slug}`}>
        <a>
          <div className={styles.content}>
            <div className={styles.preview}>
              <div className={styles.title}>
                {data.frontMatter.title || 'Untitled'}
              </div>
              <p className={styles.excerpt}>{data.frontMatter.excerpt}</p>
              <div className={styles.relDate}>{relDate}</div>
            </div>
            <img
              className={styles.img}
              src={data.frontMatter.coverUrl}
              alt={data.frontMatter.coverAlt}
            />
          </div>
        </a>
      </Link>
    </div>
  )
}

export default StoryPreview
