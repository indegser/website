import useFootnote from './useFootnote'
import styles from './Footnote.module.scss'
import HashLink from 'design/atoms/link/HashLink'

const FootnoteReference = ({ identifier }) => {
  const { index, refId, defId } = useFootnote(identifier)

  if (!index) return null

  return (
    <span className={styles.footnote_ref} id={refId}>
      <HashLink href={`#${defId}`}>
        <sup>{index}</sup>
      </HashLink>
    </span>
  )
}

export default FootnoteReference
