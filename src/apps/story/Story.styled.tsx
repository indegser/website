import styled from '@emotion/styled'
import { mediaQuery, mq } from 'design/theme'

const Container = styled('div')`
  max-width: 680px;
  margin: 0 auto;
`

const Header = styled('div')`
  padding: 80px 0 20px 0;

  ${mq('sm')} {
    padding: 60px 0 20px 0;
  }
`

const Title = styled('div')`
  color: #111;
  font-size: 44px;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -1px;
  margin: 0;
  font-family: var(--font-serif);
  word-break: keep-all;

  ${mq('sm')} {
    font-size: 40px;
    letter-spacing: -0.6px;
  }
`

export const Content = styled('div')`
  text-align: left;

  font-size: 17px;
  line-height: 1.67;
  color: black;
  word-break: break-all;
  text-align: justify;
  padding: 24px 0;

  html[lang='en'] & {
    word-break: break-word;
    text-align: left;
    letter-spacing: 0.02px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #111;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.009em;
    margin: 37px auto 20px;
  }

  h1 {
    font-size: 1.7rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  ${mediaQuery.lessThan('small')`
    font-size: 16px;
    line-height: 1.67;
  `}

  .windows & {
    line-height: 1.67;
    letter-spacing: -0.001em;
  }

  strong {
    font-weight: 600;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
  }

  a {
    color: var(--textLinkColor);
    padding: 0 2px;
    text-decoration: none;

    .mobile & {
      text-decoration: underline !important;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  sup {
    line-height: 1;
    padding: 0 2px;
    font-size: 80%;
  }

  p {
  }
`

const styles = {
  Container,
  Header,
  Title,
  Content,
}

export default styles
