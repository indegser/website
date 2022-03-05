import { useMemo } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { mq } from "common/theme";
import { Row } from "common/atoms/Row";
import { styled, theme } from "common/stitches.config";
import { NewsType } from "types/news.types";
import "dayjs/locale/ko";

dayjs.extend(calendar);

interface Props {
  news: NewsType;
}

export const NewsPreview = ({ news }: Props) => {
  const desc = useMemo(() => {
    const result = dayjs(dayjs(news.published_at)).locale("ko").calendar(null, {
      sameDay: "[오늘] A h:mm", // The same day ( Today at 2:30 AM )
      lastDay: "[어제] A h:mm", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[지난] dddd A h:mm", // Last week ( Last Monday at 2:30 AM )
      sameElse: "YYYY[년] MMMM D[일] h:mm", // Everything else ( 17/10/2011 )
    });

    return result;
  }, [news.published_at]);

  return (
    <Container>
      <Link href={`/newsroom/${news.id}`} passHref>
        <a>
          <Row>
            <Title>{news.title}</Title>
            <Right>
              <Time>{desc}</Time>
            </Right>
          </Row>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled("div", {
  marginBottom: 16,

  "@bp1": {
    marginBottom: 2,
  },
});

const Right = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content",
  gridGap: "8px",
  alignItems: "center",
  flex: "0 0 auto",

  [mq("sm")]: {
    marginTop: 6,
  },
});

const Title = styled("h2", {
  fontWeight: 580,
  fontSize: 16,
  lineHeight: 1.38,
  paddingBottom: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  margin: 0,
  marginRight: 20,
  backgroundImage: `linear-gradient(to right, ${theme.colors.borderSubtle} 0%, ${theme.colors.borderSubtle} 100%)`,
  backgroundRepeat: "repeat-x",
  backgroundPosition: "0px 100%",
  backgroundSize: "100% 1px",

  [mq("sm")]: {
    fontSize: 17,
    lineHeight: 1.2,
    background: "none !important",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    textOverflow: "unset",
  },
});

const Time = styled("div", {
  fontSize: 12,
  fontWeight: 400,
  color: "$fgMuted",
  lineHeight: 1,
});
