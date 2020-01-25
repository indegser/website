import { SmallAvatar } from '../../atoms/avatar/SmallAvatar'
import SignInModal from './SignInModal'
import { useState } from 'react'

const Profile = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <SmallAvatar src="http://images.sportskhan.net/article/2019/11/13/l_2019111302000562500114951.jpg" />
      </div>
      <SignInModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Profile
