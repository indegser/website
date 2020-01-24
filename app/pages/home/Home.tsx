import PageContainer from '../../atoms/container/PageContainer'
import Opinion from './Opinion'

const Home = () => {
  return (
    <PageContainer>
      <div className="home">
        <div className="heroes"></div>
        <div className="short-stories">
          <Opinion />
        </div>
      </div>
      <style jsx>
        {`
          .home {
            display: grid;
            grid-template-columns: 2fr 1fr;
          }

          .heroes {
            padding-right: 15px;
            border-right: 1px solid #aaa;
          }

          .short-stories {
            padding-left: 15px;
          }

          .stories-table {
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
        `}
      </style>
    </PageContainer>
  )
}

export default Home
