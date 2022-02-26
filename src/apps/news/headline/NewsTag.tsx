import { useTagsQuery } from "queries/useTagsQuery";
import * as Popover from "@radix-ui/react-popover";
import { styled, theme } from "common/stitches.config";
import { IoPricetagsSharp } from "react-icons/io5";
import { mediaQueries, mq } from "common/theme";

export const NewsTag = () => {
  const { data } = useTagsQuery();

  return (
    <Container>
      <Popover.Root>
        <StyledTrigger>
          <IoPricetagsSharp size={14} />
          <TriggerText>뉴스태그</TriggerText>
        </StyledTrigger>
        <StyledContent align="start">
          {data?.map((tag) => (
            <div key={tag.name}>{tag.name}</div>
          ))}
        </StyledContent>
      </Popover.Root>
    </Container>
  );
};

const Container = styled("div", {
  margin: "4px 0",
});

const StyledTrigger = styled(Popover.Trigger, {
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

  [mediaQueries.hoverable]: {
    ["&:hover"]: {
      background: theme.colors.canvasInset,
    },
  },
});

const TriggerText = styled("span", {
  marginLeft: 6,
});

const StyledContent = styled(Popover.Content, {
  borderRadius: 4,
  padding: "20px 0",
  width: 260,
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
});
