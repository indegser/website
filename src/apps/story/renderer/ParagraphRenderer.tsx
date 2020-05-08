import styles from './Renderer.module.scss'

const ParagraphRenderer = props => {
  return <div className={styles.paragraph} {...props} />
}

export default ParagraphRenderer
