import { css } from '@emotion/react';

import { cssText, theme } from './theme';

export const globalStyles = css`
  :root {
    ${cssText};
  }

  html {
    background: ${theme.colors.bgBody.computedValue};
  }

  body {
    margin: 0;
    color: ${theme.colors.gray12.computedValue};
    font-size: 16px;
    font-family: ${theme.fonts.sans.computedValue};
    word-wrap: break-word;
    word-break: keep-all;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
  }

  a {
    text-decoration: none;
    font-family: ${theme.fonts.sans.computedValue};
    color: inherit;
  }

  :focus-visible {
    outline: none;
  }
`;
