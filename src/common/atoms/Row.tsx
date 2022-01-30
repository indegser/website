import styled from "@emotion/styled";
import { mediaQueries, mq } from "common/theme";
import { motion } from "framer-motion";
import { ComponentProps, PropsWithChildren } from "react";
import { colors } from "types/style.types";

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

  ${mediaQueries.hoverable} {
    &:hover {
      background: ${colors.gray60};
    }
  }

  ${mq("sm")} {
    display: block;
    padding-bottom: 18px;
    padding-top: 12px;
    border-bottom: 1px solid ${colors.gray100};
  }
`;
