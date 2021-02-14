import { IssuesListForRepoResponseData } from "@octokit/types";

export type Issue = IssuesListForRepoResponseData[number];

export type RepoType = "story" | "book";

export const isServer = typeof window == "undefined";
