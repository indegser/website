import { FC } from 'react'
import { IStory } from 'types/dataTypes'
import styles from './github.module.scss'
import { dateFns } from 'utils/dateUtils'
import { capitalize } from 'utils/stringUtils'
import Icon from 'design/atoms/icons/Icon'

interface Props {
  github: IStory['github']
  modifiedAt: number
}

const Github: FC<Props> = ({ github, modifiedAt }) => {
  const date = dateFns.formatBasic(modifiedAt)

  return (
    <div className={styles.box}>
      <div className={styles.github}>
        <div className={styles.branch}>
          <div className={styles.icon}>
            <Icon variant="github" width={14} />
          </div>
          {capitalize(github.commit.branch)}
        </div>
        <span>{'·'}</span>
        <a
          href={`https://github.com/indegser/story/commit/${github.commit.sha}`}
        >
          <span className={styles.sha}>{github.commit.sha.slice(0, 7)}</span>
        </a>
      </div>
      <div>{date}</div>
    </div>
  )
}

export default Github
