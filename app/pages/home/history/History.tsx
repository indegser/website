import HistoryCard from 'design/organs/card/HistoryCard'
import sejongApi from 'apis/sejongApi'
import { useAxiosSWR } from 'utils/swrUtils'
import { HistoryType } from 'types/HistoryTypes'
import { HistoryGrid, HistoryDividers, HistoryCards } from './History.styled'
import { HistoryDivider } from './History.styled'

const History = () => {
  const { data } = useAxiosSWR<{ histories: HistoryType[] }>(
    'histories',
    sejongApi.getHistories
  )

  const dividers = new Array(4).fill(true)

  return (
    <HistoryGrid columnCount={[1, 2, 3, 4]}>
      <HistoryCards>
        {data &&
          data.histories.map(history => {
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
