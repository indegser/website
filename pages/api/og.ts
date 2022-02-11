import type { NextApiRequest, NextApiResponse } from "next";
import { unfurl } from "unfurl.js";

type Data = {
  title: string;
  description: string;
  favicon: string;
  imageUrl: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const url = req.query.url.toString();
  const {
    title,
    description,
    favicon,
    open_graph: {
      images: [{ url: imageUrl }],
    },
  } = await unfurl(url);
  res.status(200).json({ title, description, favicon, imageUrl });
};

export default handler;
