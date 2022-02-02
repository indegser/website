import styled from "@emotion/styled";
import { MarkdownContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { Descendant, Editor, Range } from "slate";
import { useEditorValue } from "./hooks/useEditorValue";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
} from "slate-react";
import { YoutubeBlock } from "./components/YoutubeBlock";
import { ImageBlock } from "./components/ImageBlock";
import { TextLeaf } from "./components/TextLeaf";
import { useEditor } from "./hooks/useEditor";
import { TitleBlock } from "./components/TitleBlock";
import { HeadingBlock } from "./components/HeadingBlock";
import { LinkLeaf } from "./components/LinkLeaf";
import isHotkey from "is-hotkey";

interface Props {
  initialValue: any[];
  editor?: any;
  isReadOnly?: boolean;
  onChange?: any;
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "`": "code",
  "mod+'": "highlight",
};

const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const Renderer = ({
  editor,
  initialValue,
  isReadOnly = false,
  onChange,
}: Props) => {
  const [value, setValue] = useEditorValue(initialValue);

  const slateEditor = useEditor(editor);

  const renderElement = (props: RenderElementProps) => {
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
  };

  const renderLeaf = (props: RenderLeafProps) => {
    return <TextLeaf {...props} />;
  };

  const handleChange = (value: Descendant[]) => {
    setValue(value);
    onChange(value);
  };

  return (
    <MarkdownContainer>
      <Container>
        <Slate editor={slateEditor} value={value} onChange={handleChange}>
          <Editable
            readOnly={isReadOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            // decorate={([node, path]) => {
            //   if (editor.selection != null) {
            //     if (
            //       !Editor.isEditor(node) &&
            //       Editor.string(editor, [path[0]]) === "" &&
            //       Range.includes(editor.selection, path) &&
            //       Range.isCollapsed(editor.selection)
            //     ) {
            //       return [
            //         {
            //           ...editor.selection,
            //           placeholder: true,
            //         },
            //       ];
            //     }
            //   }
            //   return [];
            // }}
            onKeyDown={(event) => {
              const isCollapsed = Range.isCollapsed(slateEditor.selection);
              if (isCollapsed) return;

              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
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
  }
`;
