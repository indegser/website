import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useEditorExitBreak = () => {
  const withExitBreak = (editor: ReactEditor) => {
    const { insertBreak } = editor;

    editor.insertBreak = () => {
      const { selection } = editor;

      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      const isHeading =
        block && "type" in block[0] && block[0].type === "heading";

      if (isHeading) {
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
