import { styled } from "@stitches/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useMemo } from "react";
import Balancer from "react-wrap-balancer";

import { Typography } from "@src/design/atoms/Typography";
import { JournalPageType } from "@src/types/notion";
import { getNotionTitle } from "@src/utils/notion";

import "dayjs/locale/ko";

interface Props {
  page: JournalPageType;
}

export const Journal = (props: Props) => {
  const {
    page: { id, last_edited_time, properties },
  } = props;

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(last_edited_time).locale("ko").format("YYYY년 MMMM D일");
  }, [last_edited_time]);

  const title = getNotionTitle(properties.Title)
  const description = properties.Description.rich_text[0]?.plain_text

  return (
    <Link href={`/journal/${id}`}>
      <Section>
        {/* <ImageContainer> */}
          {/* <img src={`/api/og/image?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={title} /> */}
        {/* </ImageContainer> */}
        <Metadata>
          <Typography type="tag">{formattedLastEditedTime}</Typography>
        </Metadata>
        <Balancer>
          <Typography type="title">
            {title}
          </Typography>
        </Balancer>
        <Typography type="description">
          {description}
        </Typography>
      </Section>
    </Link>
  );
};

const Section = styled("section", {
  display: "grid",
  gap: "4px",
  gridAutoRows: "max-content",
});

const ImageContainer = styled('div', {
  position: 'relative',
  aspectRatio: `16 / 9`
})

const Metadata = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "0 12px",
  alignItems: "center",
  userSelect: "none",
});
