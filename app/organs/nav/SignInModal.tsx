import { CenterModal } from '../../atoms/modal/CenterModal'
import GoogleLogo from '../../atoms/icons/google-logo.svg'
import FacebookLogo from '../../atoms/icons/facebook-logo.svg'
import GithubLogo from '../../atoms/icons/github-logo.svg'
import SignInProvider from './SignInProvider'

const providers = {
  google: { logo: GoogleLogo, name: '구글' },
  facebook: { logo: FacebookLogo, name: '페이스북' },
  github: { logo: GithubLogo, name: '깃허브' },
}

const SignInModal = props => {
  const providerKeys = Object.keys(providers)

  return (
    <CenterModal {...props}>
      <header>
        <h1>일상을 잡지로 남기다</h1>
      </header>
      <div className="providers">
        <div className="provider-guide">
          <h5>소셜 로그인으로 참여하세요</h5>
          <p>
            매일 제가 읽는 글, 듣는 음악, 본 영상이 업데이트 됩니다. 소셜
            계정으로 댓글에 참여하시거나 좋아요를 눌러주세요.
          </p>
        </div>
        <div className="provider-list">
          {providerKeys.map(provider => (
            <SignInProvider
              key={provider}
              provider={provider}
              {...providers[provider]}
            />
          ))}
        </div>
      </div>
      <style jsx>
        {`
          header {
            margin: 30px;
            padding-bottom: 15px;
            margin-bottom: 15px;
            border-bottom: 1px solid var(--divider-color);

            h1 {
              font-weight: 900;
            }

            h4 {
              font-weight: 400;
            }
          }

          .providers {
            margin: 0 30px;

            h5 {
              font-size: 1rem;
            }

            p {
              font-size: 0.825rem;
              color: #555;
            }
          }

          .provider-guide {
            margin-bottom: 20px;
          }

          .provider-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 0 10px;
          }
        `}
      </style>
    </CenterModal>
  )
}

export default SignInModal
