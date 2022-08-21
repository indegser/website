import { styled } from "@stitches/react";

import { mq } from "@src/design/theme/mediaQueries";
import { theme } from "@src/design/theme/stitches.config";

export const Title = styled("h2", {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.28,
  fontWeight: 600,
  color: theme.colors.gray12,
  wordBreak: "keep-all",

  [mq("sm")]: {
    lineHeight: 1.2,
  },
});
