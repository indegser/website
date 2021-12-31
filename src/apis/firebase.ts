import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore/lite";

import {
  addDoc,
  setDoc,
  getDoc,
  collection,
  doc,
  limit,
  query,
  getDocs,
  startAfter,
  orderBy,
  Timestamp,
} from "@firebase/firestore/lite";
import { StoryData } from "global";
import { environment } from "types/env.types";
import { StoryDocumentData, StoryType } from "types/story.types";
import dayjs from "dayjs";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "indegser-fc8e4.firebaseapp.com",
  databaseURL: "https://indegser-fc8e4.firebaseio.com",
  projectId: "indegser-fc8e4",
  storageBucket: "indegser-fc8e4.appspot.com",
  messagingSenderId: "297947110323",
  appId: "1:297947110323:web:d1229045a89260dce409c6",
};

initializeApp(firebaseConfig);

export const firestore = getFirestore();

const newsCollection = `news-${environment}`;

export const firebaseApi = {
  getStory: async (id: string) => {
    const snapshot = await getDoc(doc(firestore, newsCollection, id));
    return {
      id,
      ...snapshot.data(),
    } as StoryData;
  },
  createStory: ({ title, content }: { title: string; content: string }) => {
    return addDoc(collection(firestore, newsCollection), {
      title,
      content,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
  },
  updateStory: (
    id: string,
    { title, content }: { title: string; content: string }
  ) => {
    return setDoc(
      doc(firestore, newsCollection, id),
      {
        title,
        content,
        updatedAt: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    );
  },
  getStories: async (cursor = "", limitCount = 20) => {
    const ref = collection(firestore, newsCollection);
    const queryArgs = [
      orderBy("createdAt", "desc"),
      cursor ? startAfter(Timestamp.fromDate(new Date(cursor))) : null,
      limit(limitCount),
    ].filter(Boolean);

    const getStoriesQuery = query(ref, ...queryArgs);
    const snapshot = await getDocs<StoryDocumentData>(getStoriesQuery);
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title ?? "",
        createdAt: dayjs(data.createdAt?.toDate()).toISOString(),
        updatedAt: dayjs(data.updatedAt?.toDate()).toISOString(),
      } as StoryType;
    });
  },
};
