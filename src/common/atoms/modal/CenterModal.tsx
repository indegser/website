import css from 'styled-jsx/css'
import { BaseModal } from './BaseModal'

const styles = css`
  @keyframes center-modal-appear {
    from {
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .modal {
    animation: 0.5s center-modal-appear ease forwards;
  }
`

export const CenterModal = props => <BaseModal styles={styles} {...props} />
