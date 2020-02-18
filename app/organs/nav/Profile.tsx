import Avatar from 'atoms/avatar/Avatar'
import { ProfileName, ProfileRole } from './Profile.styled'
import Flexbox from 'atoms/box/Flexbox'
import Box from 'atoms/box/Box'
import { PrimaryButton } from 'atoms/button/Button'

const Profile = () => {
  return (
    <Flexbox>
      <Box mr={2}>
        <ProfileName>Indegser</ProfileName>
        <ProfileRole>Admin</ProfileRole>
      </Box>
      <Box>
        <PrimaryButton>New</PrimaryButton>
      </Box>
      <Box pl={2} ml={2} borderLeft="1px solid #ddd">
        <Avatar src="https://avatars3.githubusercontent.com/u/12758512?v=4&s=128" />
      </Box>
    </Flexbox>
  )
}

export default Profile
