import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import { Newsroom } from "@src/pages/newsroom/Newsroom";
import { createNewsroomQueryConfig } from "@src/queries/useNewsroomQuery";
import { CONTENT_SERVER } from "@src/types/constants";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  fetch(`${CONTENT_SERVER}/api/journal`);

  const client = new QueryClient();
  const config = createNewsroomQueryConfig();
  await client.prefetchInfiniteQuery(config);

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

export default Newsroom;
