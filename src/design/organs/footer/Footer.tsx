import Sns from './Sns'
import PageContainer from 'design/atoms/container/PageContainer'
import styled from '@emotion/styled'

const FooterBox = styled.footer`
  margin-top: 32px;
  padding: 16px 0;
`
export const Copyright = styled.div`
  font-size: 13px;
  color: #666;
  margin-right: 8px;
`

export const Layout = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
`

const Footer = () => {
  return (
    <FooterBox>
      <PageContainer>
        <Layout>
          <Copyright>Designed and developed by Indegser</Copyright>
          <Sns />
        </Layout>
      </PageContainer>
    </FooterBox>
  )
}

export default Footer
