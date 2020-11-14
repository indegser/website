import PageContainer from "common/atoms/container/PageContainer";
import Toc from "./toc/Toc";
import { useMemo } from "react";
import Headline from "./Headline";
import styled from "@emotion/styled";
import Markdown from "common/organs/markdown/Markdown";
import SEO from "common/SEO";
import { Issue } from "global.types";
import { useIssueSEO } from "./Issue.hooks";

interface Props {
  issue: Issue;
}

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const IssuePage: React.FC<Props> = ({ issue }) => {
  const { image, description } = useIssueSEO(issue.body);

  return (
    <>
      <SEO title={issue.title} image={image} description={description} />
      <PageContainer>
        <Container>
          <Headline issue={issue} />
          <Toc content={issue.body} />
          <Markdown source={issue.body} />
        </Container>
      </PageContainer>
    </>
  );
};

export default IssuePage;
