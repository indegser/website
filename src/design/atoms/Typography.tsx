import { styled } from '@stitches/react';

import { mq } from '@src/design/theme/mediaQueries';
import { theme } from '@src/design/theme/stitches.config';

export const Typography = styled('div', {
  fontSize: 14,
  lineHeight: 1.4,
  wordBreak: 'keep-all',

  variants: {
    type: {
      title: {
        margin: 0,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.3,
        color: theme.colors.gray12,
        wordBreak: 'keep-all',
      },
      tag: {
        color: theme.colors.gray11,
        fontSize: 13,
        lineHeight: 1,
      },
      description: {
        // color: theme.colors.gray11,
        [mq('sm')]: {
          fontSize: 16,
        },
      },
    },
  },
});
