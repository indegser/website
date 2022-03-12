import "dayjs/locale/ko";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import Link from "next/link";
import { useMemo } from "react";

import { Row } from "@src/common/atoms/Row";
import { styled, theme } from "@src/common/stitches.config";
import { mq } from "@src/common/theme";
import { RichText } from "@src/design/RichText";
import { NewsType } from "@src/types/notion.types";

dayjs.extend(calendar);

interface Props {
  news: NewsType;
}

export const NewsPreview = ({ news }: Props) => {
  const { published_time, title } = news.properties;

  const desc = useMemo(() => {
    const result = dayjs(dayjs(published_time.date.start))
      .locale("ko")
      .calendar(null, {
        sameDay: "[오늘] A h:mm", // The same day ( Today at 2:30 AM )
        lastDay: "[어제] A h:mm", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "[지난] dddd A h:mm", // Last week ( Last Monday at 2:30 AM )
        sameElse: "YYYY[년] MMMM D[일] h:mm", // Everything else ( 17/10/2011 )
      });

    return result;
  }, [published_time]);

  return (
    <Container>
      <Link href={`/newsroom/${news.id}`} passHref>
        <a>
          <Row>
            <Title>
              <RichText data={title.title} shouldRenderPlainText />
            </Title>
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
