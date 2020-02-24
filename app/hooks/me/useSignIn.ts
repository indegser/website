import seoulApi from 'apis/seoulApi'
import { useTokenStore } from 'stores/tokenStore'

const useSignIn = () => {
  const setToken = useTokenStore(s => s.setToken)

  const signIn = () => {
    const password = prompt('Enter admin password')
    if (!password) return

    seoulApi
      .signIn(password)
      .then(({ data }) => {
        const { token } = data
        setToken(token)
      })
      .catch(err => {
        alert('Wrong password!')
      })
  }

  return {
    signIn,
  }
}

export default useSignIn
