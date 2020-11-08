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
import { spacingVariables } from "common/variables";
import Code from "./renderer/Code";

interface Props extends ComponentProps<typeof ReactMarkdown> {}

const Container = styled.div`
  padding: var(${spacingVariables.markdownPadding});
  text-align: left;
  max-width: 640px;

  font-size: 15px;
  line-height: 1.95;
  word-break: break-word;
  letter-spacing: -0.1px;
  color: var(--text600);
  font-family: var(--font-serif);
  /* -webkit-text-stroke: 0.05px; */

  ${spacingVariables.markdownPadding}: 0 24px;

  ${mq("md")} {
    ${spacingVariables.markdownPadding}: 0px;
    text-align: left;
    word-break: break-word;
    -webkit-text-stroke: 0.1px;
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

  code,
  pre {
    padding: 4px 8px;
    border-radius: 0.2em;
    background: var(--bg100);
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
            code: Code,
          }}
        />
        <Footnotes />
      </MarkdownProvider>
    </Container>
  );
};

export default Markdown;
