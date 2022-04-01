import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_KEY });

export const createNotionClient = (accessToken: string) =>
  new Client({ auth: accessToken });
