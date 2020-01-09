import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "indegser-com.firebaseapp.com",
  databaseURL: "https://indegser-com.firebaseio.com",
  projectId: "indegser-com",
  storageBucket: "indegser-com.appspot.com",
  messagingSenderId: "638846793265",
  appId: "1:638846793265:web:4f7fd7faed17aa94b9c710",
  measurementId: "G-T87THQEECM"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged(function(user) {
  console.log(user)
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

export const signInWithGoogle = () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    firebase.auth().signInWithPopup(provider)
  } catch (err) {
    console.log(err)
  }
}