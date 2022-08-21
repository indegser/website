import { styled } from "@stitches/react";

import { theme } from "@src/design/theme/stitches.config";

export const Text = styled("div", {
  fontSize: 14,
  lineHeight: 1.4,
  wordBreak: "keep-all",

  variants: {
    type: {
      description: {
        color: theme.colors.gray11,
      },
    },
  },
});
