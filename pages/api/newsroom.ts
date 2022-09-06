import { NextApiRequest, NextApiResponse } from "next";

import { newsApi } from "@src/apis/newsApi";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { series } = req.query;

  const json = await newsApi.getNewsDatabase({ series: series?.toString() });
  res.json(json);
}

export default handler;
