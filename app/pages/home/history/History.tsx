import HistoryCard from 'design/organs/card/HistoryCard'
import sejongApi from 'apis/sejongApi'
import { request } from 'graphql-request'
import { useAxiosSWR } from 'utils/swrUtils'
import { HistoryGrid, HistoryDividers, HistoryCards } from './History.styled'
import { HistoryDivider } from './History.styled'
import { IHistory } from 'types/dataTypes'
import useSWR from 'swr'

const History = () => {
  const { data } = useSWR(
    `{
      histories: getHistories {
        id
        link
        title
        cover
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
