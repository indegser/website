import { styled } from "@src/design/theme/stitches.config";
import { useSeriesStore } from "@src/hooks/store/StoreProvider";

export const SeriesFilter = () => {
  const data = useSeriesStore();
  const keys = Object.keys(data);

  return (
    <div>
      <Container>
        {keys.map((key) => {
          const series = data[key];

          return <Item key={key}>{series.name}</Item>;
        })}
      </Container>
    </div>
  );
};

const Container = styled("div", {
  overflowX: "scroll",
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gap: "0 32px",
});

const Item = styled("div", {
  fontSize: 14,
});
