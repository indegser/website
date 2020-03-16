import Markdown from 'react-markdown'
import styles from './Toc.module.scss'
import useToc from './useToc'
import TocLink from './TocLink'
import { useState } from 'react'
import Icon, { IconVariant } from 'design/atoms/icons/Icon'

interface Props {
  content: string
}

const Toc: React.FC<Props> = ({ content }) => {
  const [fold, setFold] = useState(true)
  const { parseToc } = useToc(content)
  const tocContent = parseToc()

  if (!tocContent) return null

  const toggleFold = e => {
    e.stopPropagation()
    setFold(!fold)
  }

  const title = fold ? 'Table of Contents' : 'Fold'

  return (
    <div className={styles.toc}>
      {!fold && (
        <Markdown
          source={tocContent}
          renderers={{
            // paragraph: 'div',
            link: TocLink,
          }}
        />
      )}
      <div
        className={styles.toc_fold}
        style={{
          marginTop: !fold && 8,
        }}
        onClick={toggleFold}
      >
        <div className={styles.toc_fold_title}>{title}</div>
        <Icon
          variant={IconVariant.arrowDown}
          width={12}
          height={12}
          style={{ transform: `rotate(${fold ? 0 : 180}deg)` }}
        />
      </div>
    </div>
  )
}

export default Toc
