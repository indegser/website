import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore/lite";

import {
  addDoc,
  setDoc,
  getDoc,
  collection,
  doc,
  getDocs,
  Timestamp,
} from "@firebase/firestore/lite";
import { StoryData } from "global";

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

export const firebaseApi = {
  getStory: async (id: string) => {
    const snapshot = await getDoc(doc(firestore, "news", id));
    return {
      id,
      ...snapshot.data(),
    } as StoryData;
  },
  createStory: ({ title, content }: { title: string; content: string }) => {
    return addDoc(collection(firestore, "news"), {
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
    return setDoc(doc(firestore, "news", id), {
      title,
      content,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  },
  getStories: async () => {
    const ref = collection(firestore, "news");
    const snapshot = await getDocs(ref);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, title: data.title ?? "" };
    });
  },
};
