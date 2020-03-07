import HistoryCard from 'design/organs/card/HistoryCard'
import sejongApi from 'apis/sejongApi'
import { HistoryGrid, HistoryDividers, HistoryCards } from './History.styled'
import { HistoryDivider } from './History.styled'
import useSWR from 'swr'

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

  const dividers = new Array(4).fill(true)

  return (
    <HistoryGrid columnCount={[1, 2, 3]}>
      <HistoryCards>
        {data?.histories.map(history => {
          return <HistoryCard key={history.id} history={history} />
        })}
      </HistoryCards>
      <HistoryDividers>
        {dividers.map((d, i) => {
          return (
            <HistoryDivider
              key={i}
              style={{
                '--divider-i': i,
              }}
            />
          )
        })}
      </HistoryDividers>
    </HistoryGrid>
  )
}

export default History
