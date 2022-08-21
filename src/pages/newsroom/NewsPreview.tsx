import "dayjs/locale/ko";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import Link from "next/link";
import { useMemo } from "react";

import { NewsCover } from "./NewsCover";
import { NewsSeries } from "./NewsSeries";

import { Text } from "@src/design/atoms/typography/Text";
import { Title } from "@src/design/atoms/typography/Title";
import { RichText } from "@src/design/notion/RichText";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { NewsPageType } from "@src/types/news.types";

dayjs.extend(calendar);

interface Props {
  news: NewsPageType;
}

export const NewsPreview = ({ news }: Props) => {
  const { last_edited_time } = news;
  const { title, excerpt, series } = news.properties;

  const time = useMemo(() => {
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
            <Left>
              <NewsSeries series={series} />
              <NewsTitle>
                <RichText data={title.title} shouldRenderPlainText />
              </NewsTitle>
              <Excerpt type="description">
                <RichText data={excerpt.rich_text} />
              </Excerpt>
            </Left>
            <Right>
              <NewsCover news={news} />
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
  padding: `24px 0`,

  [mq("sm")]: {
    marginRight: 0,
  },
});

const Content = styled("div", {
  display: "flex",
});

const Left = styled("div", {
  flex: "1 1",
});

const Right = styled("div", {
  flex: "0 0 auto",
  paddingLeft: 24,

  ["&:first-child"]: {
    paddingLeft: 0,
  },
});

const NewsTitle = styled(Title, {
  marginRight: 20,
  marginTop: 2,
});

const Excerpt = styled(Text, {
  marginTop: 4,
});
