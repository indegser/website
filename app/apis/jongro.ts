import axios from 'axios'

const urls = {
  'seoul-edge': 'https://jongro-edge.indegser.com',
  seoul: 'https://jongro.indegser.com',
}

const BASE_URL = urls[process.env.NOW_NAME] || 'http://localhost:3031'

export const getUser = uid => {
  return axios.get(BASE_URL + `/api/user/${uid}`)
}

export const signIn = data => {
  return axios.post(BASE_URL + '/api/sign-in', data)
}
