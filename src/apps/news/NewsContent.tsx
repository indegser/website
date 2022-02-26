import { useIsAdmin } from "common/hooks/admin.hooks";
import { useNewsQuery } from "queries/useNewsQuery";
import { useMemo } from "react";
import { useEditor } from "./hooks/useEditor";
import { ContentEditable } from "./content-editable/ContentEditable";
import { useNewsContent } from "./NewsContent.hooks";

export const NewsContent = () => {
  const isAdmin = useIsAdmin();
  const editor = useEditor();
  const { data: news } = useNewsQuery();

  const { autoSaveNewsContent } = useNewsContent();

  const initialValue = useMemo(() => {
    if (!news.content) {
      return [{ type: "paragraph", children: [{ text: "" }] }];
    }

    return JSON.parse(news.content);
  }, [news.content]);

  return (
    <ContentEditable
      editor={editor}
      isReadOnly={!isAdmin}
      initialValue={initialValue}
      onChange={autoSaveNewsContent}
    />
  );
};
