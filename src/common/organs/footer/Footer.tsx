import styled from "@emotion/styled";
import { colors } from "style.types";
import { Container } from "common/atoms/Container";
import FooterMenu from "./FooterMenu";
import { mq } from "common/theme";

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

  ${mq("md")} {
    grid-auto-flow: row;
    grid-gap: 0;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${colors.textBlack};
`;

const Footer = () => {
  return (
    <FooterBox>
      <Container>
        <Layout>
          <Name>Jaekwon Han (indegser@gmail.com)</Name>
          <FooterMenu />
        </Layout>
      </Container>
    </FooterBox>
  );
};

export default Footer;
