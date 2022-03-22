import { BlockType, NewsType } from "@src/types/notion.types";

export const useNewsSeo = (news: NewsType, blocks: BlockType[]) => {
  const { title, excerpt } = news.properties;
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

  return {
    title: title.title[0]?.plain_text,
    excerpt: excerpt.rich_text[0]?.plain_text,
    imageUrl,
  };
};
