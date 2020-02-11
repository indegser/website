import React from 'react'
import { HistoryType } from '../../types/HistoryTypes'

const HistoryCard: React.FC<{ history: HistoryType }> = ({ history }) => {
  const { title, comment, cover, excerpt } = history
  return (
    <article className="container">
      <div className="content">
        <img src={cover} />
        <div className="info">
          <h2>{title}</h2>
        </div>
        <p className="comment">{comment || excerpt}</p>
      </div>
      <style jsx>{`
        .content {
        }

        .info {
          flex: 1 1;
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 3px;
          box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
          margin-bottom: 5px;
        }

        h2 {
          letter-spacing: 0.02rem;
          font-size: 0.9375rem;
          line-height: 1.1875rem;
          margin-top: 0;
          color: #121212;
          font-weight: 700;
        }

        p {
          font-size: 0.875rem;
          line-height: 1.1875rem;
          letter-spacing: 0.1px;
          color: #555;
          margin: 0;
          margin-top: 5px;
        }
      `}</style>
    </article>
  )
}

export default HistoryCard
