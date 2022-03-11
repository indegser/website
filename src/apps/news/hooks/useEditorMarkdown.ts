import { Editor, Element, Point, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { CustomBlockquote, CustomHeading } from "@src/types/editor.types";

const SHORTCUTS = {
  ">": { type: "block-quote" } as CustomBlockquote,
  "#": { type: "heading", level: 1 } as CustomHeading,
  "##": { type: "heading", level: 2 } as CustomHeading,
  "###": { type: "heading", level: 3 } as CustomHeading,
} as const;

export const useEditorMarkdown = () => {
  const withMarkdown = (editor: ReactEditor) => {
    const { insertText } = editor;
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
        const match = SHORTCUTS[beforeText];

        if (match) {
          const { type, ...props } = match;
          Transforms.select(editor, range);
          Transforms.delete(editor);
          const newProperties: Partial<Element> = {
            type,
            ...props,
          };

          Transforms.setNodes<Element>(editor, newProperties, {
            match: (n) => Editor.isBlock(editor, n),
          });

          return;
        }
      }
      insertText(text);
    };

    return editor;
  };

  return { withMarkdown };
};
