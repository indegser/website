import { PortableTextBlock } from "@sanity/types";

type DocumentType = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
};

export type BookType = DocumentType & {
  title: string;
  posterUrl: string;
  journalCount: number;
};

export type JournalType = DocumentType & {
  title: string;
  book: BookType;
  url?: string;
  quote?: {
    book: BookType;
    page?: number;
  };
  content: Array<PortableTextBlock>;
};
