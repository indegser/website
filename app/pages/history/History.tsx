import HistoryCard from 'design/organs/card/HistoryCard'
import NewsGrid from 'design/organs/grid/NewsGrid'
import PageContainer from 'design/atoms/container/PageContainer'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Waypoint } from 'react-waypoint'
import { defaultQueryOption } from 'apis/apolloClient'
import produce from 'immer'

const GET_HISTORIES = gql`
  query histories($cursor: Cursor, $limit: Int) {
    histories(after: $cursor, first: $limit, orderBy: [MODIFIED_AT_DESC]) {
      pageInfo {
        endCursor
        hasNextPage
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
  const limit = 12
  const { data, fetchMore } = useQuery(GET_HISTORIES, {
    ...defaultQueryOption,
    variables: { limit, cursor: null },
  })

  const handleEnter = () => {
    console.log('fetch more')
    const { hasNextPage, endCursor } = data?.histories.pageInfo || {}
    if (hasNextPage) {
      fetchMore({
        variables: {
          cursor: endCursor,
          limit,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          const nextState = produce(prev, (draft) => {
            draft.histories.pageInfo = fetchMoreResult.histories.pageInfo
            draft.histories.nodes.push(...fetchMoreResult.histories.nodes)
          })

          return nextState
        },
      })
    }
  }

  return (
    <PageContainer>
      <NewsGrid>
        {data?.histories.nodes.map((history) => {
          return <HistoryCard key={history.id} history={history} />
        })}
      </NewsGrid>
      {data?.histories.pageInfo.hasNextPage && (
        <Waypoint onEnter={handleEnter} />
      )}
    </PageContainer>
  )
}

export default History
