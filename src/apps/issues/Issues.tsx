import styled from "@emotion/styled";
import PageContainer from "common/atoms/container/PageContainer";
import IssueMarquee from "./Marquee";
import Author from "./Author";
import { COLORS, mq } from "common/theme";
import useSWR from "swr";
import githubApi from "apis/github";

const Container = styled.div`
  padding: 24px 0 40px 0;
  position: relative;
  margin-top: 20px;

  ${mq("md")} {
    margin-top: 0;
  }
`;

const IssueList = styled.div`
  position: relative;
  ${mq("md")} {
    padding-top: 20px;
    border-top: 1px solid ${COLORS.bgDivider};
    &:before {
      content: "";
      position: absolute;
      top: 3px;
      width: 100%;
      border-top: 1px solid ${COLORS.bgDivider};
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: max-content auto;

  ${mq("md")} {
    grid-gap: 20px;
    grid-template-columns: auto;
  }
`;

const Issues = () => {
  const { data, error } = useSWR("issues", githubApi.getIssues);

  const contents = data ? (
    data.data.map((issue) => <IssueMarquee key={issue.id} issue={issue} />)
  ) : error ? (
    <div>Error</div>
  ) : null;

  return (
    <PageContainer>
      <Container>
        <Content>
          <Author />
          <IssueList>{contents}</IssueList>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default Issues;
