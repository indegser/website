import { getNotionFileUrl, getNotionTitle } from "../notion";

import { BookType } from "@src/types/book.types";
import { ContentMetaType } from "@src/types/content.types";
import { BlockType, NewsType } from "@src/types/notion.types";

const getCoverImageFromBlocks = (blocks: BlockType[]) => {
  const image = blocks.find(
    (block): block is Extract<BlockType, { type: "image" }> =>
      block.type === "image"
  );

  let imageUrl: string;

  if (image) {
    if (image.image["type"] === "file") {
      imageUrl = image.image.file.url;
    } else {
      imageUrl = image.image.external.url;
    }
  }

  return imageUrl;
};

export const getMetaFromNotionPage = (
  page: BookType | NewsType,
  blocks: BlockType[]
): ContentMetaType => {
  const { id, properties } = page;
  const title = getNotionTitle(properties.title);
  const image =
    getNotionFileUrl(properties.cover) || getCoverImageFromBlocks(blocks) || "";

  return {
    id,
    title,
    image,
    lastEditedTime: page.last_edited_time,
  };
};
