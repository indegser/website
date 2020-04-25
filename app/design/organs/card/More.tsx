import styles from './styles.module.scss'
import { useRef, FC } from 'react'
import ContextMenu from 'design/atoms/context-menu/ContextMenu'
import Icon from 'design/atoms/icons/Icon'

interface Props {
  onEdit: () => void
  onDelete: () => void
}

const More: FC<Props> = (props) => {
  const ref = useRef(null)
  return (
    <div className={styles.box}>
      <div className={styles.iconBox}>
        <div className={styles.icon} ref={ref}>
          <Icon variant="more" color="#333" width={12} />
        </div>
        <ContextMenu parentRef={ref} {...props} />
      </div>
    </div>
  )
}

export default More
