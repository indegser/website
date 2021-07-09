import { PageContainer } from "common/atoms/Container";
import { useIssueList } from "./IssuePage.hooks";
import IssueMarquee from "./IssueMarquee";
import styled from "@emotion/styled";
import { colors } from "style.types";

export const IssuesPage = ({ issues }) => {
  const { data } = useIssueList(issues);

  const contents = data?.map((issue) => (
    <IssueMarquee key={issue.id} issue={issue} />
  ));

  return (
    <PageContainer>
      <Heading />
      {contents}
    </PageContainer>
  );
};

const Heading = styled.div`
  margin-bottom: 20px;
  border-bottom: 4px solid ${colors.textBlack};
`;
