import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import Markdown from "common/organs/markdown/Markdown";
import { mq } from "common/theme";
import { Issue } from "global.types";
import { colors } from "style.types";
import { IssueAuthor } from "./IssueAuthor";
import { IssueDate } from "./IssueDate";

export const IssueContent = ({ issue }: { issue: Issue }) => {
  const { title } = issue;

  return (
    <MarkdownContainer>
      <Title>{title}</Title>
      <IssueDate updatedAt={issue.updated_at} />
      <IssueAuthor />
      <Markdown children={issue.body} />
    </MarkdownContainer>
  );
};

const Title = styled.div`
  font-weight: 820;
  line-height: 1.2;
  font-size: 60px;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: center;
  word-break: keep-all;
  padding: 32px 0 20px;
  color: ${colors.textTitle};

  ${mq("sm")} {
    font-size: 48px;
    padding-top: 20px;
  }
`;
