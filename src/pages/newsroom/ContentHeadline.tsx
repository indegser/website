import { styled } from "@stitches/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import Balancer from "react-wrap-balancer";

import { Text } from "@src/design/atoms/typography/Text";
import { mq } from "@src/design/theme/mediaQueries";
import { theme } from "@src/design/theme/stitches.config";
import { JournalPageType } from "@src/types/notion";
import { getNotionTitle } from "@src/utils/notion";

import "dayjs/locale/ko";

interface Props {
  page: JournalPageType;
}

export const ContentHeadline = (props: Props) => {
  const {
    page: { last_edited_time, properties },
  } = props;

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(last_edited_time).locale("ko").format("YYYY년 MMMM D일");
  }, [last_edited_time]);

  return (
    <Section>
      <Metadata>
        <Text type="tag">{formattedLastEditedTime}</Text>
      </Metadata>
      <Balancer>
        <Title>{getNotionTitle(properties.Title)}</Title>
      </Balancer>
      <Balancer>
        <Text type="description">
          {properties.Description.rich_text[0]?.plain_text}
        </Text>
      </Balancer>
    </Section>
  );
};

const Section = styled("section", {
  display: "grid",
  gap: "12px",
});

const Metadata = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "0 12px",
  alignItems: "center",
  userSelect: "none",
});

const Title = styled("h1", {
  margin: 0,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: 1.15,
  color: theme.colors.gray12,
  wordBreak: "keep-all",

  [mq("sm")]: {
    fontSize: 20,
  },
});
