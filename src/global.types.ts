import { IssuesListForRepoResponseData } from "@octokit/types";

export type Issue = IssuesListForRepoResponseData[number];
