import { useTagsQuery } from "queries/useTagsQuery";
import * as Select from "@radix-ui/react-select";
import { styled, theme } from "common/stitches.config";
import { IoPricetagsSharp } from "react-icons/io5";
import { mediaQueries, mq } from "common/theme";
import { useState } from "react";

export const NewsTag = () => {
  const { data } = useTagsQuery();
  const [value, setValue] = useState("Reading");

  return (
    <Container>
      <Select.Root value={value} onValueChange={setValue}>
        <StyledTrigger aria-label={value}>
          <Select.Value>{value ? value : "카테고리 태그"}</Select.Value>
        </StyledTrigger>
        <StyledContent>
          <Select.Viewport>
            {data?.map((tag) => (
              <StyledItem key={tag.name} value={tag.name}>
                <Select.ItemText>{tag.name}</Select.ItemText>
              </StyledItem>
            ))}
          </Select.Viewport>
        </StyledContent>
      </Select.Root>
    </Container>
  );
};

const Container = styled("div", {
  margin: "4px 0",
});

const StyledTrigger = styled(Select.Trigger, {
  background: "none",
  outline: "none",
  border: "none",
  cursor: "pointer",
  color: theme.colors.fgSubtle,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px",
  borderRadius: 4,
  position: "relative",

  [mediaQueries.hoverable]: {
    ["&:hover"]: {
      background: theme.colors.canvasInset,
    },
  },
});

const TriggerText = styled("span", {
  marginLeft: 6,
});

const StyledContent = styled(Select.Content, {
  borderRadius: 4,
  // padding: "20px 0",
  // width: 260,
  overflow: "hidden",
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
});

const StyledItem = styled(Select.Item, {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  // color: violet.violet11,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    // color: mauve.mauve8,
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: theme.colors.fgDefault,
    color: theme.colors.canvasInset,
  },
});
