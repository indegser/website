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

        return <Text key={id}>{joined.name}</Text>;
      })}
    </Container>
  );
};

const Container = styled("div", {});

const Text = styled("div", {
  fontSize: 12,
  color: theme.colors.gray11,
  fontWeight: 500,
  letterSpacing: 0.2,
});
