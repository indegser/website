import HistoryCard from 'design/organs/card/HistoryCard'
import NewsGrid from 'design/organs/grid/NewsGrid'
import PageContainer from 'design/atoms/container/PageContainer'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { defaultQueryOption } from 'apis/apolloClient'

const GET_HISTORIES = gql`
  query histories {
    histories(first: 30, orderBy: [MODIFIED_AT_DESC]) {
      pageInfo {
        startCursor
        endCursor
      }
      nodes {
        id
        link
        title
        cover
        comment
        createdAt
        modifiedAt
      }
    }
  }
`

const History = () => {
  const { data } = useQuery(GET_HISTORIES, defaultQueryOption)

  return (
    <PageContainer>
      <NewsGrid>
        {data?.histories.nodes.map((history) => {
          return <HistoryCard key={history.id} history={history} />
        })}
      </NewsGrid>
    </PageContainer>
  )
}

export default History
