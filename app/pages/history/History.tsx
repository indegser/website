import HistoryCard from 'design/organs/card/HistoryCard'
import NewsGrid from 'design/organs/grid/NewsGrid'
import PageContainer from 'design/atoms/container/PageContainer'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_HISTORIES = gql`
  query histories {
    histories: getHistories {
      id
      link
      title
      cover
      comment
      createdAt
      modifiedAt
    }
  }
`

const History = () => {
  const { data } = useQuery(GET_HISTORIES)

  return (
    <PageContainer>
      <NewsGrid>
        {data?.histories.map(history => {
          return <HistoryCard key={history.id} history={history} />
        })}
      </NewsGrid>
    </PageContainer>
  )
}

export default History
