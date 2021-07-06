import ReactMarkdown from "react-markdown";
import { ComponentProps, FC } from "react";
import styled from "@emotion/styled";
import { mq } from "common/theme";
import directive from "remark-directive";
import visit from "unist-util-visit";
import ImageRenderer from "./renderer/ImageRenderer";
import BreakRenderer from "./renderer/BreakRenderer";
import { GoogleMap } from "./shortcode/GoogleMap";
import { spacingVariables } from "common/variables";
import { colors } from "style.types";
import { BookmarkDirective } from "./directives/BookmarkDirective";
import { CodeBlock } from "./CodeBlock";

interface Props extends ComponentProps<typeof ReactMarkdown> {}

const Container = styled.div`
  text-align: left;
  /* max-width: 640px; */

  font-size: 16px;
  font-weight: 450;
  line-height: 1.75;
  color: ${colors.textMarkdownBlack};
  font-family: var(--font-sans);

  ${spacingVariables.markdownPadding}: 0px;

  ${mq("md")} {
    ${spacingVariables.markdownPadding}: 0px;
    text-align: left;
    word-break: break-word;
    -webkit-text-stroke: 0.1px;
  }

  p {
    margin-top: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  strong {
    font-weight: 700;
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
    color: ${colors.linkPrimary};

    &:hover {
      color: ${colors.linkPrimaryHover};
    }
  }

  code,
  pre {
    padding: 4px 6px;
    border-radius: 0.2em;
    background: ${colors.bgCode};
    font-size: 0.9em;
    margin-right: 4px;
  }
`;

function reactMarkdownRemarkDirective() {
  function updateNode(node) {
    console.log(node);
    node.data = {
      hName: node.name,
      hProperties: node.attributes,
      ...node.data,
    };
    return node;
  }
  return (tree) => {
    visit(tree, "textDirective", updateNode);
    visit(tree, "leafDirective", updateNode);
    visit(tree, "containerDirective", updateNode);
  };
}

const markdownComponents = {
  GoogleMap,
  Bookmark: BookmarkDirective,
};

const Markdown = ({ children }: Props) => {
  return (
    <Container>
      <ReactMarkdown
        remarkPlugins={[directive, reactMarkdownRemarkDirective]}
        components={{
          img: (props) => <ImageRenderer {...props} />,
          hr: BreakRenderer,
          p: Block,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeBlock language={match[1]} value={String(children)} />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: "div",
          ...markdownComponents,
        }}
      >
        {children}
      </ReactMarkdown>
    </Container>
  );
};

const Block = styled.div`
  margin-top: 1.75em;
  padding: var(${spacingVariables.markdownPadding});
`;

export default Markdown;
