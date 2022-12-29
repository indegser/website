import { BlockType } from "@src/types/notion";

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

// export const getMetaFromNotionPage = (
//   page: NewsPageType,
//   blocks: BlockType[]
// ): ContentMetaType => {
//   const {
//     id,
//     cover,
//     properties: { title, excerpt },
//   } = page;

//   const image =
//     getNotionFileUrl(cover) || getCoverImageFromBlocks(blocks) || "";

//   return {
//     id,
//     title: getNotionTitle(title),
//     description: excerpt?.rich_text[0]?.plain_text ?? "",
//     image,
//     lastEditedTime: page.last_edited_time,
//   };
// };
