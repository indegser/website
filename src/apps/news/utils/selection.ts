import { Editor, Element, Point, Range } from "slate";
import { ReactEditor } from "slate-react";

export const isDeleteBackwardOnFirstPoint = (editor: ReactEditor) => {
  const { selection } = editor;

  if (!selection || !Range.isCollapsed(selection)) {
    return false;
  }

  const match = Editor.above(editor, {
    match: (node) => Editor.isBlock(editor, node),
  });

  if (!match) return false;

  const [block, path] = match;
  const start = Editor.start(editor, path);

  if (Element.isElement(block) && Point.equals(selection.anchor, start)) {
    return { block, path };
  }

  return false;
};
