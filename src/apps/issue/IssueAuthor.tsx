import styled from "@emotion/styled";
import { colors } from "style.types";

interface Props {}

export const IssueAuthor = ({}: Props) => {
  return (
    <Container>
      <Name>By Jaekwon Han</Name>
      <Paragraph>
        Mr. Suri teaches history at the University of Texas, Austin, and has
        written extensively about modern politics and foreign policy.
      </Paragraph>
    </Container>
  );
};

const Container = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${colors.gray100};
  padding: 16px 0;
  margin: 32px 0;
  line-height: 22px;
  color: ${colors.gray800};
`;

const Name = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const Paragraph = styled.div`
  font-size: 15px;
`;
