import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.body
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).end()
    return
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET)

  res.json({
    token,
  })
}
