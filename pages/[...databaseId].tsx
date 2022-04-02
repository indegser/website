import { GetServerSideProps } from "next";

import { createNotionClient } from "@src/sdks/notion";
import { supabase } from "@src/sdks/supabase";
import Newsroom from "pages";

export default Newsroom;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    data: [row],
  } = await supabase
    .from("tokens")
    .select()
    .match({ id: context.params.databaseId.toString() });

  const { token, database_id } = row;

  const notion = createNotionClient(token);
  const me = await notion.users.me({});

  const database = await notion.databases.query({
    database_id,
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  });

  return {
    props: {
      database,
    },
  };
};
