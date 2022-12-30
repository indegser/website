import { notion } from "@src/sdks/notion";
import { BlockType, CoverType, PropertyType } from "@src/types/notion";

const toString = (property: PropertyType<"formula">) => {
  switch (property.formula.type) {
    case "string":
      return property.formula.string;
    default:
      return "";
  }
};

export const notionUtils = {
  toString,
};

export const getNotionFileUrl = (
  coverOrFiles?: PropertyType<"files"> | CoverType
) => {
  if (!coverOrFiles) return null;

  if ("files" in coverOrFiles) {
    for (const file of coverOrFiles.files) {
      if (file.type === "file") {
        return file.file.url;
      }

      return file.external.url;
    }
  } else {
    if (coverOrFiles.type === "file") {
      return coverOrFiles.file.url;
    }

    return coverOrFiles.external.url;
  }
};

export const getNotionTitle = (
  titleProperty: Partial<PropertyType<"title">>
) => {
  return titleProperty.title.map((text) => text.plain_text).join("");
};

export const getNotionContent = async (blockId: string) => {
  const getBlocksWithChildren = async (blocks: BlockType[]) => {
    return await Promise.all(
      blocks.map(async (block) => {
        return await getBlockWithChildren(block);
      })
    );
  };
  const getBlockWithChildren = async (block: BlockType) => {
    if (block.has_children === true) {
      const result = await notion.blocks.children.list({
        block_id: block.id,
        page_size: 100,
      });

      /**
       * @todo has_more 체크
       */

      block["children"] = await getBlocksWithChildren(
        result.results as BlockType[]
      );
    }

    return block;
  };

  const children = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  return getBlocksWithChildren(children.results as BlockType[]);
};
