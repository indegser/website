import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

import { notion } from "@src/sdks/notion";
import { redis } from "@src/sdks/redis";

const DATABASE_ID = "0021f4b0494546a596716a7a5d9db452";
const REDIS_KEY = `database:${DATABASE_ID}`;

type Cache = Record<string, string>;

const handler = async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const { secret } = req.query;

  if (secret !== process.env.API_SECRET_TOKEN) {
    return res.status(401).json([]);
  }

  const cached = (await redis.hgetall<Cache>(REDIS_KEY)) ?? {};

  const database = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
  });

  const { nextCache, updatedPageIds } = database.results.reduce(
    (res, page) => {
      if (!("properties" in page)) {
        return res;
      }

      const { id, last_edited_time } = page;
      const cachedLastEditedTime = cached[id];

      if (cachedLastEditedTime !== last_edited_time) {
        res.updatedPageIds.push(id);
      }

      res.nextCache[id] = last_edited_time;

      return res;
    },
    {
      nextCache: {},
      updatedPageIds: [],
    }
  );

  if (updatedPageIds.length > 0) {
    /**
     * 1. Newsroom 업데이트
     * 2. News 페이지 업데이트
     */
    await res.revalidate("/");

    await Promise.all(
      updatedPageIds.map((id) => res.revalidate(`/newsroom/${id}`))
    );

    await redis.hset(REDIS_KEY, nextCache);
  }

  res.json(updatedPageIds);
};

export default withSentry(handler);
