import { createPortal } from 'react-dom'
import styles from './Footnote.module.scss'
import HashLink from 'design/atoms/link/HashLink'
import Icon from 'design/atoms/icons/Icon'
import useFootnote from './useFootnote'
import { useEffect, useState } from 'react'

const FootnoteDefinition = ({ identifier, children }) => {
  const { index, refId, defId } = useFootnote(identifier, true)
  const [domReady, setDomReady] = useState(false)

  useEffect(() => {
    const container = document.getElementById('footnotes')
    const div = document.createElement('div')
    div.id = defId
    container.appendChild(div)
    setDomReady(true)
  }, [])

  if (!index || !domReady) return null

  return createPortal(
    <div className={styles.footnote_def}>
      <div className={styles.footnote_def_id}>{index}.</div>
      <div className={styles.footnote_backlink}>
        <HashLink href={`#${refId}`}>
          <sup>
            <Icon variant="footnoteLink" width={8} height={8} />
          </sup>
        </HashLink>
      </div>
      <div id="footnote">{children}</div>
    </div>,
    document.getElementById(defId)
  )
}

export default FootnoteDefinition
