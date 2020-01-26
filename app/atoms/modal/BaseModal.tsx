import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  styles?: any
  isOpen: boolean
  onRequestClose: () => void
}

export const BaseModal: React.SFC<Props> = ({
  children,
  styles,
  isOpen,
  onRequestClose,
}) => {
  const [id, setId] = useState(null)

  useEffect(() => {
    if (!isOpen) return

    const id = `modal-${Date.now().toString(6)}`
    const container = document.createElement('div')
    container.id = id
    document.body.appendChild(container)
    document.body.style.top = `-${window.scrollY}px`
    document.body.classList.add('prevent-scroll')
    setId(id)

    return () => {
      document.body.removeChild(container)
      const scrollY = document.body.style.top
      document.body.style.top = ''
      document.body.classList.remove('prevent-scroll')
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
      setId(null)
    }
  }, [isOpen])

  if (!id || !isOpen) return null

  const handleOverlayClick = e => onRequestClose()

  return createPortal(
    <div className="fixed container">
      <div className="overlay" onClick={handleOverlayClick}></div>
      <div className="modal">{children}</div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0, 0.2);
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal {
          background: white;
          width: 420px;
          height: 420px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.2),
            0px 8px 4px rgba(0, 0, 0, 0.12);
        }
      `}</style>
      <style jsx>{styles}</style>
    </div>,
    document.getElementById(id)
  )
}
