import { SmallAvatar } from '../../atoms/avatar/SmallAvatar'
import SignInModal from './SignInModal'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const currentUser = useSelector((s: AppState) => s.currentUser)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <SmallAvatar src={currentUser && currentUser.picture} />
      </div>
      {!currentUser && (
        <SignInModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}

export default Profile
