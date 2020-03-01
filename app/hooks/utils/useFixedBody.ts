import { useEffect } from 'react'

const useFixedBody = (on: boolean) => {
  useEffect(() => {
    if (!on) return

    document.body.style.top = `-${window.scrollY}px`
    document.body.classList.add('prevent-scroll')

    return () => {
      const scrollY = document.body.style.top
      document.body.style.top = ''
      document.body.classList.remove('prevent-scroll')
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [on])
}

export default useFixedBody
