import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';

import { notion } from '@src/sdks/notion';
import { redis } from '@src/sdks/redis';

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

const getRedisKey = (id: string) => {
  return `page:${id}`;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ListBlockChildrenResponse>
) => {
  const { args }: { args: ListBlockChildrenParameters } = JSON.parse(req.body);
  const redisKey = getRedisKey(args.block_id);

  const cachedVersion = await redis.get<ListBlockChildrenResponse>(redisKey);

  if (cachedVersion) {
    res.json(cachedVersion);
    return;
  }

  const result = await fetchNextPage(args);

  /**
   * @description 1분 동안 캐싱.
   */
  redis.setex(redisKey, 60, JSON.stringify(result));
  res.json(result);
};

export default handler;
