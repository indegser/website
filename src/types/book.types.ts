import {
  DatabasePageType,
  DatabaseResponseType,
  FilesPropertyType,
  TitlePropertyType,
} from "./notion.types";

export type BookType = Omit<DatabasePageType, "properties"> & {
  properties: {
    Name: TitlePropertyType;
    Cover: FilesPropertyType;
  };
};

export type BookDatabaseType = Omit<DatabaseResponseType, "results"> & {
  results: BookType[];
};
