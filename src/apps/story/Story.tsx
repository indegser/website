import PageContainer from "common/atoms/container/PageContainer";
import Toc from "./toc/Toc";
import { useMemo } from "react";
import matter from "gray-matter";
import Headline from "./Headline";
import styled from "@emotion/styled";
import Markdown from "common/organs/markdown/Markdown";
import SEO from "common/SEO";

interface Props {
  story: IStory;
}

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Story: React.FC<Props> = ({ story }) => {
  const content = useMemo(() => {
    const { content } = matter(story.content);
    return content;
  }, []);

  return (
    <>
      <SEO
        title={story.data.title}
        description={story.data.excerpt}
        image={story.data.coverUrl}
      />
      <PageContainer>
        <Container>
          <Headline data={story.data} />
          <Toc content={content} />
          <Markdown source={content} />
        </Container>
      </PageContainer>
    </>
  );
};

export default Story;
