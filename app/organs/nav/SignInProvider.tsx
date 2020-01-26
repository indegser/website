import { RectButton } from '../../atoms/button/RectButton'
import { signInWithFirebase } from '../../apis/firebase'

const SignInProvider = ({ provider, logo: Logo, name }) => {
  const handleClick = () => {
    localStorage.setItem('signing-in', 'google')
    signInWithFirebase(provider)
  }

  return (
    <RectButton onClick={handleClick}>
      <div className="container">
        <Logo width={22} height={22} />
        <div className="name">{name}</div>
      </div>
      <style jsx>
        {`
          .container {
          }
          .name {
            color: #555;
            margin-top: 2px;
            font-size: 12px;
          }
        `}
      </style>
    </RectButton>
  )
}

export default SignInProvider
