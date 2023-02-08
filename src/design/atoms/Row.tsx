import { motion } from 'framer-motion';
import { ComponentProps, PropsWithChildren } from 'react';

import { mediaQueries, mq } from '@src/design/theme/mediaQueries';
import { styled, theme } from '@src/design/theme/stitches.config';

interface Props extends ComponentProps<typeof Container> {}

export const Row = (props: PropsWithChildren<Props>) => {
  return (
    <Container
      whileTap={{ opacity: 0.4 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
};

const Container = styled(motion.div, {
  display: 'flex',
  padding: '4px 6px',
  borderRadius: 3,
  justifyContent: 'space-between',
  transition: '0.2s background-color ease',
  cursor: 'pointer',
  minHeight: 32,
  boxSizing: 'border-box',
  [mediaQueries.hoverable]: {
    ['&:hover']: {
      background: theme.colors.gray3,
    },
  },

  [mq('sm')]: {
    padding: '4px 0',
    display: 'block',
  },
});
