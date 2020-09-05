import styled from "@emotion/styled";
import Refractor from "react-refractor";

import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";

Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(tsx);

const Box = styled.div`
  pre,
  code {
    white-space: pre;
    padding: 0;
    font-size: 12px;
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
  .token.attr-value .punctuation:first-child,
  .token.keyword,
  .token.regex,
  .token.important {
    color: #795da3;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string {
    color: #a71d5d;
  }
  .token.entity {
    cursor: help;
  }

  .namespace {
    opacity: 0.7;
  }
`;

const Code = ({ language, value }) => {
  console.log(value);
  return (
    <Box>
      <Refractor language={language} value={value.trim()} />
    </Box>
  );
};

export default Code;
