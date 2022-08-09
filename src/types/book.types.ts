import {
  DatabasePageType,
  DatabaseResponseType,
  FilesPropertyType,
  TitlePropertyType,
} from "./notion.types";

export type BookType = Omit<DatabasePageType, "properties"> & {
  properties: {
    title: TitlePropertyType;
    cover: FilesPropertyType;
  };
};

export type BookDatabaseType = Omit<DatabaseResponseType, "results"> & {
  results: BookType[];
};
