import styled from "@emotion/styled";
import { mq } from "common/theme";
import { IStory } from "types/dataTypes";

const Box = styled.div`
  padding: 40px 0 20px 0;
`;

const Title = styled.h1`
  color: var(--text400);
  font-size: 20px;
  font-family: var(--font-serif);
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -0.1px;
  margin: 0;
  word-break: keep-all;

  ${mq("sm")} {
    font-size: 40px;
    letter-spacing: -0.6px;
  }
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

interface Props extends Pick<IStory, "data"> {}

const Headline: React.FC<Props> = ({ data }) => {
  const { title, excerpt } = data;
  console.log(data);
  return (
    <Box>
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
    </Box>
  );
};

export default Headline;
