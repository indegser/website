import { PortableTextBlock } from "@sanity/types";

type DocumentType = {
  _id: string;
};

export type BookType = DocumentType & {
  title: string;
  posterUrl: string;
};

export type JournalType = DocumentType & {
  title: string;
  content: Array<PortableTextBlock>;
};
