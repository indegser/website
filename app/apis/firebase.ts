import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import Router from 'next/router'
import seoulApi from './seoul'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'indegsercom.firebaseapp.com',
  databaseURL: 'https://indegsercom.firebaseio.com',
  projectId: 'indegsercom',
  storageBucket: 'indegsercom.appspot.com',
  messagingSenderId: '931677154869',
  appId: '1:931677154869:web:9b230feab30e4aaa8bcb7c',
  measurementId: 'G-6DFL2N2HEV',
}
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)

  if (process.browser) {
    firebase.analytics()
  }
}

export const signInWithFirebase = providerName => {
  let provider
  switch (providerName) {
    case 'google': {
      provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      provider.setCustomParameters({ prompt: 'select_account' })
      break
    }
    case 'facebook': {
      provider = new firebase.auth.FacebookAuthProvider()
      break
    }
    case 'github': {
      provider = new firebase.auth.GithubAuthProvider()
      break
    }
    default: {
      throw new Error('No provider')
    }
  }

  return firebase.auth().signInWithRedirect(provider)
}

export const getRedirectResult = async () => {
  await firebase.auth().getRedirectResult()
  if (firebase.auth().currentUser) {
    const token = await firebase.auth().currentUser.getIdToken(true)

    await seoulApi.signIn(token)
    localStorage.removeItem('signing-in')
    Router.reload()
  }
}

export const signOut = async () => {
  return Promise.all([firebase.auth().signOut(), seoulApi.signOut()])
}
