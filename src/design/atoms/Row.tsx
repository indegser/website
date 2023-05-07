import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ComponentProps, PropsWithChildren } from 'react';

import { mediaQueries, mq } from '@src/design/mediaQueries';
import { theme } from '@src/design/theme';

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

const Container = styled(motion.div)`
  display: flex;
  padding: 4px 6px;
  border-radius: 3px;
  justify-content: space-between;
  transition: 0.2s background-color ease;
  cursor: pointer;
  min-height: 32px;
  box-sizing: border-box;

  ${mq('sm')} {
    padding: 4px 0;
    display: block;
  }

  ${mediaQueries.hoverable} {
    &:hover {
      background: ${theme.colors.gray3.computedValue};
    }
  }
`;
