import { request } from "@octokit/request";
import { RepoType } from "global.types";

const headers = {
  authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

const githubApi = {
  getIssues: () => {
    return request("GET /repos/:owner/:repo/issues", {
      owner: "indegser",
      repo: "story",
      state: "open",
      headers,
    });
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
