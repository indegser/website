import styled from 'styled-components'
import BaseImage from './BaseImage'

interface Props extends React.HTMLProps<HTMLImageElement> {}

const Styled = styled(BaseImage)`
  border-radius: 999rem;
  object-fit: cover;
  object-position: center;
`

const Placeholder = styled.div`
  background: #eee;
  border-radius: 999rem;
`

const CircleImage: React.FC<Props> = props => {
  return props.src ? <Styled {...props} /> : <Placeholder {...props} />
}

export default CircleImage
