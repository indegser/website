import HistoryCard from 'design/organs/card/HistoryCard'
import { getHistories } from '../../../apis/sejong'
import { useAxiosSWR } from '../../../utils/swrUtils'
import { HistoryType } from '../../../types/HistoryTypes'
import HistoryDivider from './HistoryDivider'

const History = () => {
  const { data } = useAxiosSWR<{ histories: HistoryType[] }>(
    'histories',
    getHistories
  )

  return (
    <div className="container">
      <div className="cards">
        {data &&
          data.histories.map(history => {
            return <HistoryCard key={history.id} history={history} />
          })}
        <HistoryDivider />
      </div>
      <style jsx>{`
        .container {
          padding-top: 3px;
        }

        .cards {
          column-count: 4;
          column-gap: 0px;
          position: relative;
          padding-bottom: 40px;
        }

        .vert-divider {
          position: absolute;
          background-color: var(--divider-color);
          top: 15px;
          bottom: 15px;
          width: 1px;
          left: 50%;
          margin-left: -0.5px;
        }

        .card {
          margin-top: -1px;
          padding: 15px 0;
          break-inside: avoid;
          page-break-inside: avoid;
          border-top: 1px solid var(--divider-color);
        }
      `}</style>
    </div>
  )
}

export default History
