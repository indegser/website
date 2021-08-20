import { PageContainer } from "common/atoms/Container";
import { IssueItem } from "./IssueItem";
import { IssueListType } from "apis/github";
import SEO from "common/SEO";

interface Props {
  issues: IssueListType;
}

export const IssuesPage = ({ issues }: Props) => {
  const contents = issues.map((issue) => (
    <IssueItem key={issue.id} issue={issue} />
  ));

  return (
    <PageContainer>
      <SEO title="Pages - Indegser" />
      {contents}
    </PageContainer>
  );
};
