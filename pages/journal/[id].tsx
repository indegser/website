import { GetStaticPaths, GetStaticProps } from "next";

import { journalApi } from "@src/apis/journal";
import { JournalPage } from "@src/pages/journal/JournalPage";
import { supabase } from "@src/sdks/supabase";

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id.toString();
  const journal = await journalApi.fetchJournal(id);
  const blocks = await journalApi.fetchJournalBlocks(id);

  return {
    props: {
      id,
      journal,
      blocks,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase
    .from("journal")
    .select("id")
    .order("last_edited_time", { ascending: false })
    .limit(50);

  const paths = data.map((item) => ({
    params: { id: item.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default JournalPage;
