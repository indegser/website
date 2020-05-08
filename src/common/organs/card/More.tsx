import styles from './styles.module.scss'
import { useRef, FC } from 'react'
import ContextMenu from 'common/atoms/context-menu/ContextMenu'
import Icon from 'common/atoms/icons/Icon'
import cn from 'classnames'

interface Props {
  onEdit: () => void
  onDelete: () => void
}

const More: FC<Props> = (props) => {
  const ref = useRef(null)
  return (
    <div className={cn(styles.box, 'card-more')}>
      <div ref={ref} className={styles.iconBox}>
        <div className={styles.icon}>
          <Icon variant="more" color="#333" width={12} />
        </div>
        <ContextMenu parentRef={ref} {...props} />
      </div>
    </div>
  )
}

export default More
