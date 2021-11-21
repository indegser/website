import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { colors } from "style.types";
import { Block } from "./Block";
import { useEditor } from "./Editor.hooks";

export const EditorPage = () => {
  const blocks = useEditor((s) => s.blocks);
  const appendBlock = useEditor((s) => s.appendBlock);
  const deleteBlocks = useEditor((s) => s.deleteBlocks);

  const handleDelete = (blockId: string) => {
    deleteBlocks([blockId]);
  };

  return (
    <MarkdownContainer>
      <Container>
        {blocks.map((block) => (
          <Block
            key={block.id}
            id={block.id}
            onAppendBlock={appendBlock}
            onDelete={handleDelete}
          />
        ))}
      </Container>
    </MarkdownContainer>
  );
};

const Container = styled.div`
  font-size: 16px;
  font-weight: 520;
  line-height: 1.75;
  color: ${colors.gray800};

  ${spacingVariables.markdownPadding}: 0px;

  ${mq("md")} {
    font-weight: 450;
    font-size: 17px;
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
    border-left: 4px solid ${colors.gray700};
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
    color: ${colors.gray900};
  }

  ol {
    padding-inline-start: 1.5em;
  }

  code,
  pre {
    padding: 4px 6px;
    border-radius: 0.2em;
    background: ${colors.gray50};
    font-size: 0.9em;
    margin-right: 4px;
  }
`;
