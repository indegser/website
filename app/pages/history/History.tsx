import styles from './news.module.scss'

import NewsGrid from 'design/organs/grid/NewsGrid'
import PageContainer from 'design/atoms/container/PageContainer'
import useSWR from 'swr'
import StoryPreview from 'design/organs/preview/StoryPreview'
import sejongApi from 'apis/sejongApi'

const History = () => {
  const { data } = useSWR('stories', sejongApi.getStories)

  return (
    <PageContainer>
      <div className={styles.news}>
        <NewsGrid>
          {data?.map((story) => (
            <StoryPreview key={story.id} data={story} />
          ))}
        </NewsGrid>
      </div>
    </PageContainer>
  )
}

export default History
