import { fbadmin } from '../../lib/admin/firebase'
import cookie from 'cookie'
import { NextApiResponse } from 'next'

export default async (req, res: NextApiResponse) => {
  const { token } = req.body
  await fbadmin.auth().verifyIdToken(token)

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      path: '/',
      maxAge: 360000,
      httpOnly: true,
    })
  )
  res.json({ token })
}
