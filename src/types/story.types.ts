import { DocumentData, Timestamp } from "@firebase/firestore/lite";

export type StoryType = {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
};

export interface StoryDocumentData extends DocumentData {
  title?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
