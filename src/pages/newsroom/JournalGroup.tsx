import { Fragment } from "react";

import { Journal } from "./Journal";

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
          <Journal key={page.id} page={page} blocks={result.data.results} />
        );
      })}
    </Fragment>
  );
};
