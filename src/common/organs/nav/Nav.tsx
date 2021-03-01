import styled from "@emotion/styled";
import { colors } from "style.types";
import NavMenu from "./NavMenu";
import Theme from "./theme/Theme";
import Logo from "./Logo";
import { Container } from "common/atoms/Container";

const Layout = styled.nav``;

const NavGrid = styled.div`
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
      <Container>
        <NavGrid>
          <Logo />
          <Menus style={{ marginLeft: 32 }}>
            <NavMenu />
          </Menus>
          <Theme />
        </NavGrid>
      </Container>
    </Layout>
  );
};

export default Nav;
