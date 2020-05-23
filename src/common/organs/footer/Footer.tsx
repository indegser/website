import Indegser from "./Indegser";
import PageContainer from "common/atoms/container/PageContainer";
import styled from "@emotion/styled";
import Theme from "./theme/Theme";
import { mq } from "common/theme";

const FooterBox = styled.footer`
  margin-top: 32px;
  padding: 16px 0;
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "indegser theme";
  align-items: center;

  ${mq("sm")} {
    grid-gap: 14px;
    grid-template-areas:
      "theme"
      "indegser";
  }
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
