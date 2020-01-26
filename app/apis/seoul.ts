import axios from 'axios'

const signIn = token =>
  axios.post('/api/sign-in', { token }, { withCredentials: true })

export const getMe = async req => {
  let headers = {}
  let base = ''
  if (!process.browser) {
    headers = req.headers // put headers on server-side
    base =
      (process.env.NODE_ENV === 'development' ? 'http://' : 'https://') +
      req.headers.host
  }

  const res = await axios.get(`${base}/api/me`, {
    withCredentials: true,
    headers,
  })

  return res.data.currentUser
}

const seoulApi = {
  signIn,
  signOut: () =>
    axios.post('/api/sign-out', null, {
      withCredentials: true,
    }),
}

export default seoulApi
