import { useIsAdmin } from "common/hooks/admin.hooks";
import { useNewsQuery } from "queries/useNewsQuery";
import { useMemo } from "react";
import { ContentEditable } from "./ContentEditable";
import { useNewsContent } from "./NewsContent.hooks";
import { Descendant } from "slate";
import { normalize } from "./utils/normalize";

export const NewsContent = () => {
  const { data: news } = useNewsQuery();
  const isAdmin = useIsAdmin();

  const { autoSaveNewsContent } = useNewsContent();

  const initialValue = useMemo<Descendant[]>(() => {
    if (!news.content) {
      return [
        { type: "headline", children: [{ text: "" }] },
        { type: "paragraph", children: [{ text: "" }] },
      ];
    }

    return normalize(JSON.parse(news.content));
  }, []);

  return (
    <ContentEditable
      initialValue={initialValue}
      onChange={autoSaveNewsContent}
      isReadOnly={!isAdmin}
    />
  );
};
