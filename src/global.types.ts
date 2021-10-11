import { Endpoints } from "@octokit/types";

export type Issue =
  Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"];

export type RepoType = "story" | "book";

export const isServer = typeof window == "undefined";

export type Await<T> = T extends Promise<infer U> ? U : T;
