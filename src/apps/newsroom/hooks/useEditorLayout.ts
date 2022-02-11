import { CustomParagraph, CustomTitle } from "types/editor.types";
import { Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const useEditorLayout = () => {
  const withLayout = (editor: ReactEditor) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = ([node, path]) => {
      if (path.length === 0) {
        if (editor.children.length < 1) {
          const title: CustomTitle = {
            type: "title",
            children: [{ text: "Untitled" }],
          };
          Transforms.insertNodes(editor, title, { at: path.concat(0) });
        }

        if (editor.children.length < 2) {
          const paragraph: CustomParagraph = {
            type: "paragraph",
            children: [{ text: "" }],
          };
          Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
        }

        for (const [child, childPath] of Node.children(editor, path)) {
          let type: string;
          const slateIndex = childPath[0];
          const enforceType = (type) => {
            if (Element.isElement(child) && child.type !== type) {
              const newProperties: Partial<Element> = { type };
              Transforms.setNodes<Element>(editor, newProperties, {
                at: childPath,
              });
            }
          };

          switch (slateIndex) {
            case 0:
              type = "title";
              enforceType(type);
              break;
            case 1:
              type = "paragraph";
              enforceType(type);
            default:
              break;
          }
        }
      }

      return normalizeNode([node, path]);
    };

    return editor;
  };

  return { withLayout };
};