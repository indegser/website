type DocumentType = {
  _id: string;
};

export type BookType = DocumentType & {
  title: string;
  posterUrl: string;
};
