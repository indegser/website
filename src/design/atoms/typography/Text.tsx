import { styled } from "@stitches/react";

import { theme } from "@src/design/theme/stitches.config";

export const Text = styled("div", {
  fontSize: 14,
  lineHeight: 1.4,
  wordBreak: "keep-all",

  variants: {
    type: {
      tag: {
        color: theme.colors.gray11,
        fontSize: 12,
        lineHeight: 1,
        fontWeight: 700,
      },
      description: {
        color: theme.colors.gray11,
      },
    },
  },
});
