import { PageContainer } from "@src/design/atoms/Container";
import { SEO } from "@src/design/atoms/SEO";
import { NotionContent } from "@src/design/notion/NotionContent";
import { ContentHeadline } from "@src/design/organs/content/ContentHeadline";
import { ContentMetaType } from "@src/types/content.types";
import { BlockType } from "@src/types/notion.types";

interface Props {
  meta: ContentMetaType;
  blocks: BlockType[];
}

export const BookPage = ({ meta, blocks }: Props) => {
  return (
    <PageContainer>
      <SEO title={meta.title} image={meta.image} />
      <ContentHeadline
        title={meta.title}
        lastEditedTime={meta.lastEditedTime}
      />
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
