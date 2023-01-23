import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { styled } from "@src/design/theme/stitches.config";
import { ContentHeadline } from "@src/pages/newsroom/ContentHeadline";
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
    </Container>
  );
};

const Container = styled("div", {});
