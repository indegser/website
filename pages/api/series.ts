import { NextApiRequest, NextApiResponse } from "next";

import { seriesApi } from "@src/apis/seriesApi";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await seriesApi.getSeriesList();
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

export default handler;
