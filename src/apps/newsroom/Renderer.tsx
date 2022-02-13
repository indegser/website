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
import { TitleBlock } from "./components/TitleBlock";
import { HeadingBlock } from "./components/HeadingBlock";
import { LinkLeaf } from "./components/LinkLeaf";
import isHotkey from "is-hotkey";
import { styled } from "common/stitches.config";
import { BookmarkBlock } from "./components/BookmarkBlock";

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

      case "bullet-list": {
        return <ul {...attributes}>{children}</ul>;
      }

      case "list-item": {
        return <li {...attributes}>{children}</li>;
      }

      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;

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
            //   if (!slateEditor.selection) return [];
            //   const include = Range.includes(editor.selection, path);

            //   if (include) {
            //     if (!slateEditor.isVoid(node as CustomElement)) return [];
            //     return [{ ...slateEditor.selection, placeholder: true }];
            //   }

            //   return [];
            // }}
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
              /**
               * SOFT_BREAK
               */
              if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                slateEditor.insertText("\n");
                return;
              }

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

const Container = styled("article", {
  fontSize: 16,
  fontWeight: 420,
  lineHeight: 1.55,
  padding: "0 30px",
  paddingBottom: 80,

  ["& p"]: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
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
