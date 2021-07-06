import styled from "@emotion/styled";
import { Issue } from "global.types";
import { colors } from "style.types";

export const IssueContent = ({ issue }: { issue: Issue }) => {
  const { title } = issue;
  return <Title>{title}</Title>;
};

const Title = styled.div`
  font-weight: 800;
  line-height: 1.2;
  font-size: 40px;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 3px 2px;
`;
