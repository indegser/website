import { createElement, useEffect, useRef, useState } from 'react'
import GithubSlugger from 'github-slugger'

const HeadingRenderer = ({ level, children }) => {
  const [id, setId] = useState(null)
  const ref = useRef<HTMLDivElement>(null)
  const heading = createElement(`h${level}`, { children })

  useEffect(() => {
    const text = ref.current.textContent
    const slugger = new GithubSlugger()
    const id = slugger.slug(text)
    setId(id)
  }, [])

  return (
    <div id={id} ref={ref}>
      {heading}
    </div>
  )
}

export default HeadingRenderer
