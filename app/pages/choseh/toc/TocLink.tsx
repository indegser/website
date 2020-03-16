import styles from './Toc.module.scss'
import HashLink from 'design/atoms/link/HashLink'
import Icon, { IconVariant } from 'design/atoms/icons/Icon'

const TocLink = props => {
  return (
    <span className={styles.toc_link}>
      <HashLink {...props}>
        {props.children}
        <span className={styles.toc_link_icon}>
          <Icon variant={IconVariant.link} width={12} height={12} />
        </span>
      </HashLink>
    </span>
  )
}

export default TocLink
