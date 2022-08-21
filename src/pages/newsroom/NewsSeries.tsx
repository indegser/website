import { styled, theme } from "@src/design/theme/stitches.config";
import { useSeriesStore } from "@src/hooks/store/StoreProvider";
import { NewsType } from "@src/types/news.types";

interface Props {
  series: NewsType["properties"]["series"];
}

export const NewsSeries = ({ series }: Props) => {
  const seriesStore = useSeriesStore();
  return (
    <Container>
      {series.relation.map((seriesItem) => {
        const { id } = seriesItem;
        const joined = seriesStore[id];

        if (!joined) return null;

        return (
          <Tag key={id}>
            <Text>{joined.name}</Text>
          </Tag>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  display: "grid",
  gap: "8px 16px",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
});

const Tag = styled("div", {
  color: theme.colors.gray12,
  padding: "2px 0px",
});

const Text = styled("div", {
  fontSize: 12,
  fontWeight: 600,
});
