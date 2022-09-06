import Link from "next/link";

import { styled } from "@src/design/theme/stitches.config";
import { useSeriesStore } from "@src/hooks/store/StoreProvider";

export const SeriesFilter = () => {
  const data = useSeriesStore();
  const keys = Object.keys(data);

  return (
    <Container>
      {keys.map((key) => {
        const series = data[key];

        return (
          <Link
            key={key}
            href={{ query: { series: series.id } }}
            passHref
            shallow
          >
            <a>
              <Item key={key}>{series.name}</Item>
            </a>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  overflowX: "scroll",
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gap: "0 32px",
  margin: `20px 0`,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const Item = styled("div", {
  fontSize: 14,
});
