import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { CMBox, CMContent, CMItem } from './ContextMenu.styled'

interface IProps {
  parentRef: React.MutableRefObject<any>
  // menu: { [key: string]: string }
}

const ContextMenu: React.FC<IProps> = ({ parentRef }) => {
  const [display, setDisplay] = useState(false)
  const [position, setPosition] = useState({ right: '', top: '' })
  const menuWidth = 240
  const menuOffsetTop = 4

  const handleParentRefClick = e => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    calcAndSetPosition(rect)
    setDisplay(d => !d)
  }

  const calcAndSetPosition = (rect: ClientRect) => {
    const { right, bottom } = rect
    const position = {
      right: `calc(100vw - ${right}px)`,
      top: menuOffsetTop + bottom + 'px',
    }

    return setPosition(position)
  }

  useEffect(() => {
    parentRef.current?.addEventListener('click', handleParentRefClick)

    return () => {
      parentRef.current?.removeEventListener('click', handleParentRefClick)
    }
  }, [parentRef.current])

  if (!display || !process.browser) {
    return null
  }

  const menu = [
    {
      name: '수정',
    },
    {
      name: '삭제',
    },
  ]

  return createPortal(
    <CMBox style={position}>
      <CMContent style={{ width: menuWidth }}>
        {menu.map(item => (
          <CMItem key={item.name}>{item.name}</CMItem>
        ))}
      </CMContent>
    </CMBox>,
    document.getElementById('context-menu')
  )
}

export default ContextMenu
