import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { createEditor } from "slate";
import { colors } from "style.types";
import { useEditorValue } from "./hooks/useEditorValue";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { useCallback, useState } from "react";
import { withHistory } from "slate-history";
import { useEditorImage } from "./hooks/useEditorImage";
import { YoutubeBlock } from "./components/YoutubeBlock";
import { useEditorYoutube } from "./hooks/useEditorYoutube";
import { ImageBlock } from "./components/ImageBlock";
import { TextLeaf } from "./components/TextLeaf";
import { useEditorInline } from "./hooks/useEditorInline";

interface Props {
  initialValue: any[];
  editor?: any;
  isReadOnly?: boolean;
  onChange?: any;
}

export const Renderer = ({
  editor,
  initialValue,
  isReadOnly = false,
  onChange,
}: Props) => {
  const [value, setValue] = useEditorValue();

  const { withImage } = useEditorImage();
  const { withYoutube } = useEditorYoutube();
  const { withInline } = useEditorInline();
  const [slateEditor] = useState(() => {
    const baseEditor = createEditor();
    return withInline(
      withYoutube(withImage(withHistory(withReact(baseEditor))))
    );
  });

  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case "image": {
        return (
          <ImageBlock
            attributes={attributes}
            element={element}
            children={children}
          />
        );
      }
      case "youtube": {
        return (
          <YoutubeBlock
            attributes={attributes}
            element={element}
            children={children}
          />
        );
      }
      case "link": {
        return (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        );
      }
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <TextLeaf {...props} />;
  }, []);

  return (
    <MarkdownContainer>
      <Container>
        <Slate
          editor={slateEditor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some text..."
          />
        </Slate>
      </Container>
    </MarkdownContainer>
  );
};

const Container = styled.div`
  font-size: 16px;
  font-weight: 420;
  line-height: 1.75;
  color: ${colors.gray800};
  padding-bottom: 80px;

  ${spacingVariables.markdownPadding}: 0px;

  ${mq("md")} {
    font-weight: 440;
    font-size: 17px;
  }

  p {
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
    cursor: pointer;
    color: ${colors.linkPrimary};

    &:hover {
      text-decoration: underline;
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

  h1 {
    font-size: 3.4rem;
    line-height: 1.19;
    letter-spacing: -0.5px;
    font-weight: 700;
  }

  ul,
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
