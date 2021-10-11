import { PageContainer } from "common/atoms/Container";
import { IssueItem } from "./IssueItem";
import { SEO } from "common/SEO";
import useSWRInfinite from "swr/infinite";
import { IssueConnection, PageInfo } from "@octokit/graphql-schema";
import githubApi from "apis/github";
import { IssuesLoadMore } from "./IssuesLoadMore";

interface Props {
  issues: IssueConnection;
}

export const IssuesPage = ({ issues }: Props) => {
  const { totalCount, pageInfo } = issues;

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index, prevData) => {
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

  const handleLoadMore = () => {
    if (isValidating) return;
    setSize(size + 1);
  };
  return (
    <PageContainer>
      <SEO title="Pages - Indegser" />
      {contents}
      <IssuesLoadMore leftover={leftover} onLoadMore={handleLoadMore} />
    </PageContainer>
  );
};
