import { styled } from "@stitches/react";

import { mq } from "@src/design/theme/mediaQueries";
import { theme } from "@src/design/theme/stitches.config";

export const Text = styled("div", {
  fontSize: 14,
  lineHeight: 1.4,
  wordBreak: "keep-all",

  variants: {
    type: {
      title: {
        margin: 0,
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 1.3,
        color: theme.colors.gray12,
        wordBreak: "keep-all",

        [mq("sm")]: {
          fontSize: 20,
        },
      },
      tag: {
        color: theme.colors.gray11,
        fontSize: 12,
        lineHeight: 1,
        fontWeight: 700,
      },
      description: {
        // color: theme.colors.gray11,
        [mq("sm")]: {
          fontSize: 16,
        },
      },
    },
  },
});
