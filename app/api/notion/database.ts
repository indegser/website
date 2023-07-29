import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';

import { notion } from '@src/sdks/notion';
import { PageType } from '@src/types/notion.types';
import { coverTask } from '@src/utils/image/coverTask';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryDatabaseResponse>
) => {
  const args = JSON.parse(req.body);
  const result = await notion.databases.query(args);
  const results = await Promise.all(
    coverTask(result.results as Array<PageType>)
  );

  res.json({
    ...result,
    results,
  });
};

export default handler;
