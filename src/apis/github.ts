import { request } from "@octokit/request";
import { graphql as _graphql } from "@octokit/graphql";
import camelcaseKeys from "camelcase-keys";
import { Await, RepoType } from "global.types";
import { Repository } from "@octokit/graphql-schema";

const headers = {
  authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

const graphql = _graphql.defaults({ headers });

export type IssueListType = Await<ReturnType<typeof githubApi.getIssues>>;
export type IssueType = IssueListType[number];

const githubApi = {
  getCategories: async () => {
    const {
      repository: {
        discussionCategories: { nodes: result },
      },
    } = await graphql<{ repository: Repository }>(`
      {
        repository(owner: "indegser", name: "story") {
          discussionCategories(first: 20) {
            nodes {
              id
              name
              emoji
            }
          }
        }
      }
    `);

    return result;
  },
  getIssues: async (label?: string) => {
    const { data } = await request("GET /repos/{owner}/{repo}/issues", {
      owner: "indegser",
      repo: "story",
      state: "open",
      labels: label,
      headers,
    });

    return camelcaseKeys(data, { deep: true });
  },
  getIssue: (issueNumber: number) =>
    request("GET /repos/:owner/:repo/issues/:issue_number", {
      owner: "indegser",
      repo: "story",
      issue_number: issueNumber,
      headers,
    }),
  getBooks: () => {
    return request("GET /repos/:owner/:repo/issues", {
      owner: "indegser",
      repo: "book",
      state: "open",
      headers,
    });
  },
  getLabels: (repo: RepoType) => {
    return request("GET /repos/:owner/:repo/labels", {
      owner: "indegser",
      repo,
      headers,
    });
  },
};

export default githubApi;
