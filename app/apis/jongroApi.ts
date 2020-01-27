import axios from 'axios'

const urls = {
  'seoul-edge': 'https://jongro-edge.now.sh',
  seoul: 'https://jongro.now.sh',
}

const BASE_URL = urls[process.env.NOW_NAME] || 'http://localhost:3031'

const signIn = token =>
  axios.post(BASE_URL + '/api/sign-in', { token }, { withCredentials: true })

const signOut = () =>
  axios.post(BASE_URL + '/api/sign-out', null, {
    withCredentials: true,
  })

const me = async req => {
  const headers = req ? { cookie: req.headers.cookie } : {}

  return axios.get(BASE_URL + '/api/me', {
    withCredentials: true,
    headers,
  })
}

const jongroApi = {
  signIn,
  signOut,
  me,
}

export default jongroApi
