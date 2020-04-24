import Avatar from 'design/atoms/avatar/Avatar'
import Flexbox from 'design/atoms/box/Flexbox'
import { SecondaryButton } from 'design/atoms/button/Button'
import Router from 'next/router'
import useSignIn from 'hooks/me/useSignIn'
import useWhoami from 'hooks/me/useWhoami'
import { ProfileAvatarButton } from './Profile.styled'
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
    <Flexbox>
      {user && (
        <div className={styles.actions}>
          <Route path="/b/[bookId]">
            <SecondaryButton onClick={handleWrite}>Write</SecondaryButton>
          </Route>
          <SecondaryButton onClick={handleNew}>New</SecondaryButton>
        </div>
      )}
      <div className={styles.profile}>
        <ProfileAvatarButton onClick={user ? undefined : handleAvatar}>
          <Avatar src={user?.avatar} />
        </ProfileAvatarButton>
      </div>
    </Flexbox>
  )
}

export default Profile
