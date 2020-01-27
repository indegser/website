import { NextApiResponse, NextApiRequest } from 'next'
import { fbadmin } from '../../lib/admin/firebase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies

  let currentUser = null
  if (token) {
    try {
      const decoded = await fbadmin.auth().verifyIdToken(token)

      currentUser = {
        uid: decoded.uid,
        name: decoded.name,
        picture: decoded.picture,
        email: decoded.email,
      }
    } catch (err) {
      console.log(err)
    }
  }

  res.json({ currentUser })
}
