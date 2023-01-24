import { PageContainer } from "@src/design/atoms/Container";
import { NotionContent } from "@src/design/notion/NotionContent";
import { BlockType } from "@src/types/notion";

interface Props {
  blocks: BlockType[];
}

export const JournalPage = (props: Props) => {
  const { blocks } = props;
  return (
    <PageContainer>
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
