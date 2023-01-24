import { styled } from "@stitches/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import Balancer from "react-wrap-balancer";

import { Typography } from "@src/design/atoms/Typography";
import { JournalPageType } from "@src/types/notion";
import { getNotionTitle } from "@src/utils/notion";

import "dayjs/locale/ko";

interface Props {
  page: JournalPageType;
}

export const ContentHeadline = (props: Props) => {
  const {
    page: { cover, last_edited_time, properties },
  } = props;

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(last_edited_time).locale("ko").format("YYYY년 MMMM D일");
  }, [last_edited_time]);

  return (
    <Section>
      <Metadata>
        <Typography type="tag">{formattedLastEditedTime}</Typography>
      </Metadata>
      <Balancer>
        <Typography type="title">{getNotionTitle(properties.Title)}</Typography>
      </Balancer>
      <Typography type="description">
        {properties.Description.rich_text[0]?.plain_text}
      </Typography>
    </Section>
  );
};

const Section = styled("section", {
  display: "grid",
  gap: "4px",
});

const Metadata = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "0 12px",
  alignItems: "center",
  userSelect: "none",
});
