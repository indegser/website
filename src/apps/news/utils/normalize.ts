import { CustomParagraph } from "types/editor.types";
import { Descendant, Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const normalize = (source: Descendant[]) => {
  if (source[0].type !== "headline") {
    source.unshift({
      type: "headline",
      children: [{ text: "" }],
    });
  }

  return source;
  // const withLayout = (editor: ReactEditor) => {
  //   editor.normalizeNode = ([node, path]) => {
  //     if (path.length === 0) {
  //       if (editor.children.length < 1) {
  //         const paragraph: CustomParagraph = {
  //           type: "paragraph",
  //           children: [{ text: "" }],
  //         };
  //         Transforms.insertNodes(editor, paragraph, { at: path.concat(0) });
  //       }

  //       for (const [child, childPath] of Node.children(editor, path)) {
  //         let type: string;
  //         const slateIndex = childPath[0];

  //         const enforceType = (type) => {
  //           if (Element.isElement(child) && child.type !== type) {
  //             const newProperties: Partial<Element> = { type };
  //             Transforms.setNodes<Element>(editor, newProperties, {
  //               at: childPath,
  //             });
  //           }
  //         };

  //         switch (slateIndex) {
  //           case 0:
  //             type = "paragraph";
  //             enforceType(type);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     }

  //     return normalizeNode([node, path]);
  //   };

  //   return editor;
  // };

  // return { withLayout };
};
