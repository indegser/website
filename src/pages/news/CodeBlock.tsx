import { PrismLight as Highlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";

Highlighter.registerLanguage("tsx", tsx);

import { codeStyle } from "./CodeBlock.style";

import { PageContent } from "@src/common/atoms/Container";
import { styled, theme } from "@src/common/stitches.config";
import { BlockType } from "@src/types/notion.types";

interface Props {
  block: Extract<BlockType, { type: "code" }>;
}
export const CodeBlock = ({ block }: Props) => {
  const { language, rich_text } = block.code;

  return (
    <PageContent>
      <Container>
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
  padding: "24px 16px",
  background: theme.colors.gray3,
  borderRadius: 3,
});
