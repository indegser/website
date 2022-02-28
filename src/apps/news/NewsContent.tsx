import { useIsAdmin } from "common/hooks/admin.hooks";
import { useNewsQuery } from "queries/useNewsQuery";
import { useMemo } from "react";
import { useEditor } from "./hooks/useEditor";
import { ContentEditable } from "./ContentEditable";
import { useNewsContent } from "./NewsContent.hooks";
import { Descendant } from "slate";

export const NewsContent = () => {
  const isAdmin = useIsAdmin();
  const editor = useEditor();
  const { data: news } = useNewsQuery();

  const { autoSaveNewsContent } = useNewsContent();

  const initialValue = useMemo<Descendant[]>(() => {
    if (!news.content) {
      return [
        { type: "headline", children: [{ text: "" }] },
        { type: "paragraph", children: [{ text: "" }] },
      ];
    }

    return JSON.parse(news.content);
  }, []);

  return (
    <ContentEditable
      editor={editor}
      isReadOnly={!isAdmin}
      initialValue={initialValue}
      onChange={autoSaveNewsContent}
    />
  );
};
