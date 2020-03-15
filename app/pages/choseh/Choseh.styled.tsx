import styled from 'styled-components'
import { mediaQuery } from 'design/theme'

export const ChosehBox = styled.div`
  max-width: 572px;
  margin: 0 auto;
`

export const ChosehHeader = styled.div`
  padding: 80px 0;

  ${mediaQuery.lessThan('small')`
    padding: 60px 0;
  `}
`

export const ChosehTitle = styled.div`
  color: #111;
  font-size: 48px;
  line-height: 1;
  font-weight: bold;
  margin: 0;

  ${mediaQuery.lessThan('small')`
    font-size: 40px;
    letter-spacing: .006em;
    line-height: 1;
  `}
`

export const ChosehContent = styled.div`
  padding-top: 40px;
  text-align: left;

  font-size: 17px;
  line-height: 1.67;
  color: black;
  word-break: break-all;
  text-align: justify;

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
    color: var(--link-color);
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
