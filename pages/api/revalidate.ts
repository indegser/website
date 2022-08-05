import { flush, withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, newsId } = req.query;

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.API_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    await res.revalidate(`/newsroom/${newsId}`);
    await flush(2000);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}

export default withSentry(handler);
