import { NextApiResponse, NextApiRequest } from 'next'
import passport from '../../../lib/withPassport'

const presets = {
  google: { scope: ['https://www.googleapis.com/auth/plus.login'] },
  facebook: { scope: ['email', 'public_profile'] }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query
  if (!provider) {
    return { statusCode: 404 }
  }

  passport.authenticate(provider, presets[provider as string])(req, res)
}

export default handler