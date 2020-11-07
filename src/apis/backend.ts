import backend from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (backend.apps.length === 0) {
  const { NEXT_PUBLIC_FIREBASE_CONFIG } = process.env;
  const config = JSON.parse(NEXT_PUBLIC_FIREBASE_CONFIG);
  backend.initializeApp(config);
}

export default backend;
