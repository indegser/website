import useSWR from 'swr'
import styled from '@emotion/styled'
import PageContainer from 'design/atoms/container/PageContainer'
import sejongApi from 'apis/sejongApi'
import NewsGrid from 'design/organs/grid/NewsGrid'
import Marquee from './Marquee'

const Container = styled('div')`
  padding: 20px 0 40px 0;
`

const Opinion = () => {
  const { data } = useSWR('opinion', sejongApi.getStories)

  return (
    <PageContainer>
      <Container>
        <NewsGrid>
          {data?.map((story) => (
            <Marquee key={story.id} story={story} />
          ))}
        </NewsGrid>
      </Container>
    </PageContainer>
  )
}

export default Opinion
