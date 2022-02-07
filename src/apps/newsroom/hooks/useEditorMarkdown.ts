import { Editor, Element, Point, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { CustomBulletList } from "types/editor.types";

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
};

export const useEditorMarkdown = () => {
  const withMarkdown = (editor: ReactEditor) => {
    const { deleteBackward, insertText } = editor;
    editor.insertText = (text) => {
      const { selection } = editor;

      if (text === " " && selection && Range.isCollapsed(selection)) {
        const { anchor } = selection;
        const block = Editor.above(editor, {
          match: (n) => Editor.isBlock(editor, n),
        });
        const path = block ? block[1] : [];
        const start = Editor.start(editor, path);
        const range = { anchor, focus: start };
        const beforeText = Editor.string(editor, range);
        const type = SHORTCUTS[beforeText];

        if (type) {
          Transforms.select(editor, range);
          Transforms.delete(editor);
          const newProperties: Partial<Element> = {
            type,
          };
          Transforms.setNodes<Element>(editor, newProperties, {
            match: (n) => Editor.isBlock(editor, n),
          });

          if (type === "list-item") {
            const list: CustomBulletList = {
              type: "bullet-list",
              children: [],
            };

            Transforms.wrapNodes(editor, list, {
              match: (n) =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === "list-item",
            });
          }

          return;
        }
      }

      insertText(text);
    };

    editor.deleteBackward = (...args) => {
      const { selection } = editor;

      if (selection && Range.isCollapsed(selection)) {
        const match = Editor.above(editor, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (match) {
          const [block, path] = match;
          const start = Editor.start(editor, path);

          if (
            !Editor.isEditor(block) &&
            Element.isElement(block) &&
            block.type !== "paragraph" &&
            Point.equals(selection.anchor, start)
          ) {
            const newProperties: Partial<Element> = {
              type: "paragraph",
            };
            Transforms.setNodes(editor, newProperties);

            if (block.type === "list-item") {
              Transforms.unwrapNodes(editor, {
                match: (n) =>
                  !Editor.isEditor(n) &&
                  Element.isElement(n) &&
                  n.type === "bullet-list",
                split: true,
              });
            }

            return;
          }
        }

        deleteBackward(...args);
      }
    };

    return editor;
  };

  return { withMarkdown };
};
