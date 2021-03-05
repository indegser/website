import styled from "@emotion/styled";
import { useTrans } from "../Indegser.hooks";
import { mq } from "common/theme";
import { colors } from "style.types";

const Layout = styled.div``;

const Biography = styled.div`
  column-count: 2;
  column-gap: 40px;
  color: ${colors.textLightGrey};
  line-height: 1.9;
`;

const BioField = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 40px;

  ${mq("md")} {
    grid-template-columns: 1fr;
  }
`;

const Headline = styled.h1`
  font-size: 120px;
  line-height: 92px;
  text-align: center;
`;

const Bio = () => {
  return (
    <Layout>
      <Headline>
        Technical
        <br />
        Beauty
      </Headline>
      <Biography
        dangerouslySetInnerHTML={{ __html: useTrans("biography") as string }}
      />
    </Layout>
  );
};

export default Bio;
