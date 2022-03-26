import { GetStaticProps } from "next";

import { Newsroom } from "@src/pages/newsroom/Newsroom";
import { notion } from "@src/sdks/notion";
import { isProduction } from "@src/types/env.types";

const DATABASE_ID = "0021f4b0494546a596716a7a5d9db452";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const database = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
      filter: isProduction
        ? {
            property: "status",
            select: {
              equals: "Production",
            },
          }
        : { property: "status", select: { is_not_empty: true } },
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
