import { PortableTextBlock } from "@sanity/types";

type DocumentType = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
};

export type BookType = DocumentType & {
  title: string;
  posterUrl: string;
};

export type JournalType = DocumentType & {
  title: string;
  book: BookType;
  content: Array<PortableTextBlock>;
};
