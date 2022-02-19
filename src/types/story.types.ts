import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "@firebase/firestore/lite";

export type StoryType = {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  content: string;
};

export interface StoryDocumentData extends DocumentData {
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const storyConverter = {
  fromFirestore: (snapshot: QueryDocumentSnapshot<StoryDocumentData>) => {
    const { createdAt, updatedAt, ...data } = snapshot.data();

    return {
      id: snapshot.id,
      ...data,
      createdAt: createdAt.toDate().toISOString(),
      updatedAt: updatedAt.toDate().toISOString(),
    };
  },
  toFirestore: (data) => {
    return data;
  },
};
