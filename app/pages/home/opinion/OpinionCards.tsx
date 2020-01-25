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
          position: relative;
          border-top: 1px solid #ddd;
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
