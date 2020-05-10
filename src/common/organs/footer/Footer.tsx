import Sns from './Sns'
import PageContainer from 'common/atoms/container/PageContainer'
import styled from '@emotion/styled'
import Theme from './theme/Theme'

const FooterBox = styled.footer`
  margin-top: 32px;
  padding: 16px 0;
`
export const Copyright = styled.div`
  font-size: 13px;
  color: var(--text200);
  margin-right: 4px;
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
          <Theme />
        </Layout>
      </PageContainer>
    </FooterBox>
  )
}

export default Footer
