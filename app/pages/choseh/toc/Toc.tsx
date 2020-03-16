import Markdown from 'react-markdown'
import styles from './Toc.module.scss'
import useToc from './useToc'
import TocLink from './TocLink'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import Icon, { IconVariant } from 'design/atoms/icons/Icon'

interface Props {
  content: string
}

const Toc: React.FC<Props> = ({ content }) => {
  const [fold, setFold] = useState(true)
  const [ref, bounds] = useMeasure()
  const props = useSpring({ maxHeight: fold ? 0 : bounds.height + 16 })
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
      <animated.div style={props} className={styles.toc_list}>
        <div
          ref={ref}
          style={{
            padding: !fold && '8px 0 8px',
          }}
        >
          <Markdown
            source={tocContent}
            renderers={{
              // paragraph: 'div',
              link: TocLink,
            }}
          />
        </div>
      </animated.div>
      <div className={styles.toc_fold} onClick={toggleFold}>
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
