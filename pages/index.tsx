import { GetStaticProps } from "next";

import { Newsroom } from "@src/pages/newsroom/Newsroom";
import { notion } from "@src/sdks/notion";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const database = await notion.databases.query({
      database_id: "0021f4b0494546a596716a7a5d9db452",
      sorts: [{ property: "published_time", direction: "descending" }],
    });

    return {
      props: {
        database,
      },
      revalidate: 60,
    }; // 1min.
  } catch (err) {
    return { props: {} };
  }
};

export default Newsroom;
