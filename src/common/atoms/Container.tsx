import { styled } from "common/stitches.config";
import { mq } from "common/theme";

export const PageContainer = styled("div", {
  maxWidth: 1088,
  margin: "0 auto",
  boxSizing: "border-box",
  padding: "0 24px",

  [mq("sm")]: {
    padding: 0,
  },

  "@bp1": {
    paddingTop: 0,
  },
});

export const MarkdownContainer = styled("div", {
  maxWidth: 640,
  margin: "0 auto",
});
