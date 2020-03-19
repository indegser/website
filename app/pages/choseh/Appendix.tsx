import styles from './Appendix.module.scss'

const Appendix = () => {
  return (
    <div id="appendix" className={styles.box}>
      <div className={styles.appendix_title}>Footnote</div>
      <div id="footnotes"></div>
    </div>
  )
}

export default Appendix
