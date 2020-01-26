import axios from 'axios'

export const signIn = token =>
  axios.post('/api/sign-in', { token }, { withCredentials: true })
