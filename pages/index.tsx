import { GetServerSideProps } from "next";

import { Newsroom } from "@src/pages/newsroom/Newsroom";
import { CONTENT_SERVER } from "@src/types/constants";

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  fetch(`${CONTENT_SERVER}/api/journal`);

  return {
    props: {},
  };
};

export default Newsroom;
