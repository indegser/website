import styled from "@emotion/styled";
import { mq } from "common/theme";
import { Issue } from "global.types";

const Box = styled.div`
  padding: 40px 0 20px 0;

  ${mq("sm")} {
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  color: var(--text400);
  font-size: 15px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.1px;
  margin: 0;
  word-break: keep-all;
`;

const Excerpt = styled.h3`
  color: var(--text300);
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  max-width: 560px;
  margin: 0;
  word-break: keep-all;
  margin-top: 0.4rem;
  padding-right: 2vw;
`;

interface Props {
  issue: Issue;
}

const Headline: React.FC<Props> = ({ issue }) => {
  const { title } = issue;

  return (
    <Box>
      <Title>{title}</Title>
    </Box>
  );
};

export default Headline;
