import "dayjs/locale/ko";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import Link from "next/link";
import { useMemo } from "react";

import { NewsCategory } from "./NewsCategory";
import { NewsCover } from "./NewsCover";

import { RichText } from "@src/design/notion/RichText";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { NewsType } from "@src/types/notion.types";

dayjs.extend(calendar);

interface Props {
  news: NewsType;
}

export const NewsPreview = ({ news }: Props) => {
  const { last_edited_time } = news;
  const { title } = news.properties;

  const desc = useMemo(() => {
    const result = dayjs(dayjs(last_edited_time)).locale("ko").calendar(null, {
      sameDay: "[오늘] A h:mm", // The same day ( Today at 2:30 AM )
      lastDay: "[어제] A h:mm", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[지난] dddd", // Last week ( Last Monday at 2:30 AM )
      sameElse: "YYYY[년] MMMM D[일]", // Everything else ( 17/10/2011 )
    });

    return result;
  }, [last_edited_time]);

  return (
    <Container>
      <Link href={`/newsroom/${news.id}`} passHref>
        <a>
          <Content>
            <Right>
              <Title>
                <RichText data={title.title} shouldRenderPlainText />
              </Title>
              <NewsCategory category={news.properties.category} />
            </Right>
          </Content>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderTop: `1px solid ${theme.colors.gray6}`,
  padding: `8px 0`,

  [mq("sm")]: {
    marginRight: 0,
  },
});

const Content = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Right = styled("div", {
  flex: "1 1",
  paddingLeft: 24,

  ["&:first-child"]: {
    paddingLeft: 0,
  },
});

const Title = styled("h2", {
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.28,
  paddingBottom: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  margin: 0,
  marginRight: 20,
  color: theme.colors.gray12,

  [mq("sm")]: {
    lineHeight: 1.2,
    background: "none !important",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    textOverflow: "unset",
  },
});

const Time = styled("div", {
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.gray11,
  lineHeight: 1,
  marginTop: 8,
});
