import { Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { isDeleteBackwardOnFirstPoint } from "./selection";

export const withHeadline = (editor: ReactEditor) => {
  const { normalizeNode, deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const match = isDeleteBackwardOnFirstPoint(editor);
    if (!match) {
      deleteBackward(...args);
      return;
    }

    const { block, path } = match;

    if (block.type === "headline") {
      return;
    }

    if (path[0] === 1) {
      Transforms.mergeNodes(editor);

      if (editor.children[0].type === "paragraph") {
        Transforms.setNodes(editor, { type: "headline" });
      }

      return;
    }

    if (block.type !== "paragraph") {
      Transforms.setNodes(editor, { type: "paragraph" });
      return;
    }

    deleteBackward(...args);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    // Headline이 두 개 이상 있으면 두 번째 Headline은 paragraph로 변환한다.
    if (Element.isElement(node) && node.type === "headline") {
      if (path[0] > 0) {
        Transforms.splitNodes(editor);
        Transforms.setNodes(editor, { type: "paragraph" });
      }
    }

    normalizeNode(entry);
  };

  return editor;
};
