import styled from '@emotion/styled'

const Box = styled.div`
  margin-top: 40px;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
`

const Title = styled.div`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 1rem;
`

const Appendix = () => {
  return (
    <Box>
      <Title>Footnote</Title>
      <div id="footnotes"></div>
    </Box>
  )
}

export default Appendix
