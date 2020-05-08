import useFootnote from './useFootnote'
import HashLink from 'common/atoms/link/HashLink'

import styled from '@emotion/styled'

const Layout = styled.span`
  padding-top: 0.4em;
  padding-bottom: 0.3em;
`

const FootnoteReference = ({ identifier }) => {
  const { index, refId, defId } = useFootnote(identifier)

  if (!index) return null

  return (
    <Layout id={refId}>
      <HashLink href={`#${defId}`}>
        <sup>{index}</sup>
      </HashLink>
    </Layout>
  )
}

export default FootnoteReference
