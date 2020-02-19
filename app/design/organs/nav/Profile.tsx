import Avatar from 'design/atoms/avatar/Avatar'
import { ProfileName, ProfileRole } from './Profile.styled'
import Flexbox from 'design/atoms/box/Flexbox'
import Box from 'design/atoms/box/Box'
import { PrimaryButton } from 'design/atoms/button/Button'
import Router, { useRouter } from 'next/router'
import Route from 'hocs/Route'

const Profile = () => {
  const handleNew = e => {
    e.stopPropagation()
    Router.push('/new')
  }

  return (
    <Flexbox>
      <Box mr={2}>
        <ProfileName>Indegser</ProfileName>
        <ProfileRole>Admin</ProfileRole>
      </Box>
      <Box>
        <Route path="/new">
          <PrimaryButton onClick={handleNew}>Publish</PrimaryButton>
        </Route>
        <PrimaryButton onClick={handleNew}>New</PrimaryButton>
      </Box>
      <Box pl={2} ml={2} borderLeft="1px solid #ddd">
        <Avatar src="https://avatars3.githubusercontent.com/u/12758512?v=4&s=128" />
      </Box>
    </Flexbox>
  )
}

export default Profile
