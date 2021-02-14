import styled from "@emotion/styled";
import { colors } from "style.types";
import { Container } from "common/atoms/Container";
import FooterMenu from "./FooterMenu";

const FooterBox = styled.footer`
  margin-top: 32px;
  padding: 16px 0;
`;
const Layout = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 20px;
  align-items: center;
`;

const Divider = styled.div`
  height: 12px;
  width: 1px;
  background: ${colors.bgDivider};
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: ${colors.textLightGrey};
`;

const Footer = () => {
  return (
    <FooterBox>
      <Container>
        <Layout>
          <Name>Jaekwon Han</Name>
          <Divider />
          <Name>indegser@gmail.com</Name>
          <Divider />
          <FooterMenu />
        </Layout>
      </Container>
    </FooterBox>
  );
};

export default Footer;
