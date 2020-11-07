import PageContainer from "common/atoms/container/PageContainer";
import Toc from "./toc/Toc";
import { useMemo } from "react";
import Headline from "./Headline";
import styled from "@emotion/styled";
import Markdown from "common/organs/markdown/Markdown";
import SEO from "common/SEO";
import { Issue } from "global.types";

interface Props {
  issue: Issue;
}

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const IssuePage: React.FC<Props> = ({ issue }) => {
  const content = useMemo(() => {
    // const { content } = matter(story.content);
    return issue.body;
  }, []);

  return (
    <>
      <SEO title={issue.title} />
      <PageContainer>
        <Container>
          <Headline issue={issue} />
          <Toc content={content} />
          <Markdown source={content} />
        </Container>
      </PageContainer>
    </>
  );
};

export default IssuePage;
