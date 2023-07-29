import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';

import { notion } from '@src/sdks/notion';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetPageResponse>
) => {
  const args = JSON.parse(req.body);
  const result = await notion.pages.retrieve(args);
  res.json(result);
};

export default handler;
