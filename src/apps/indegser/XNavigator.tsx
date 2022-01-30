import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTrans } from "./Indegser.hooks";
import Language from "./Language";

const Navigation = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-column: span 8;
`;

const Title = styled.div`
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const NavLink = styled.a`
  font-size: 13px;
  padding: 4px 2px;
  cursor: default;

  &:hover {
  }

  &[data-current="true"] {
    pointer-events: none;
  }
`;

const Nav = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 16px;
  align-items: center;
`;

const XNavigator = () => {
  const { pathname } = useRouter();

  const navs = [
    { key: "resume", href: "/indegser" },
    { key: "portfolio", href: "/indegser/portfolio" },
  ] as const;

  return (
    <Navigation>
      <Title>{useTrans("name")}</Title>
      <Nav>
        {navs.map((nav) => (
          <Link key={nav.key} href={nav.href}>
            <NavLink data-current={nav.href === pathname}>
              {useTrans(nav.key)}
            </NavLink>
          </Link>
        ))}
        <Language />
      </Nav>
    </Navigation>
  );
};

export default XNavigator;
