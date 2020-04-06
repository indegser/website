import { useTokenStore } from 'stores/tokenStore'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const AUTHENTICATE = gql`
  mutation authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      jwtToken
    }
  }
`

const useSignIn = () => {
  const setToken = useTokenStore((s) => s.setToken)
  const [authenticate] = useMutation(AUTHENTICATE, {
    onCompleted: ({ authenticate }) => {
      setToken(authenticate.jwtToken)
    },
  })

  const signIn = () => {
    const password = prompt('Enter admin password')
    if (!password) return

    authenticate({
      variables: {
        input: {
          email: 'indegser@gmail.com',
          password,
        },
      },
    })
  }

  return {
    signIn,
  }
}

export default useSignIn
