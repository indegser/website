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
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.4,
        color: theme.colors.gray12,
        wordBreak: 'keep-all',

        [mq('sm')]: {
          fontSize: 18,
        },
      },
      tag: {
        color: theme.colors.gray11,
        fontSize: 12,
        lineHeight: 1,
        fontWeight: 700,
        [mq('sm')]: {
          fontWeight: 600,
        },
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
