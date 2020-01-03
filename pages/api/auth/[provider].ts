import { NextApiResponse, NextApiRequest } from 'next'
import passport from '../../../lib/withPassport'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    HELLO: process.env.hello,
  })
  // const { provider } = req.query
  // if (!provider) {
  //   return { statusCode: 404 }
  // }

  // passport.authenticate(provider)(req, res, (...args) => {
  //   console.log('passport authenticated', args)
  // })
}

export default handler