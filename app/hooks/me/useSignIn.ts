import { useTokenStore } from 'stores/tokenStore'
import sejongApi from 'apis/sejongApi'

const useSignIn = () => {
  const setToken = useTokenStore((s) => s.setToken)

  const signIn = async () => {
    const password = prompt('Enter admin password')
    if (!password) return

    const data = {
      email: 'indegser@gmail.com',
      password,
    }

    sejongApi
      .authenticate(data)
      .then((token) => {
        localStorage.setItem('jwtToken', token)
        setToken(token)
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      })
  }

  return {
    signIn,
  }
}

export default useSignIn
