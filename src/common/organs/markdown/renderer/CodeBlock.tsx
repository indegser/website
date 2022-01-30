import styled from "@emotion/styled";
import { PrismLight as Highlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import { colors } from "types/style.types";

Highlighter.registerLanguage("tsx", tsx);

const Box = styled.div`
  margin-top: 1.75em;

  /* 부모 컴포넌트 */
  .prismjs {
    margin: 0;
    padding: 12px 20px 12px 4px;
    border-radius: 4px;
    border: 1px solid ${colors.gray100};
    overflow-x: scroll;
  }

  .linenumber {
    color: ${colors.gray300};
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
    color: ${colors.gray500};
  }
  .token.punctuation,
  .token.string,
  .token.atrule,
  .token.attr-value {
    color: ${colors.blue500};
  }
  .token.property,
  .token.tag {
    color: ${colors.green500};
  }
  .token.boolean,
  .token.number {
    color: ${colors.blue500};
  }
  .token.selector,
  .token.attr-name,
  .token.attr-value .punctuation:first-of-type,
  .token.keyword,
  .token.regex,
  .token.important {
    color: ${colors.red400};
  }

  .token.punctuation {
    color: ${colors.textGrey};
  }

  .token.operator {
    color: ${colors.blue400};
  }

  .token.operator.arrow,
  .token.entity,
  .token.url,
  .language-css .token.string {
    color: ${colors.red400};
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
