import Avatar from 'design/atoms/avatar/Avatar'
import Flexbox from 'design/atoms/box/Flexbox'
import Box from 'design/atoms/box/Box'
import { PrimaryButton, SecondaryButton } from 'design/atoms/button/Button'
import Router from 'next/router'
import Route from 'hocs/Route'
import useCreateHistory from 'hooks/forms/useCreateHistory'
import useSignIn from 'hooks/me/useSignIn'
import useWhoami from 'hooks/me/useWhoami'

const Profile = () => {
  const { submit } = useCreateHistory()
  const { signIn } = useSignIn()
  const user = useWhoami()

  const handleNew = e => {
    e.stopPropagation()
    Router.push('/new')
  }

  const handlePublish = e => {
    e.stopPropagation()
    submit()
  }

  const handleAvatar = () => {
    signIn()
  }

  return (
    <Flexbox>
      {user && (
        <Flexbox>
          <Route path="/new">
            <PrimaryButton onClick={handlePublish}>Publish</PrimaryButton>
          </Route>
          <Box ml={2} />
          <SecondaryButton onClick={handleNew}>New</SecondaryButton>
        </Flexbox>
      )}
      <Box pl={2} ml={2} borderLeft="1px solid #ddd">
        <Avatar onClick={user ? undefined : handleAvatar} src={user?.avatar} />
      </Box>
    </Flexbox>
  )
}

export default Profile
