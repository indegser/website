import { IssuesListForRepoResponseData } from "@octokit/types";

export type Issue = IssuesListForRepoResponseData[number];

export const isServer = typeof window == "undefined";
