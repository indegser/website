import { request } from "@octokit/request";
import { graphql } from "@octokit/graphql";
import { Repository } from "@octokit/graphql-schema";

const headers = {
  authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

const graphqlWithAuth = graphql.defaults({
  headers,
});

interface GetIssuesProps {
  pageSize?: number;
  after?: string;
}

const githubApi = {
  getIssues: async ({ pageSize = 20, after }: GetIssuesProps = {}) => {
    const { repository } = await graphqlWithAuth<{ repository: Repository }>(
      `
        query stories($first: Int, $after: String) {
          repository(name: "story", owner: "indegser") {
            issues (first:$first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }, filterBy: { states: OPEN }) {
              totalCount
              pageInfo {
                endCursor
                startCursor
                hasNextPage
              }
              nodes {
                id
                number
                title
                updatedAt
                labels(first: 5) {
                  nodes {
                    id
                    name
                  }
                }
              }
            }
          }
        }
    `,
      {
        after,
        first: pageSize,
      }
    );

    return repository.issues;
  },
  getIssue: (issueNumber: number) =>
    request("GET /repos/:owner/:repo/issues/:issue_number", {
      owner: "indegser",
      repo: "story",
      issue_number: issueNumber,
      headers,
    }),
};

export default githubApi;
