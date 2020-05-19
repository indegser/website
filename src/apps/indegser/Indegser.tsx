import PageContainer from "common/atoms/container/PageContainer";
import styled from "@emotion/styled";
import Language from "./Language";
import { useTrans } from "./Indegser.hooks";
import Resume from "./resume/Resume";

const Navigation = styled.div`
  height: 40px;
  border-bottom: 1px solid var(--border100);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const NavItem = styled.div`
  font-size: 13px;
  color: var(--text300);
  padding: 4px 2px;
  cursor: default;

  &:hover {
    color: var(--text400);
  }
`;

const Nav = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 16px;
  align-items: center;
`;

const Indegser = () => {
  return (
    <PageContainer>
      <Navigation>
        <Title>{useTrans("name")}</Title>
        <Nav>
          <NavItem>{useTrans("resume")}</NavItem>
          <NavItem>{useTrans("portfolio")}</NavItem>
          <Language />
        </Nav>
      </Navigation>
      <Resume />
    </PageContainer>
  );
};

export default Indegser;
