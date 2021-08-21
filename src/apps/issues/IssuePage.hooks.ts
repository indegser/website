import githubApi, { IssueListType } from "apis/github";
import useSWR from "swr";

export const useIssueList = (initialData: IssueListType) => {
  return useSWR("issues", () => githubApi.getIssues(), { initialData });
};

export const useCategories = () => {
  return useSWR("categories1", () => githubApi.getCategories());
};
