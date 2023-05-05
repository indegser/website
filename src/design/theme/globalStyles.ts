import { css } from '@emotion/react';

import { theme } from './stitches.config';

export const globalStyles = css`
  @import 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap';

  html {
    font-size: 16px;
    font-family: ${theme.fonts.sans.computedValue};
    text-size-adjust: 100%;
    background: ${theme.colors.gray1.computedValue};
  }

  body {
    margin: 0;
    color: ${theme.colors.gray12.computedValue};
    font-kerning: normal;
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
