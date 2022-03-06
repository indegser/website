import { styled } from "common/stitches.config";

export const PageContainer = styled("div", {
  margin: "0 auto",
  maxWidth: "980px",
  padding: "0 22px",
  position: "relative",
  boxSizing: "content-box",
  paddingLeft: "max(22px,env(safe-area-inset-left))",
  paddingRight: "max(22px,env(safe-area-inset-right))",
});

export const MarkdownContainer = styled("div", {
  maxWidth: 653,
  margin: "0 auto",
});
