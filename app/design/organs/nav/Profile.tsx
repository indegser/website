import Avatar from 'design/atoms/avatar/Avatar'
import Flexbox from 'design/atoms/box/Flexbox'
import Box from 'design/atoms/box/Box'
import { SecondaryButton } from 'design/atoms/button/Button'
import Router from 'next/router'
import useSignIn from 'hooks/me/useSignIn'
import useWhoami from 'hooks/me/useWhoami'
import { ProfileAvatarButton } from './Profile.styled'

const Profile = () => {
  const { signIn } = useSignIn()
  const user = useWhoami()

  const handleNew = e => {
    e.stopPropagation()
    Router.push('/new')
  }

  const handleAvatar = () => {
    signIn()
  }

  return (
    <Flexbox>
      {user && (
        <Flexbox>
          <SecondaryButton onClick={handleNew}>New</SecondaryButton>
        </Flexbox>
      )}
      <Box pl={2} ml={2} borderLeft="1px solid #ddd">
        <ProfileAvatarButton onClick={user ? undefined : handleAvatar}>
          <Avatar src={user?.avatar} />
        </ProfileAvatarButton>
      </Box>
    </Flexbox>
  )
}

export default Profile
