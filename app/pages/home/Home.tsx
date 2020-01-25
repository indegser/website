import PageContainer from '../../atoms/container/PageContainer'
import History from './history/History'

const Home = () => {
  return (
    <PageContainer>
      <div className="home">
        <div className="left">
          <History />
        </div>
      </div>
      <style jsx>{``}</style>
    </PageContainer>
  )
}

export default Home
