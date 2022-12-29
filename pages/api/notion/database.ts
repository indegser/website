import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextApiRequest, NextApiResponse } from "next";

import { notion } from "@src/sdks/notion";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryDatabaseResponse>
) => {
  const { args } = JSON.parse(req.body);
  const result = await notion.databases.query(args);
  res.json(result);
};

export default handler;
