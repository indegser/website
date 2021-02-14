import styled from "@emotion/styled";
import Language from "./Language";
import { useTrans } from "./Indegser.hooks";
import Resume from "./resume/Resume";
import { useRouter } from "next/router";
import Link from "next/link";
import Portfolio from "./portfolio/Portfolio";
import { colors } from "style.types";
import Container from "common/atoms/Container";

const Navigation = styled.div`
  height: 40px;
  border-bottom: 1px solid ${colors.bgDivider};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const NavLink = styled.a`
  font-size: 13px;
  color: ${colors.textBlack};
  padding: 4px 2px;
  cursor: default;

  &:hover {
    color: ${colors.linkPrimary};
  }

  &[data-current="true"] {
    pointer-events: none;
    color: ${colors.textLightGrey};
  }
`;

const Nav = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 16px;
  align-items: center;
`;

const Indegser = () => {
  const { pathname } = useRouter();
  const isPortfolioPage = pathname.includes("portfolio");
  const navs: { key: Parameters<typeof useTrans>[0]; href: string }[] = [
    { key: "resume", href: "/indegser" },
    { key: "portfolio", href: "/indegser/portfolio" },
  ];

  return (
    <Container.Default>
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
      {isPortfolioPage ? <Portfolio /> : <Resume />}
    </Container.Default>
  );
};

export default Indegser;
