import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { styled, theme } from "@src/design/theme/stitches.config";
import { useSeriesStore } from "@src/hooks/store/StoreProvider";

export const SeriesFilter = () => {
  const router = useRouter();
  const data = useSeriesStore();

  const tabList = useMemo(() => {
    const defaultTab = { name: "Today", id: "" };
    const seriesTabList = Object.keys(data).map((key) => {
      return data[key];
    });
    return [defaultTab, ...seriesTabList];
  }, [data]);

  return (
    <Container>
      {tabList.map((tab) => {
        const seriesQuery = tab.id === "" ? {} : { series: tab.id };
        const isTodayActive = !Boolean(router.query.series);
        const isActive =
          (tab.id === "" && isTodayActive) ||
          (tab.id !== "" && router.query.series?.includes(tab.id));

        return (
          <Link key={tab.id} href={{ query: seriesQuery }} passHref shallow>
            <A aria-current={Boolean(isActive)}>
              <Item>{tab.name}</Item>
            </A>
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
  gap: "0 24px",
  margin: `20px 0 4px 0`,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  borderBottom: `4px solid`,
  paddingBottom: "12px",
});

const A = styled("a", {
  fontWeight: 700,
  [`&[aria-current='false']`]: {
    color: theme.colors.gray10,
  },
});

const Item = styled("div", {
  fontSize: 15,
});
