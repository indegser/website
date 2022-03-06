import { MarkdownContainer } from "common/atoms/Container";
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
import { HeadingBlock } from "./components/HeadingBlock";
import { LinkLeaf } from "./components/LinkLeaf";
import isHotkey from "is-hotkey";
import { styled } from "common/stitches.config";
import { BookmarkBlock } from "./components/BookmarkBlock";
import { mq } from "common/theme";
import { BulletedListBlock } from "./components/BulletedListBlock";
import { NewsHeadline } from "./headline/Headline";

interface Props {
  initialValue: any[];
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

export const ContentEditable = ({
  initialValue,
  onChange,
  isReadOnly,
}: Props) => {
  const [value, setValue] = useEditorValue(initialValue);
  const editor = useEditor();

  const renderElement = (props: RenderElementProps) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case "headline": {
        return (
          <NewsHeadline attributes={attributes} element={element}>
            {children}
          </NewsHeadline>
        );
      }

      case "image": {
        return (
          <ImageBlock attributes={attributes} element={element}>
            {children}
          </ImageBlock>
        );
      }
      case "youtube": {
        return (
          <YoutubeBlock attributes={attributes} element={element}>
            {children}
          </YoutubeBlock>
        );
      }

      case "bookmark": {
        return (
          <BookmarkBlock attributes={attributes} element={element}>
            {children}
          </BookmarkBlock>
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
        return <ul {...attributes}>{children}</ul>;
      }

      case "li": {
        return <li {...attributes}>{children}</li>;
      }

      case "bulleted-list": {
        return (
          <BulletedListBlock {...props} element={element}>
            {children}
          </BulletedListBlock>
        );
      }

      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;

      default:
        return <BaseBlock {...attributes}>{children}</BaseBlock>;
    }
  };

  const renderLeaf = (props: RenderLeafProps) => {
    return <TextLeaf {...props} />;
  };

  const handleChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    setValue(value);

    if (isAstChange) {
      onChange(value);
    }
  };

  return (
    <MarkdownContainer>
      <Container>
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Editable
            autoFocus
            readOnly={isReadOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={([node, path]) => {
              if (editor.selection != null) {
                if (
                  !Editor.isEditor(node) &&
                  Editor.string(editor, [path[0]]) === "" &&
                  Range.includes(editor.selection, path) &&
                  Range.isCollapsed(editor.selection)
                ) {
                  return [
                    {
                      ...editor.selection,
                      placeholder: true,
                    },
                  ];
                }
              }

              return [];
            }}
            onKeyDown={(event) => {
              /**
               * SOFT_BREAK
               */
              if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                editor.insertText("\n");
                return;
              }

              const isCollapsed = Range.isCollapsed(editor.selection);
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

const Container = styled("article", {
  fontSize: 19,
  lineHeight: 1.46,
  paddingBottom: 80,
  letterSpacing: "-0.12px",
  fontWeight: 420,

  [mq("sm")]: {
    fontSize: 17,
    lineHeight: 1.49,
    padding: "0 0 80px 0",
  },

  ["& strong"]: {
    fontWeight: 700,
  },
  ["& sup"]: {
    lineHeight: 1,
    padding: "0 2px",
    fontSize: "0.8rem",
  },
  [`& ${HeadingBlock}`]: {
    marginTop: "3rem",
    lineHeight: 1.24,
  },
  ["& ul, & ol"]: {
    paddingInlineStart: "1.5em",
  },
  ["& blockquote"]: {
    background: "$canvasSubtle",
    margin: 0,
    padding: 16,
  },
});

const BaseBlock = styled("div", {
  marginBottom: "1.4211em",
});
