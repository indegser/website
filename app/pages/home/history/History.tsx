import HistoryCard from 'design/organs/card/HistoryCard'
import sejongApi from 'apis/sejongApi'
import useSWR from 'swr'
import NewsGrid from 'design/organs/grid/NewsGrid'

const History = () => {
  const { data } = useSWR(
    `{
      histories: getHistories {
        id
        link
        title
        cover
        comment
        createdAt
        modifiedAt
      }
    }`,
    sejongApi.getHistories
  )

  return (
    <NewsGrid>
      {data?.histories.map(history => {
        return <HistoryCard key={history.id} history={history} />
      })}
    </NewsGrid>
  )
}

export default History
