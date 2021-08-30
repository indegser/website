import ReactMarkdown from "react-markdown";
import { ComponentProps } from "react";
import styled from "@emotion/styled";
import { mq } from "common/theme";
import gfm from "remark-gfm";
import directive from "remark-directive";
import visit from "unist-util-visit";
import ImageRenderer from "./renderer/ImageRenderer";
import BreakRenderer from "./renderer/BreakRenderer";
import { GoogleMap } from "./directives/GoogleMap";
import { spacingVariables } from "common/variables";
import { colors } from "style.types";
import { BookmarkDirective } from "./directives/BookmarkDirective";
import { CodeBlock } from "./renderer/CodeBlock";

interface Props extends ComponentProps<typeof ReactMarkdown> {}

const Container = styled.div`
  font-size: 18px;
  font-weight: 520;
  line-height: 1.75;
  color: ${colors.gray800};

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
    padding-left: 1em;
    border-left: 4px solid ${colors.coolGray700};
    box-sizing: border-box;
    margin: 2em auto;
    font-weight: 500;
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

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 3rem;
    line-height: 1.24;
    color: ${colors.coolGray900};
  }

  ol {
    padding-inline-start: 1.5em;
  }

  code,
  pre {
    padding: 4px 6px;
    border-radius: 0.2em;
    background: ${colors.coolGray50};
    font-size: 0.9em;
    margin-right: 4px;
  }
`;

function reactMarkdownRemarkDirective() {
  function updateNode(node) {
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
        remarkPlugins={[gfm, directive, reactMarkdownRemarkDirective]}
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
