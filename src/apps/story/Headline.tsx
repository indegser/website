import styled from '@emotion/styled'
import { mq } from 'common/theme'
import { IStory } from 'types/dataTypes'

const Box = styled.div`
  padding: 80px 0 20px 0;

  ${mq('sm')} {
    padding: 60px 0 20px 0;
  }
`

const Title = styled.h1`
  color: var(--text400);
  font-size: 44px;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -1px;
  margin: 0;
  font-family: var(--font-serif);
  word-break: keep-all;

  ${mq('sm')} {
    font-size: 40px;
    letter-spacing: -0.6px;
  }
`

const Excerpt = styled.h3`
  color: var(--text300);
  font-size: 18px;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
  font-family: var(--font-serif);
  word-break: keep-all;
  margin-top: 1rem;
  padding-right: 2vw;
`

interface Props extends Pick<IStory, 'data'> {}

const Headline: React.FC<Props> = ({ data }) => {
  const { title, excerpt } = data

  return (
    <Box>
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
    </Box>
  )
}

export default Headline
