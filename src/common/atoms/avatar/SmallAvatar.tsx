import { BaseAvatar } from './BaseAvatar'
import css from 'styled-jsx/css'

const styles = css`
  .avatar {
    --avatar-size: 36px;
  }
`

export const SmallAvatar = props => <BaseAvatar {...props} styles={styles} />
