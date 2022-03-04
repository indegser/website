import { initializeApp } from "firebase/app";

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
