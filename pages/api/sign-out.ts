import cookie from 'cookie'
import { NextApiResponse } from 'next'

export default async (req, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', ''))
  res.end()
}
