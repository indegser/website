import useSignIn from 'common/hooks/me/useSignIn'
import Router from 'next/router'

export const useProfileActions = (user: object) => {
  const { signIn } = useSignIn()
  const goWrite = () => {
    Router.push('/story/[...slug]', Router.asPath + '?edit=true')
  }

  const goNew = () => {
    Router.push('/new-story')
  }

  return {
    signIn: user && signIn,
    goWrite,
    goNew,
  }
}
