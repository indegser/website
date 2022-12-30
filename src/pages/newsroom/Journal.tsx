import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { Subjects } from "./Subjects";

import { NotionContent } from "@src/design/notion/NotionContent";
import { ContentHeadline } from "@src/design/organs/content/ContentHeadline";
import { styled, theme } from "@src/design/theme/stitches.config";
import { JournalPageType } from "@src/types/notion";

interface Props {
  page: JournalPageType;
  blocks: BlockObjectResponse[];
}

export const Journal = (props: Props) => {
  const { page, blocks } = props;

  return (
    <Container>
      <ContentHeadline page={page} />
      <NotionContent blocks={blocks} />
      <Subjects properties={page.properties} />
    </Container>
  );
};

const Container = styled("div", {
  padding: "32px 0px",
  boxSizing: "border-box",
  borderBottom: `1px solid ${theme.colors.gray5}`,
});
