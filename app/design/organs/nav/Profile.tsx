import Avatar from 'design/atoms/avatar/Avatar'
import { SecondaryButton } from 'design/atoms/button/Button'
import Router from 'next/router'
import useSignIn from 'hooks/me/useSignIn'
import useWhoami from 'hooks/me/useWhoami'
import styles from './profile.module.scss'
import Route from 'hocs/Route'

const Profile = () => {
  const { signIn } = useSignIn()
  const user = useWhoami()

  const handleNew = (e) => {
    e.stopPropagation()
    Router.push('/new-story')
  }

  const handleWrite = (e) => {
    // Router.path
    e.stopPropagation()
    Router.push('/b/[bookId]/write', Router.asPath + '/write')
  }

  const handleAvatar = () => {
    signIn()
  }

  return (
    <div className={styles.box}>
      {user && (
        <div className={styles.actions}>
          <Route path="/b/[bookId]">
            <SecondaryButton onClick={handleWrite}>Write</SecondaryButton>
          </Route>
          <SecondaryButton onClick={handleNew}>New</SecondaryButton>
        </div>
      )}
      <div className={styles.profile}>
        <div
          className={styles.avatar}
          onClick={user ? undefined : handleAvatar}
        >
          <Avatar src={user?.avatar} />
        </div>
      </div>
    </div>
  )
}

export default Profile
