import styled from "@emotion/styled";
import { PrismLight as Highlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";

Highlighter.registerLanguage("tsx", tsx);

const Box = styled.div`
  margin-top: 1.75em;

  /* 부모 컴포넌트 */
  .prismjs {
    margin: 0;
    padding: 12px 20px 12px 4px;
    border-radius: 4px;
    border: 1px solid gray;
    overflow-x: scroll;
  }

  .linenumber {
    color: gray;
  }

  pre,
  code {
    white-space: pre;
    padding: 0;
    font-size: 13px;
    text-size-adjust: auto;
  }

  pre {
    padding: 8px 12px;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: gray;
  }
  .token.punctuation,
  .token.string,
  .token.atrule,
  .token.attr-value {
    color: blue;
  }
  .token.property,
  .token.tag {
    color: green;
  }
  .token.boolean,
  .token.number {
    color: blue;
  }
  .token.selector,
  .token.attr-name,
  .token.attr-value .punctuation:first-of-type,
  .token.keyword,
  .token.regex,
  .token.important {
    color: red;
  }

  .token.punctuation {
    color: gray;
  }

  .token.operator {
    color: blue;
  }

  .token.operator.arrow,
  .token.entity,
  .token.url,
  .language-css .token.string {
    color: red;
  }
  .token.entity {
    cursor: help;
  }

  .namespace {
    opacity: 0.7;
  }
`;

export const CodeBlock = ({ language, value }) => {
  return (
    <Box>
      <Highlighter
        showLineNumbers
        language={language}
        children={value.trim()}
        useInlineStyles={false}
      />
    </Box>
  );
};
