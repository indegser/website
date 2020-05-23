import PageContainer from "common/atoms/container/PageContainer";
import Toc from "./toc/Toc";
import Appendix from "./Appendix";
import { IStory } from "types/dataTypes";
import { useMemo } from "react";
import matter from "gray-matter";
import Headline from "./Headline";
import styled from "@emotion/styled";
import { useFootnote, StoryContext } from "./Story.hooks";
import Markdown from "common/organs/markdown/Markdown";

interface Props {
  story: IStory;
}

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

const Story: React.FC<Props> = ({ story }) => {
  const footnote = useFootnote();
  const content = useMemo(() => {
    const { content } = matter(story.content);
    return content;
  }, []);

  return (
    <StoryContext.Provider value={{ footnote }}>
      <PageContainer>
        <Container>
          <Headline data={story.data} />
          <Toc content={content} />
          <Markdown source={content} />
          <Appendix />
        </Container>
      </PageContainer>
    </StoryContext.Provider>
  );
};

export default Story;
