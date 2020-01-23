import Link from 'next/link'

interface Props {
  id: string
  title: string
  excerpt: string
}

const BaseCard: React.SFC<Props> = ({ id, title, excerpt }) => {
  return (
    <div className="container">
      <article>
        <Link href={`/story/${id}`}>
          <a aria-label={title}>
            <div className="content">
              <h2>{title}</h2>
              <p>{excerpt}</p>
            </div>
          </a>
        </Link>
      </article>
      <style jsx>{`
        .container {
          padding: 14px 0;
          border-top: 1px solid #ddd;
          display: inline-flex;
          transform: translateY(-1px);
        }

        article {
        }

        .content {
        }

        a {
          text-decoration: none;
        }

        h2 {
          font-size: 1rem;
          line-height: 1.1875rem;
          margin-top: 0;
          margin-bottom: 5px;
          color: #121212;
          font-weight: 700;
        }

        p {
          font-size: 0.875rem;
          line-height: 1.1875rem;
          letter-spacing: 0.1px;
          color: #555;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default BaseCard
