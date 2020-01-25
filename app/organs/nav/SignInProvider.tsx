import { RectButton } from '../../atoms/button/RectButton'

const SignInProvider = ({ provider, Logo }) => {
  return (
    <RectButton>
      <div className="container">
        <Logo width={22} height={22} />
        <div className="name">{provider}</div>
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
