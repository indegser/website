import PageContainer from "common/atoms/container/PageContainer";
import Profile from "./Profile";
import NavMenu from "./NavMenu";
import styled from "@emotion/styled";

const Layout = styled.nav`
  position: sticky;
  top: 0;
  background: var(--background);
  border-bottom: 1px solid var(--border100);
  z-index: 99;
`;

const Menus = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const MenuLayout = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  grid-gap: 0 30px;
  align-items: center;
`;

const Nav = () => {
  const menu = [
    {
      name: "Home",
      href: "/",
    },
  ];

  return (
    <Layout id="global-nav">
      <PageContainer>
        <Menus>
          <MenuLayout>
            {menu.map((item) => (
              <NavMenu key={item.name} {...item} />
            ))}
          </MenuLayout>
          <Profile />
        </Menus>
      </PageContainer>
    </Layout>
  );
};

export default Nav;
