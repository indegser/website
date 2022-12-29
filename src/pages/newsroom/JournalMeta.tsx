import { useJournalUpdatedAt } from "./Journal.hooks";

import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { JournalType } from "@src/types/cms";

interface Props {
  journal: JournalType;
}

export const JournalMeta = (props: Props) => {
  const { journal } = props;
  const updatedAt = useJournalUpdatedAt(journal);

  const getPage = () => {
    const { page } = journal.quote;
    if (typeof page == "undefined") return null;
    return `, p.${journal.quote.page}`;
  };

  return (
    <Container>
      {journal.quote && (
        <div>
          {journal.quote.book.title}
          {getPage()}
        </div>
      )}
      {journal.quote && <Divider />}
      <div>{updatedAt}</div>
    </Container>
  );
};

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, max-content)",
  alignItems: "center",
  gap: "4px",
  fontWeight: 600,
  fontSize: 14,
  color: theme.colors.gray12,

  [mq("sm")]: {
    marginRight: 0,
  },
});

const Divider = styled("div", {
  width: 16,
  height: 1,
  background: theme.colors.gray12,
});
