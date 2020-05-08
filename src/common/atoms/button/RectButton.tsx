import { BaseButton } from './BaseButton'
import css from 'styled-jsx/css'

const styles = css`
  button {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: 0.2s background-color ease;
  }
`

export const RectButton = props => <BaseButton styles={styles} {...props} />
