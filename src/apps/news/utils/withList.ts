import { Editor, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withList = (editor: ReactEditor) => {
  const { isVoid, insertText, insertBreak, deleteBackward } = editor;

  // editor.isVoid = (element) => {
  //   return element.type === "bulleted-list" ? true : isVoid(element);
  // };

  editor.insertBreak = () => {
    const block = Editor.above(editor, {
      match: (node) => Editor.isBlock(editor, node),
    });

    insertBreak();
  };

  editor.insertText = (text) => {
    const isSpace = text === " ";
    const { selection } = editor;

    const isCollapsed = selection && Range.isCollapsed(selection);

    if (!isSpace || !isCollapsed) {
      return insertText(text);
    }

    const blockRange = {
      anchor: selection.anchor,
      focus: { ...selection.focus, offset: 0 },
    };

    const beforeText = Editor.string(editor, blockRange);

    switch (beforeText) {
      case "-": {
        Transforms.select(editor, blockRange);
        Transforms.delete(editor);

        Transforms.setNodes(
          editor,
          { type: "bulleted-list", children: [{ text: "" }] },
          { match: (n) => Editor.isBlock(editor, n) }
        );

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (unit) => {
    deleteBackward(unit);
  };

  return editor;
};
