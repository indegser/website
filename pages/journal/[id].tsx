import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";

import { JournalPage } from "@src/pages/journal/JournalPage";
import { createJournalQueryConfig } from "@src/queries/useJournalQuery";
import { supabase } from "@src/sdks/supabase";

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  const id = context.params.id.toString();
  const queryConfig = createJournalQueryConfig(id);
  await queryClient.prefetchQuery(queryConfig);

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10, // Seconds
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
