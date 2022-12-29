import { isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Fragment } from "react";

import { useContentGroupQuery } from "./ContentGroup.hooks";

import { NotionContent } from "@src/design/notion/NotionContent";
import { ContentHeadline } from "@src/design/organs/content/ContentHeadline";
import { styled, theme } from "@src/design/theme/stitches.config";
import { DatabaseType, JournalPageType } from "@src/types/notion";

interface Props {
  page: DatabaseType<JournalPageType>;
}

export const ContentGroup = (props: Props) => {
  const { page } = props;

  const results = useContentGroupQuery(page.results.map((page) => page.id));
  return (
    <Fragment>
      {page.results.map((page, index) => {
        const result = results[index];
        if (!result.data) return null;

        if (!isFullPage(page)) return null;

        return (
          <Journal key={page.id}>
            <ContentHeadline page={page} />
            <NotionContent
              blocks={result.data.results as BlockObjectResponse[]}
            />
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
