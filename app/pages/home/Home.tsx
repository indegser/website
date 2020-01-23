import { useSelector } from 'react-redux'
import BaseCard from '../../organs/card/BaseCard'
import PageContainer from '../../atoms/container/PageContainer'

const Home = () => {
  const { stories } = useSelector((s: any) => s.page)
  return (
    <PageContainer>
      <div>
        {stories.map(story => (
          <BaseCard
            key={story.id}
            id={story.id}
            title={story.title}
            excerpt={story.excerpt}
          />
        ))}
      </div>
      <style jsx>
        {`
          div {
            max-width: 620px;
            column-count: 2;
            column-gap: 29px;
            margin: 0 auto;
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
        `}
      </style>
    </PageContainer>
  )
}

export default Home
