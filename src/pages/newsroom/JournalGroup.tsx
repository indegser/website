import { Fragment } from "react";

import { NotionContent } from "@src/design/notion/NotionContent";
import { ContentHeadline } from "@src/design/organs/content/ContentHeadline";
import { styled, theme } from "@src/design/theme/stitches.config";
import { useJournalQueries } from "@src/queries/useJournalQueries";
import { DatabaseType, JournalPageType } from "@src/types/notion";

interface Props {
  page: DatabaseType<JournalPageType>;
}

export const JournalGroup = (props: Props) => {
  const { page } = props;
  const queryResults = useJournalQueries(page.results.map((page) => page.id));

  return (
    <Fragment>
      {page.results.map((page, index) => {
        const result = queryResults[index];
        if (!result.data) return null;

        return (
          <Journal key={page.id}>
            <ContentHeadline page={page} />
            <NotionContent blocks={result.data.results} />
          </Journal>
        );
      })}
    </Fragment>
  );
};

const Journal = styled("div", {
  padding: "32px 0px",
  boxSizing: "border-box",
  borderBottom: `1px solid ${theme.colors.gray5}`,
});
