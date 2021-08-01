import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import Markdown from "common/organs/markdown/Markdown";
import { Issue } from "global.types";

export const IssueContent = ({ issue }: { issue: Issue }) => {
  const { title } = issue;
  return (
    <MarkdownContainer>
      <Title>{title}</Title>
      <Markdown children={issue.body} />
    </MarkdownContainer>
  );
};

const Title = styled.div`
  font-weight: 800;
  line-height: 1.2;
  font-size: 40px;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 3px 2px;
`;
