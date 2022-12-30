import Link from "next/link";

import { styled, theme } from "@src/design/theme/stitches.config";
import { JournalPageType } from "@src/types/notion";

interface Props {
  properties: JournalPageType["properties"];
}

export const Hashtags = (props: Props) => {
  const {
    properties: { Hashtags: hashtags },
  } = props;
  return (
    <Container>
      {hashtags.multi_select.map((hashtag) => {
        return (
          <Link
            key={hashtag.id}
            href={{ pathname: "/", query: { hashtag: hashtag.name } }}
          >
            <Tag>{hashtag.name}</Tag>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  fontSize: 12,
  fontWeight: 500,
});

const Tag = styled("div", {
  padding: "4px 8px",
  background: theme.colors.gray3,
  borderRadius: 4,
});
