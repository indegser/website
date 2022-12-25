import { useJournalUpdatedAt } from "./Journal.hooks";

import { mq } from "@src/design/theme/mediaQueries";
import { styled } from "@src/design/theme/stitches.config";
import { JournalType } from "@src/types/cms";

interface Props {
  journal: JournalType;
}

export const JournalMeta = (props: Props) => {
  const { journal } = props;
  const updatedAt = useJournalUpdatedAt(journal);
  return (
    <Container>
      <div>{journal.book.title}</div>
      <div>{updatedAt}</div>
    </Container>
  );
};

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  gap: "12px",
  fontWeight: 500,
  fontSize: 15,

  [mq("sm")]: {
    marginRight: 0,
  },
});
