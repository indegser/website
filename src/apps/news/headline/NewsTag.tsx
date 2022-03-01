import { useTagsQuery } from "queries/useTagsQuery";
import * as Select from "@radix-ui/react-select";
import { styled, theme } from "common/stitches.config";
import { mediaQueries } from "common/theme";
import { useState } from "react";
import { useIsAdmin } from "common/hooks/admin.hooks";

export const NewsTag = () => {
  const isAdmin = useIsAdmin();
  const { data } = useTagsQuery();
  const [value, setValue] = useState("Reading");

  if (!isAdmin) {
    return <Container>{value}</Container>;
  }

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
  fontSize: 14,
  fontWeight: 560,
  color: theme.colors.fgSubtle,
});

const StyledTrigger = styled(Select.Trigger, {
  background: "none",
  outline: "none",
  border: "none",
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
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
  lineHeight: 1,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  color: theme.colors.fgSubtle,
  padding: "8px 35px 8px 25px",
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
