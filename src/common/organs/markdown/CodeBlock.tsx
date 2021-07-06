import styled from "@emotion/styled";
import { PrismLight as Highlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { colors } from "style.types";

Highlighter.registerLanguage("tsx", tsx);

const Box = styled.div`
  /* 부모 컴포넌트 */
  .prismjs {
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
    color: #969896;
  }
  .token.punctuation,
  .token.string,
  .token.atrule,
  .token.attr-value {
    color: #183691;
  }
  .token.property,
  .token.tag {
    color: #63a35c;
  }
  .token.boolean,
  .token.number {
    color: #0086b3;
  }
  .token.selector,
  .token.attr-name,
  .token.attr-value .punctuation:first-of-type,
  .token.keyword,
  .token.regex,
  .token.important {
    color: #795da3;
  }

  .token.punctuation {
    color: ${colors.textGrey};
  }

  .token.operator {
    color: ${colors.blue200};
  }

  .token.operator.arrow,
  .token.entity,
  .token.url,
  .language-css .token.string {
    color: ${colors.red200};
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
        language={language}
        children={value.trim()}
        useInlineStyles={false}
      />
    </Box>
  );
};
