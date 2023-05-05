import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from '../theme/stitches.config';

export const Typography = styled.div<{ type: 'title' | 'tag' | 'description' }>`
  font-size: 14px;
  line-height: 1.4;
  word-break: keep-all;

  ${({ type }) =>
    type === 'title' &&
    css`
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.3;
      word-break: keep-all;
      color: ${theme.colors.gray12.computedValue};
    `}
  ${({ type }) =>
    type === 'tag' &&
    css`
      color: ${theme.colors.gray11.computedValue};
      font-size: 13px;
      line-height: 1;
    `}
`;
