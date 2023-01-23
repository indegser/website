import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import { SpinnerCircular } from "spinners-react";

import { Journal } from "./Journal";

import { styled, theme } from "@src/design/theme/stitches.config";
import { useJournalQueries } from "@src/queries/useJournalQueries";
import { JournalPageType } from "@src/types/notion";

interface Props {
  page: Array<JournalPageType>;
  onScrollToEnd: () => void;
}

export const JournalGroup = (props: Props) => {
  const { page, onScrollToEnd } = props;

  const queryResults = useJournalQueries(page.map((page) => page.id));
  const isSuccess = queryResults.every((result) => result.isSuccess);

  if (!isSuccess)
    return (
      <Spinner>
        <SpinnerCircular
          size={28}
          color={theme.colors.gray10.toString()}
          secondaryColor={theme.colors.gray4.toString()}
        />
      </Spinner>
    );

  return (
    <Fragment>
      {page.map((page, index) => {
        const result = queryResults[index];
        if (!result.data) return null;

        return (
          <Journal key={page.id} page={page} blocks={result.data.results} />
        );
      })}
      {/* <InView
        as="div"
        style={{ height: 1 }}
        triggerOnce
        onChange={(inView) => inView && onScrollToEnd()}
      /> */}
    </Fragment>
  );
};

const Spinner = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "24px 0",
});
