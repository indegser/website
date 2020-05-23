import PageContainer from "common/atoms/container/PageContainer";
import ParagraphRenderer from "./renderer/ParagraphRenderer";
import BreakRenderer from "./renderer/BreakRenderer";
import Toc from "./toc/Toc";
import HeadingRenderer from "./renderer/HeadingRenderer";
import ImageRenderer from "./renderer/ImageRenderer";
import FootnoteDefinition from "./renderer/footnote/FootnoteDefinition";
import FootnoteReference from "./renderer/footnote/FootnoteReference";
import Appendix from "./Appendix";
import shortcodes from "remark-shortcodes";
import Gist from "./renderer/Gist";
import { IStory } from "types/dataTypes";
import { useMemo } from "react";
import matter from "gray-matter";
import Headline from "./Headline";
import { mq } from "common/theme";
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

  const shortcodeMap = {
    gist: Gist,
  };

  return (
    <StoryContext.Provider value={{ footnote }}>
      <PageContainer>
        <Container>
          <Headline data={story.data} />
          <Toc content={content} />
          <Markdown source={content} />
          {/* <Markdown
              source={content}
              parserOptions={{
                footnotes: true,
              }}
              plugins={[shortcodes]}
              renderers={{
                footnoteDefinition: FootnoteDefinition,
                footnoteReference: FootnoteReference,
                image: ImageRenderer,
                heading: HeadingRenderer,
                thematicBreak: BreakRenderer,
                paragraph: ParagraphRenderer,
                shortcode: ({ identifier, attributes: props }) => {
                  const Renderer = shortcodeMap[identifier]
                  if (!Renderer) return null
                  return <Renderer {...props} />
                },
              }}
            /> */}
          <Appendix />
        </Container>
      </PageContainer>
    </StoryContext.Provider>
  );
};

export default Story;
