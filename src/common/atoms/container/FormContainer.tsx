import styles from './style.module.scss'

const FormContainer = ({ children }) => {
  return <div className={styles.form}>{children}</div>
}

export default FormContainer
