import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextApiRequest, NextApiResponse } from "next";

import { notion } from "@src/sdks/notion";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ListBlockChildrenResponse>
) => {
  const { args } = JSON.parse(req.body);
  const result = await notion.blocks.children.list(args);
  res.json(result);
};

export default handler;
