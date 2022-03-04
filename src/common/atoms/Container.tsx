import { styled } from "common/stitches.config";
import { mq } from "common/theme";

export const PageContainer = styled("div", {
  margin: "0 auto",
  maxWidth: "980px",
  padding: "0 22px",
  position: "relative",
  boxSizing: "content-box",
  paddingLeft: "max(22px,env(safe-area-inset-left))",
  paddingRight: "max(22px,env(safe-area-inset-right))",

  [mq("sm")]: {
    width: "100%",
  },
});

export const MarkdownContainer = styled("div", {
  maxWidth: 640,
  margin: "0 auto",
});
