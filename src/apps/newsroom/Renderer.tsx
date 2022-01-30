import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { Descendant } from "slate";
import { useEditorValue } from "./hooks/useEditorValue";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
} from "slate-react";
import { useCallback } from "react";
import { YoutubeBlock } from "./components/YoutubeBlock";
import { ImageBlock } from "./components/ImageBlock";
import { TextLeaf } from "./components/TextLeaf";
import { useEditor } from "./hooks/useEditor";
import { TitleBlock } from "./components/TitleBlock";
import { HeadingBlock } from "./components/HeadingBlock";
import { LinkLeaf } from "./components/LinkLeaf";

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
  const [value, setValue] = useEditorValue(initialValue);

  const slateEditor = useEditor(editor);

  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case "title": {
        return <TitleBlock {...props} element={element} />;
      }
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
      case "link":
      case "a": {
        return <LinkLeaf {...props} element={element} />;
      }
      case "heading": {
        return <HeadingBlock {...props} element={element} />;
      }

      case "ul": {
        return <ul {...attributes} children={children} />;
      }

      case "li": {
        return <li {...attributes} children={children} />;
      }

      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <TextLeaf {...props} />;
  }, []);

  const handleChange = useCallback((value: Descendant[]) => {
    setValue(value);
    onChange(value);
  }, []);

  return (
    <MarkdownContainer>
      <Container>
        <Slate editor={slateEditor} value={value} onChange={handleChange}>
          <Editable
            readOnly={isReadOnly}
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
  font-size: 17px;
  font-weight: 420;
  line-height: 1.55;
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

  sup {
    line-height: 1;
    padding: 0 2px;
    font-size: 80%;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 3rem;
    line-height: 1.24;
  }

  ul,
  ol {
    padding-inline-start: 1.5em;
  }

  code,
  pre {
    padding: 4px 6px;
    border-radius: 0.2em;
    font-size: 0.9em;
    margin-right: 4px;
  }
`;
