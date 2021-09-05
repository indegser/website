import styled from "@emotion/styled";
import { Issue } from "global.types";
import { colors } from "style.types";

interface Props {
  labels: Issue["labels"];
}

export const IssueLabel = ({ labels }: Props) => {
  const headLabel = labels[0];
  if (!headLabel) return null;

  const { name, color } = headLabel;

  return (
    <Container>
      <Contents>
        <Opinion>스토리</Opinion>
        <Headline>{name}</Headline>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Contents = styled.div`
  padding: 0 20px 12px;
  border-bottom: 1px solid ${colors.gray100};
`;

const Opinion = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.blue500};
  letter-spacing: 0.1px;
`;

const Headline = styled(Opinion)`
  color: ${colors.gray900};
  margin-top: 4px;
`;
