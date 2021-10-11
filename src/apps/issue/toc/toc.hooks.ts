import { unified } from "unified";
import markdown from "remark-parse";
import compiler from "remark-stringify";
import unistMap from "unist-util-map";
import toc from "mdast-util-toc";
import { useMemo } from "react";

export const useTocContent = (content: string) => {
  const tocContent = useMemo(() => {
    const tree = unified().use(markdown).parse(content);

    const tocTree = toc(tree, {
      maxDepth: 2,
    });

    if (!tocTree.map) {
      return null;
    }

    const tocNode = unistMap(tocTree.map, (node) => {
      if (node.type === "list") {
        return {
          ...node,
          ordered: true,
        };
      }
      return node;
    });

    const parsed = unified()
      .use(compiler)
      .stringify(tocNode as any);

    return parsed;
  }, [content]);

  return tocContent;
};
