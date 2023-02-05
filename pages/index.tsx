import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";

import { Newsroom } from "@src/pages/newsroom/Newsroom";
import { createNewsroomQueryConfig } from "@src/queries/useNewsroomQuery";
import { CONTENT_SERVER } from "@src/types/constants";


export const getStaticProps: GetStaticProps = async (context) => {
  fetch(`${CONTENT_SERVER}/api/journal`);

  const client = new QueryClient();
  const config = createNewsroomQueryConfig();
  await client.prefetchInfiniteQuery(config);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
    revalidate: 60,
  };
}

export default Newsroom;
