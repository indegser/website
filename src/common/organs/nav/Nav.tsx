import styled from "@emotion/styled";
import Theme from "./theme/Theme";
import Logo from "./Logo";
import { colors } from "types/style.types";
import Link from "next/link";

const Layout = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
`;

const Heading = styled.div`
  display: flex;
  padding: 0 16px;
  height: 45px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${colors.gray900};
`;

const Nav = () => {
  return (
    <Layout id="global-nav">
      <Link href="/" passHref>
        <a title="home">
          <Heading>
            <Logo />
            Indegser
          </Heading>
        </a>
      </Link>
      <Theme />
    </Layout>
  );
};

export default Nav;
