import Sns from './Sns'
import PageContainer from '../../atoms/container/PageContainer'

const mobile = '(max-width: 640px)'

const Footer = () => {
  return (
    <footer>
      <PageContainer>
        <div className="contents">
          <div className="copyright">한재권이 디자인하고 개발했습니다.</div>
          <div className="links">
            <Sns />
          </div>
        </div>
      </PageContainer>
      <style jsx>{`
        footer {
          color: #666;
          font-size: 13px;
          margin-top: 32px;
        }

        .links {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 12px;
          align-items: center;
        }

        .contents {
          padding: 32px 0;
          border-top: 1px solid var(--divider-color);
          margin: 0 auto;
          display: grid;
          grid-auto-flow: column;
          grid-gap: 8px;
          justify-content: space-between;
          align-items: center;
        }

        @media ${mobile} {
          .contents {
            grid-auto-flow: row;
            padding: 20px 0;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
