import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

import { NOTION_CLIENT_ID } from "@src/types/const.types";

const TOKEN = Buffer.from(
  `${NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
).toString("base64");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, error } = req.query;

  if (error) {
    res.redirect("/");
    return;
  }

  const result = await fetch(`https://api.notion.com/v1/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/api/notion/callback",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  });

  res.redirect("/");
};

export default withSentry(handler);
