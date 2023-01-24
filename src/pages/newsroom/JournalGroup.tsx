import { Fragment } from "react";

import { Journal } from "./Journal";

import { JournalPageType } from "@src/types/notion";

interface Props {
  page: Array<JournalPageType>;
}

export const JournalGroup = (props: Props) => {
  const { page } = props;

  return (
    <Fragment>
      {page.map((page) => {
        return <Journal key={page.id} page={page} />;
      })}
    </Fragment>
  );
};
