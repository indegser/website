import { styled } from "common/stitches.config";

export const PageContainer = styled("div", {
  maxWidth: 1040,
  margin: "0 auto",
  boxSizing: "border-box",
  paddingTop: 24,

  "@bp1": {
    paddingTop: 0,
  },
});

export const MarkdownContainer = styled("div", {
  maxWidth: 640,
  margin: "0 auto",
});
