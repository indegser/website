import styled from 'styled-components'
import BaseImage from './BaseImage'

interface IProps extends React.HTMLProps<HTMLImageElement> {}

const CircleImage: React.FC<IProps> = styled(BaseImage)`
  border-radius: 999rem;
  object-fit: cover;
  object-position: center;
`

export default CircleImage
