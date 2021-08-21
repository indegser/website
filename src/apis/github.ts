import camelcaseKeys from "camelcase-keys";
import { request } from "@octokit/request";
import { Await } from "global.types";

const headers = {
  authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

export type IssueListType = Await<ReturnType<typeof githubApi.getIssues>>;
export type IssueType = IssueListType[number];

const githubApi = {
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
};

export default githubApi;
