import ReactMarkdown from "react-markdown";
import { ComponentProps, FC } from "react";
import styled from "@emotion/styled";
import { mq } from "common/theme";
import shortcodes from "remark-shortcodes";
import ImageRenderer from "./renderer/ImageRenderer";
import HeadingRenderer from "./renderer/HeadingRenderer";
import BreakRenderer from "./renderer/BreakRenderer";
import ParagraphRenderer from "./renderer/ParagraphRenderer";
import FootnoteDefinition from "./renderer/footnote/FootnoteDefinition";
import FootnoteReference from "./renderer/footnote/FootnoteReference";
import Shortcode from "./shortcode/Shortcode";

interface Props extends ComponentProps<typeof ReactMarkdown> {}

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  text-align: left;

  font-size: 17px;
  line-height: 1.67;
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
  return (
    <Container>
      <ReactMarkdown
        {...props}
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
          shortcode: Shortcode,
        }}
      />
    </Container>
  );
};

export default Markdown;
