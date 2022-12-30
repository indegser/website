import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NextApiRequest, NextApiResponse } from "next";

import { notion } from "@src/sdks/notion";

const fetchNextPage = async (args: ListBlockChildrenParameters) => {
  const result = await notion.blocks.children.list(args);
  if (result.has_more) {
    const nextResult = await fetchNextPage({
      ...args,
      start_cursor: result.next_cursor,
    });
    result.results = [...result.results, ...nextResult.results];
  }

  return result;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ListBlockChildrenResponse>
) => {
  const { args } = JSON.parse(req.body);
  console.log(args, req.method);

  const result = await fetchNextPage(args);
  res.json(result);
};

export default handler;
