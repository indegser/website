import { useSelector } from 'react-redux'
import BaseCard from '../../../organs/card/BaseCard'

const OpinionCards = () => {
  const { stories } = useSelector((s: any) => s.page)
  const [headline, ...shorts] = stories

  return (
    <div>
      <div className="headline">
        <BaseCard {...headline} />
      </div>
      <div className="cards">
        {shorts.map(story => (
          <div key={story.id} className="card">
            <BaseCard
              key={story.id}
              id={story.id}
              title={story.title}
              excerpt={story.excerpt}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .headline {
          padding-bottom: 15px;
        }
        .cards {
          column-count: 2;
          column-gap: 29px;
          position: relative;
          border-top: 1px solid #ddd;

          &::before {
            content: '';
            display: block;
            position: absolute;
            top: 14px;
            bottom: 14px;
            left: 50%;
            width: 1px;
            background: #e2e2e2;
          }
        }

        .card {
          padding: 14px 0;
          border-top: 1px solid #ddd;
          display: inline-flex;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}

export default OpinionCards
