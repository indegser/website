import { Descendant } from "slate";

export const normalize = (source: Descendant[]) => {
  if (source[0].type !== "headline") {
    source.unshift({
      type: "headline",
      children: [{ text: "" }],
    });
  }

  return source;
};
