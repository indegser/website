import { Ancestor, Editor, NodeEntry, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useEditorExitBreak = () => {
  const shouldExit = (editor: ReactEditor, block: NodeEntry<Ancestor>) => {
    const whitelist = ["title", "heading", "paragraph", "block-quote"];

    if (!block || !block[0]) return;
    const [target] = block;

    return (
      "type" in target &&
      (whitelist.includes(target.type) || editor.isVoid(target))
    );
  };

  const withExitBreak = (editor: ReactEditor) => {
    const { insertBreak } = editor;

    editor.insertBreak = () => {
      const { selection } = editor;

      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      const exit = shouldExit(editor, block);

      if (exit) {
        const { anchor } = selection;

        Transforms.insertNodes(
          editor,
          { type: "paragraph", children: [{ text: "" }] },
          { at: selection }
        );
        Transforms.select(editor, [anchor.path[0] + 1, 0]);
        return;
      }

      insertBreak();
    };

    return editor;
  };

  return { withExitBreak };
};
