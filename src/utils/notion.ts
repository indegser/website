import { FilesPropertyType, TitlePropertyType } from "@src/types/notion.types";

export const getNotionFileUrl = (filesProperty: FilesPropertyType) => {
  for (const file of filesProperty.files) {
    if (file.type === "file") {
      return file.file.url;
    }

    return file.external.url;
  }
};

export const getNotionTitle = (titleProperty: TitlePropertyType) => {
  return titleProperty.title.map((text) => text.plain_text).join("");
};
