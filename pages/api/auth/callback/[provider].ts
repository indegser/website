import { NextApiResponse, NextApiRequest } from 'next'
import passport from '../../../../lib/withPassport'
import { serialize } from 'cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query
  if (!provider) {
    return { statusCode: 404 }
  }

  passport.initialize()(req, res, () => {
    passport.authenticate(provider, {
      session: false,
    })(req, res, (...args) => {
      res.setHeader('Set-Cookie', serialize('id', 123, { path: '/' }))
      res.writeHead(302, { location: '/' })
      res.end('ok')
    })
  })
}

export default handler