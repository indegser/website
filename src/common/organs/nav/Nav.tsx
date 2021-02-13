import styled from "@emotion/styled";
import PageContainer from "common/atoms/container/PageContainer";
import { colors } from "style.types";
import NavMenu from "./NavMenu";
import Theme from "./theme/Theme";
import Logo from "./Logo";

const Layout = styled.nav``;

const Container = styled.div`
  display: grid;
  grid-template-areas: "logo menu theme";
  grid-template-columns: max-content auto max-content;
  height: 60px;
  align-items: center;
`;

const Menus = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 32px;
  grid-auto-columns: max-content;
`;

export const MenuLogo = styled.div`
  color: ${colors.textBlack};

  svg {
    display: block;
  }
`;

const Nav = () => {
  return (
    <Layout id="global-nav">
      <PageContainer>
        <Container>
          <Logo />
          <Menus style={{ marginLeft: 32 }}>
            <NavMenu />
          </Menus>
          <Theme />
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default Nav;
