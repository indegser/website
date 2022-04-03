import { GetServerSideProps } from "next";

import { getNewsDatabase } from "@src/apis/notion";
import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getServerSideProps: GetServerSideProps = async () => {
  const database = await getNewsDatabase();

  return {
    props: {
      database,
    },
  };
};

export default Newsroom;
