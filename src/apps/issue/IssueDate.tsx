import styled from "@emotion/styled";
import { useIssueUpdatedAt } from "./Issue.hooks";

interface Props {
  updatedAt: string;
}

export const IssueDate = ({ updatedAt }: Props) => {
  const str = useIssueUpdatedAt(updatedAt);
  return <Container>{str}</Container>;
};

const Container = styled.div`
  font-weight: 500;
  font-size: 14px;
  text-align: center;
`;
