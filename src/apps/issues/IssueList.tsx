import useSWR from "swr";
import styled from "@emotion/styled";
import githubApi from "apis/github";
import { mq } from "common/theme";
import IssueMarquee from "./Marquee";
import { colors } from "style.types";

const Container = styled.div`
  position: relative;
  ${mq("md")} {
    padding-top: 20px;
    border-top: 1px solid ${colors.bgDivider};
    &:before {
      content: "";
      position: absolute;
      top: 3px;
      width: 100%;
      border-top: 1px solid ${colors.bgDivider};
    }
  }
`;

const IssueList = () => {
  const { data } = useSWR("issues", githubApi.getIssues, {
    suspense: true,
  });

  const contents = data.data.map((issue) => (
    <IssueMarquee key={issue.id} issue={issue} />
  ));

  return <Container>{contents}</Container>;
};

export default IssueList;
