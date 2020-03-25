import styles from './AvatarCard.module.scss'
import Authorized from 'hocs/Authorized'
import { dateFns } from 'utils/dateUtils'
import { CitationText } from 'design/atoms/typography/LabelText'

interface Props {
  createdAt: number
  modifiedAt: number
}

const AvatarCard = ({ createdAt, modifiedAt }) => {
  const datePrefix = createdAt !== modifiedAt ? 'Edited' : 'Saved'

  return (
    <div className={styles.card}>
      <Authorized></Authorized>
      <div>
        <div className={styles.cover}></div>
        <div className={styles.date}>
          <CitationText>
            {`${datePrefix}, ` + dateFns.formatRelative(modifiedAt, Date.now())}
          </CitationText>
        </div>
      </div>
    </div>
  )
}

export default AvatarCard
