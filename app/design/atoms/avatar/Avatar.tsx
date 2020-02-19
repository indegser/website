import styled, { css } from 'styled-components'
import { HTMLProps } from 'react'

enum AvatarVariant {
  small = 32,
  xl = 48,
}

interface IAvatarProps extends HTMLProps<HTMLImageElement> {
  variant?: keyof typeof AvatarVariant
}

const Avatar: React.FC<IAvatarProps> = styled.img`
  ${({ variant = 'small' }: IAvatarProps) => {
    const size = AvatarVariant[variant]
    return css`
      width: ${size}px;
      height: ${size}px;
    `
  }}
  border-radius: 999rem;
  display: block;
`

export default Avatar
