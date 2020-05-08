import styles from './Renderer.module.scss'

const ImageRenderer = ({ alt, src }) => {
  return (
    <figure className={styles.image}>
      <img src={src} alt={alt} />
      <figcaption>{alt}</figcaption>
    </figure>
  )
}

export default ImageRenderer
