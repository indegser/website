import { useState } from 'react'
import Avatar from 'atoms/avatar/Avatar'
import { ProfileName, ProfileRole } from './Profile.styled'
import Flexbox from 'atoms/box/Flexbox'
import Box from 'atoms/box/Box'

const Profile = () => {
  const currentUser = null
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Flexbox>
      <Box mr={2}>
        <ProfileName>Han Jaekwon</ProfileName>
        <ProfileRole>Admin</ProfileRole>
      </Box>
      <Box>
        <Avatar src="https://avatars3.githubusercontent.com/u/12758512?v=4&s=128" />
      </Box>
    </Flexbox>
  )
}

export default Profile
