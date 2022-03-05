import { Descendant } from "slate";
import { CustomElement, CustomHeading } from "types/editor.types";

export const normalize = (source: CustomElement[]) => {
  if (source[0].type !== "headline") {
    source.unshift({
      type: "headline",
      children: [{ text: "" }],
    });
  }

  return source.map((node) => {
    if (node.type === "title") {
      return {
        type: "heading",
        children: node.children,
        level: 1,
      } as CustomHeading;
    }

    return node;
  });
};
