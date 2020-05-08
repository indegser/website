import styled from '@emotion/styled'

const Paragraph = styled.div`
  #footnote & {
    margin: 0 !important;
  }

  margin-top: 1em;
  color: #111;
  hyphens: auto;

  blockquote & {
    padding-left: 1em;
    font-size: 0.9em;
    border-left: 2px solid #ddd;
    box-sizing: border-box;
    margin: 2em auto;
    font-weight: 500;
  }
`

const ParagraphRenderer = (props) => {
  return <Paragraph {...props} />
}

export default ParagraphRenderer
