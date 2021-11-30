import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { CustomElement } from "global";
import { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Text, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { colors } from "style.types";
import { Code } from "./components/Code";

export const NewsroomPage = () => {
  const initialValue: CustomElement[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [editor] = useState(withReact(createEditor()));

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <Code {...props} />;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  return (
    <MarkdownContainer>
      <Container>
        <Slate editor={editor} value={value} onChange={setValue}>
          <Editable
            renderElement={renderElement}
            onKeyDown={(event) => {
              if (event.key === "&") {
                // Prevent the ampersand character from being inserted.
                event.preventDefault();
                // Execute the `insertText` method when the event occurs.
                editor.insertText("and");
              }

              if (event.key === "`") {
                // Prevent the "`" from being inserted by default.
                event.preventDefault();
                // Otherwise, set the currently selected blocks type to "code".
                console.log("hello?");
                Transforms.setNodes(
                  editor,
                  { type: "code" },
                  { match: (n) => Text.isText(n), split: true }
                );
              }
            }}
          />
        </Slate>
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
