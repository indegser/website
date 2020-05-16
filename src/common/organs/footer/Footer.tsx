import Indegser from "./Indegser";
import PageContainer from "common/atoms/container/PageContainer";
import styled from "@emotion/styled";
import Theme from "./theme/Theme";

const FooterBox = styled.footer`
  margin-top: 32px;
  padding: 16px 0;
`;
const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Footer = () => {
  return (
    <FooterBox>
      <PageContainer>
        <Layout>
          <Indegser />
          <Theme />
        </Layout>
      </PageContainer>
    </FooterBox>
  );
};

export default Footer;
