import { getNotionFileUrl, getNotionTitle } from "../notion";

import { BookType } from "@src/types/book.types";
import { ContentMetaType } from "@src/types/content.types";

export const getMetaFromNotionPage = (page: BookType): ContentMetaType => {
  const { properties } = page;
  const title = getNotionTitle(properties.Name);
  const image = getNotionFileUrl(properties.Cover);

  return {
    title,
    image,
    lastEditedTime: page.last_edited_time,
  };
};
