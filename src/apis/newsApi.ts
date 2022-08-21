import { notion } from "@src/sdks/notion";
import { CDN_ORIGIN } from "@src/types/const.types";
import { environment } from "@src/types/env.types";
import { NewsDatabaseType } from "@src/types/news.types";
import { uploadImageToSupabase } from "@src/utils/image/uploadImageToSupabase";
import { getNotionFileUrl } from "@src/utils/notion";

const getNewsDatabase = async () => {
  const response = (await notion.databases.query({
    database_id: "0021f4b0494546a596716a7a5d9db452",
    sorts: [{ timestamp: "created_time", direction: "descending" }],
    filter: {
      or: [
        environment === "production" && {
          property: "status",
          select: {
            equals: "Production",
          },
        },
      ].filter(Boolean),
    },
  })) as NewsDatabaseType;

  const promises = response.results.map(async (page) => {
    const cover = getNotionFileUrl(page.cover);
    if (!cover || cover.includes(CDN_ORIGIN)) return;

    const response = await uploadImageToSupabase(cover, "cover");

    if (!response) return;

    await notion.pages.update({
      page_id: page.id,
      cover: {
        external: {
          url: response.publicURL,
        },
      },
    });
  });

  await Promise.all(promises);
  return response;
};

const getNews = (newsId: string) => {
  return notion.pages.retrieve({
    page_id: newsId,
  });
};

export const newsApi = {
  getNewsDatabase,
  getNews,
};
