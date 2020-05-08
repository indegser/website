import styled from '@emotion/styled'

enum AvatarVariant {
  small = 32,
  xl = 48,
}

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 999rem;
  display: block;
`

interface Props extends React.ComponentProps<typeof AvatarImg> {
  variant?: keyof typeof AvatarVariant
}

const AvatarBox = styled.div`
  border-radius: 999rem;
  overflow: hidden;
  background: #e0e0e0;
`

const Avatar: React.FC<Props> = ({ variant = 'small', ...props }) => {
  const size = AvatarVariant[variant]

  return (
    <AvatarBox
      style={{
        width: size,
        height: size,
      }}
    >
      {props.src && <AvatarImg {...props} />}
    </AvatarBox>
  )
}

export default Avatar
