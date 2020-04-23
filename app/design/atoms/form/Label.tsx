import { FC, HTMLProps } from 'react'
import styles from './label.module.scss'

interface Props extends HTMLProps<HTMLLabelElement> {
  required?: boolean
  label: string
}

const Label: FC<Props> = ({ label, required, ...props }) => {
  return (
    <div className={styles.container}>
      <label {...props}>
        <span>{label}</span>
        {!required && <span className={styles.optional}>(선택사항)</span>}
      </label>
    </div>
  )
}

export default Label
