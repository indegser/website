import { PageContainer } from "@src/design/atoms/Container";
import { NotionContent } from "@src/design/notion/NotionContent";
import { useJournalQuery } from "@src/queries/useJournalQuery";
import { BlockType, JournalPageType } from "@src/types/notion";

interface Props {
  id: string;
  journal: JournalPageType;
  blocks: BlockType[];
}

export const JournalPage = (props: Props) => {
  const { id, ...initialData } = props;
  const { data } = useJournalQuery(id, initialData);

  if (!data) return null;

  const { blocks, journal } = data;

  return (
    <PageContainer>
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
