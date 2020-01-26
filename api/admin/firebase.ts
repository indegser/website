import * as admin from 'firebase-admin'
const json = require('../../secrets/firebase-admin-account.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(json),
    databaseURL: 'https://indegsercom.firebaseio.com',
  })
}

export const fbadmin = admin
