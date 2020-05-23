import { useRef, createContext, useContext, useMemo } from "react";
import unified from "unified";
import markdown from "remark-parse";
import compiler from "remark-stringify";
import visit from "unist-util-visit";

export const useFootnote = () => {
  const refCount = useRef<number>(0);
  const defCount = useRef<number>(0);

  const register = (isDef: boolean) => {
    let index: number;
    if (isDef) {
      index = defCount.current += 1;
    } else {
      index = refCount.current += 1;
    }

    return index;
  };

  return {
    refCount,
    defCount,
    register,
  };
};

const MarkdownContext = createContext<{
  footnote: ReturnType<typeof useFootnote>;
  source: string;
}>({
  footnote: undefined,
  source: "",
});

export const useFootnotes = () => {
  const { source } = useMarkdownContext();
  const footnotes = useMemo(() => {
    const tree = unified().use(markdown, { footnotes: true }).parse(source);
    const footnotes = [];
    visit(tree, "footnoteDefinition", (node) => {
      footnotes.push({
        identifier: node.identifier,
        label: node.label,
        content: unified().use(compiler).stringify({
          type: "root",
          children: node.children,
        }),
      });
    });

    return footnotes;
  }, [source]);

  return footnotes;
};

export const useMarkdownContext = () => useContext(MarkdownContext);
export const MarkdownProvider = MarkdownContext.Provider;
