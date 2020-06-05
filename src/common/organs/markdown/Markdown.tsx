import ReactMarkdown from "react-markdown";
import { ComponentProps, FC } from "react";
import styled from "@emotion/styled";
import { mq } from "common/theme";
import shortcodes from "remark-shortcodes";
import ImageRenderer from "./renderer/ImageRenderer";
import HeadingRenderer from "./renderer/HeadingRenderer";
import BreakRenderer from "./renderer/BreakRenderer";
import ParagraphRenderer from "./renderer/ParagraphRenderer";
import FootnoteReference from "./renderer/footnote/FootnoteReference";
import Shortcode from "./shortcode/Shortcode";
import { useFootnote, MarkdownProvider } from "./Markdown.hooks";
import Footnotes from "./Footnotes";

interface Props extends ComponentProps<typeof ReactMarkdown> {}

const Container = styled.div`
  padding: 0 24px;
  text-align: left;
  max-width: 600px;

  font-size: 15px;
  line-height: 1.74;
  word-break: break-all;
  text-align: justify;

  ${mq("sm")} {
    font-size: 16px;
    line-height: 1.67;
  }

  strong {
    font-weight: 600;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
  }

  sup {
    line-height: 1;
    padding: 0 2px;
    font-size: 80%;
  }

  a {
    color: var(--primary100);

    &:hover {
      color: var(--primary200);
    }
  }
`;

const Markdown: FC<Props> = (props) => {
  const footnote = useFootnote();

  return (
    <Container>
      <MarkdownProvider value={{ source: props.source, footnote }}>
        <ReactMarkdown
          {...props}
          parserOptions={{
            footnotes: true,
          }}
          plugins={[shortcodes]}
          renderers={{
            footnoteDefinition: () => null,
            footnoteReference: FootnoteReference,
            image: ImageRenderer,
            heading: HeadingRenderer,
            thematicBreak: BreakRenderer,
            paragraph: ParagraphRenderer,
            shortcode: Shortcode,
          }}
        />
        <Footnotes />
      </MarkdownProvider>
    </Container>
  );
};

export default Markdown;
