import styles from './news.module.scss'

import NewsGrid from 'design/organs/grid/NewsGrid'
import PageContainer from 'design/atoms/container/PageContainer'
import { Waypoint } from 'react-waypoint'
import useSWR, { useSWRPages } from 'swr'
import steveApi from 'apis/steveApi'
import NewsPreview from 'design/organs/preview/NewsPreview'

const History = () => {
  const limit = 12

  const { pages, loadMore, isReachingEnd, isLoadingMore } = useSWRPages(
    'think',
    ({ offset, withSWR }) => {
      const { data } = withSWR(
        useSWR(
          `/api/think?offset=${offset || 0}&limit=${limit}`,
          steveApi.getThoughts
        )
      )

      return (
        <div className={styles.section}>
          <NewsGrid>
            {data?.map((think) => {
              return <NewsPreview key={think.id} data={think} />
            })}
          </NewsGrid>
        </div>
      )
    },
    (SWR, index) => {
      if (SWR.data?.length !== limit) {
        return null
      }

      return (index + 1) * limit
    },
    []
  )

  const handleEnter = () => {
    loadMore()
  }

  return (
    <PageContainer>
      <div className={styles.news}>
        {pages}
        {!isReachingEnd && !isLoadingMore && (
          <Waypoint key={pages.length} onEnter={handleEnter} />
        )}
      </div>
    </PageContainer>
  )
}

export default History
