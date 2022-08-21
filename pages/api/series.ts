import { NextApiRequest, NextApiResponse } from "next";

import { seriesApi } from "@src/apis/seriesApi";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await seriesApi.getSeriesDatabase();

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}

export default handler;
