import Axios from 'axios'

const signIn = password => {
  return Axios.post('/api/sign-in', { password })
}

const whoami = () => {}

const seoulApi = {
  signIn,
  whoami,
}

export default seoulApi
