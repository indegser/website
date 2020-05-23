import { useMemo } from "react";
import { useMarkdownContext } from "../../Markdown.hooks";

const useFootnote = (isDefinition?: boolean) => {
  const { footnote } = useMarkdownContext();

  const index = useMemo(() => {
    return footnote.register(isDefinition);
  }, []);

  const defId = `cite-def-${index}`;
  const refId = `cite-ref-${index}`;

  return {
    defId,
    refId,
    index,
  };
};

export default useFootnote;
