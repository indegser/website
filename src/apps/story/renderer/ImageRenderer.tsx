import styled from '@emotion/styled'

const Image = styled.figure`
  display: block;
  width: 100%;
  margin: 0;
  margin: 3em 0;

  img {
    max-width: 100%;
    max-height: 600px;
    display: block;
    height: auto;
    margin: 0 auto;
  }

  figcaption {
    display: block;
    padding-top: 12px !important;
    font-size: 13px;
    width: var(--content-width);
    margin: 0 auto;
    color: #444;
    letter-spacing: 0.03px;
  }
`

const ImageRenderer = ({ alt, src }) => {
  return (
    <Image>
      <img src={src} alt={alt} />
      <figcaption>{alt}</figcaption>
    </Image>
  )
}

export default ImageRenderer
