import { createPortal } from 'react-dom'
import HashLink from 'common/atoms/link/HashLink'
import Icon from 'common/atoms/icons/Icon'
import useFootnote from './useFootnote'
import { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'

const Box = styled.div`
  position: relative;
  font-size: 14px;
  color: var(--text200);
  display: grid;
  grid-template-columns: max-content max-content auto;
  grid-gap: 0px;
  align-items: flex-start;
  line-height: 1.6;

  margin-top: 0.5em;

  > p {
    margin: 0;
  }
`

const Id = styled.div`
  font-weight: 500;
  color: var(--text400);
`

const Backlink = styled.div`
  color: var(--primary100);
  padding: 0 4px;

  sup {
    line-height: 1;
  }
`

const FootnoteDefinition = ({ identifier, children }) => {
  const { index, refId, defId } = useFootnote(true)
  const [domReady, setDomReady] = useState(false)
  const [text, setText] = useState<string>()

  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!domReady) return
    const target = ref.current
    const text = target.textContent

    if (!isNaN(Number(text))) {
      setText(`Above book, p.${text}`)
    }
  }, [domReady])

  useEffect(() => {
    const container = document.getElementById('footnotes')
    const div = document.createElement('div')
    div.id = defId
    container.appendChild(div)
    setDomReady(true)
  }, [])

  if (!index || !domReady) return null

  return createPortal(
    <Box>
      <Id>{index}.</Id>
      <Backlink>
        <HashLink href={`#${refId}`}>
          <sup>
            <Icon variant="footnoteLink" width={8} height={8} />
          </sup>
        </HashLink>
      </Backlink>
      <div ref={ref} id="footnote">
        {text || children}
      </div>
    </Box>,
    document.getElementById(defId)
  )
}

export default FootnoteDefinition
