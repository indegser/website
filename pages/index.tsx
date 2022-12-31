import { GetServerSideProps } from "next";

import { journalApi } from "@src/apis/journal";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const subject = context.query.subject?.toString();

  const firstPage = await journalApi.fetchJournalList({
    subject,
    pageParam: undefined,
  });

  return {
    props: { firstPage },
  };
};
export default Newsroom;
