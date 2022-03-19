import { PrismLight as Highlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";

Highlighter.registerLanguage("typescript", tsx);

import { codeStyle } from "./CodeBlock.style";

import { PageContent } from "@src/common/atoms/Container";
import { styled, theme } from "@src/common/stitches.config";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "code" }>;
}

const capitalize = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const CodeBlock = ({ block }: Props) => {
  const { language, rich_text } = block.code;

  return (
    <PageContent>
      <Container>
        <Language>{capitalize(language)}</Language>
        <Highlighter style={codeStyle} language={language}>
          {rich_text[0].plain_text}
        </Highlighter>
      </Container>
    </PageContent>
  );
};

const Container = styled("div", {
  fontSize: "80%",
  tabSize: 2,
  whiteSpace: "pre",
  padding: "12px 16px 24px 16px",
  background: theme.colors.gray3,
  borderRadius: 3,
});

const Language = styled("div", {
  color: theme.colors.gray10,
  fontSize: "80%",
  letterSpacing: 0,
});
