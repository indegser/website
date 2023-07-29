import { NextApiRequest, NextApiResponse } from 'next';

import { syncApi } from '@src/utils/sync';

const handler = async (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const updated = await syncApi.syncLatest();
  res.json(updated);
};

export default handler;
