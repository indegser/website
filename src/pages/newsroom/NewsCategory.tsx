import { styled, theme } from "@src/design/theme/stitches.config";
import { PropertyType } from "@src/types/notion.types";

interface Props {
  category: Extract<PropertyType, { type: "multi_select" }>;
}

export const NewsCategory = ({ category }: Props) => {
  return (
    <Container>
      {category.multi_select.map((item) => {
        const { id, name } = item;
        return <Text key={id}>{name}</Text>;
      })}
    </Container>
  );
};

const Container = styled("div", {});

const Text = styled("div", {
  fontSize: 13,
  color: theme.colors.gray10,
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: 0.2,
});
