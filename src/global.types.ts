import { IssuesListForRepoResponseData } from "@octokit/types";

export type Issue = IssuesListForRepoResponseData[number];

export type RepoType = "story" | "book";

export const isServer = typeof window == "undefined";

export type Await<T> = T extends Promise<infer U> ? U : T;
