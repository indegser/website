import { PageContainer } from "common/atoms/Container";
import { IssueItem } from "./IssueItem";
import { SEO } from "common/SEO";
import useSWRInfinite from "swr/infinite";
import { IssueConnection, PageInfo } from "@octokit/graphql-schema";
import githubApi from "apis/github";

interface Props {
  issues: IssueConnection;
}

export const IssuesPage = ({ issues }: Props) => {
  const { totalCount } = issues;
  const { data, size, setSize } = useSWRInfinite(
    (_, prevData) => {
      if (prevData && !prevData.pageInfo.hasNextPage) return null;

      return [prevData?.pageInfo ?? null];
    },
    (pageInfo: PageInfo | null) => {
      return githubApi.getIssues({ after: pageInfo?.endCursor });
    },
    {
      fallbackData: [issues],
    }
  );

  const contents = data
    .flatMap((issues) => issues.nodes)
    .map((issue) => <IssueItem key={issue.id} issue={issue} />);

  const leftover = totalCount - contents.length;
  return (
    <PageContainer>
      <SEO title="Pages - Indegser" />
      {contents}
      {leftover > 0 ? (
        <div onClick={() => setSize(size + 1)}>{leftover}개 더 불러오기</div>
      ) : null}
    </PageContainer>
  );
};
