import { PageContainer } from "common/atoms/Container";
import { useCategories, useIssueList } from "./IssuePage.hooks";
import IssueMarquee from "./IssueMarquee";
import styled from "@emotion/styled";
import { colors } from "style.types";

export const IssuesPage = ({ issues }) => {
  const { data } = useIssueList(issues);
  const { data: d } = useCategories();
  console.log(d);

  const contents = data?.map((issue) => (
    <IssueMarquee key={issue.id} issue={issue} />
  ));

  return contents;
};
