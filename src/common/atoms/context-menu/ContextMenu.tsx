import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { CMBox, CMContent, CMItem } from './ContextMenu.styled'
import useFixedBody from 'common/hooks/utils/useFixedBody'

interface Props {
  parentRef: React.MutableRefObject<any>
  onEdit: () => void
  onDelete: () => void
  // menu: { [key: string]: string }
}

const ContextMenu: React.FC<Props> = ({ parentRef, ...props }) => {
  const [display, setDisplay] = useState(false)
  const [position, setPosition] = useState({ right: '', top: '' })
  const menuWidth = 240
  const menuOffsetTop = 4

  const handleParentRefClick = (e) => {
    if (display) {
      e.stopPropagation()
    }
    const rect = e.currentTarget.getBoundingClientRect()
    calcAndSetPosition(rect)
    setDisplay((d) => !d)
  }

  const calcAndSetPosition = (rect: ClientRect) => {
    const { right, bottom } = rect
    const position = {
      right: `calc(100vw - ${right}px)`,
      top: menuOffsetTop + bottom + 'px',
    }

    return setPosition(position)
  }

  useFixedBody(display)

  useEffect(() => {
    parentRef.current?.addEventListener('click', handleParentRefClick)

    return () => {
      parentRef.current?.removeEventListener('click', handleParentRefClick)
    }
  }, [parentRef.current])

  const handleClick = (e) => {
    setDisplay(false)
  }

  useEffect(() => {
    if (!display) return

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [display])

  if (!display || !process.browser) {
    return null
  }

  const menu = [
    {
      name: 'Edit',
      action: props.onEdit,
    },
    {
      name: 'Delete',
      action: props.onDelete,
    },
  ]

  return createPortal(
    <CMBox style={position}>
      <CMContent style={{ width: menuWidth }}>
        {menu.map((item) => (
          <CMItem key={item.name} onClick={item.action}>
            {item.name}
          </CMItem>
        ))}
      </CMContent>
    </CMBox>,
    document.getElementById('context-menu')
  )
}

export default ContextMenu
