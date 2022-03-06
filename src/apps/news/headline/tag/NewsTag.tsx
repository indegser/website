import { styled, theme } from "common/stitches.config";
import { mediaQueries } from "common/theme";
import { useIsAdmin } from "common/hooks/admin.hooks";
import * as Popover from "@radix-ui/react-popover";
import { TagForm } from "./TagForm";
import { useNewsTag } from "./NewsTag.hooks";

export const NewsTag = () => {
  const isAdmin = useIsAdmin();
  const { tag, tags, isReady, updateNewsTag } = useNewsTag();

  if (!isReady) {
    return <Container>...</Container>;
  }

  if (!isAdmin) {
    return <Container>{tag}</Container>;
  }

  return (
    <Container>
      <Popover.Root>
        <StyledTrigger asChild>
          <div>{tag}</div>
        </StyledTrigger>
        <StyledContent align="start">
          <TagForm />
          <TagList>
            {tags?.map((tag) => (
              <Item key={tag.name} onClick={() => updateNewsTag(tag)}>
                <Tag>{tag.name}</Tag>
              </Item>
            ))}
          </TagList>
        </StyledContent>
      </Popover.Root>
    </Container>
  );
};

const Container = styled("div", {
  fontSize: 14,
  fontWeight: 560,
  color: theme.colors.fgSubtle,
});

const StyledTrigger = styled(Popover.Trigger, {
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

const StyledContent = styled(Popover.Content, {
  borderRadius: 4,
  width: 260,
  overflow: "hidden",
  backgroundColor: "white",
  border: `1px solid ${theme.colors.borderSubtle}`,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
});

const TagList = styled("div", {
  padding: "4px 0",
});

const Item = styled("div", {
  all: "unset",
  lineHeight: 1,
  borderRadius: 3,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  color: theme.colors.fgSubtle,
  height: 28,
  padding: "0 8px 0 16px",
  margin: "0 4px",
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

const Tag = styled("div", {
  color: theme.colors.fgDefault,
  background: theme.colors.canvasSubtle,
  padding: 4,
  borderRadius: 4,
});
