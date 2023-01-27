import { PageContainer } from "@src/design/atoms/Container";
import { NotionContent } from "@src/design/notion/NotionContent";
import { useJournalQuery } from "@src/queries/useJournalQuery";

interface Props {
  id: string;
}

export const JournalPage = (props: Props) => {
  const { id } = props;
  const { data, isFetching, isFetchedAfterMount } = useJournalQuery(id);
  if (!data) {
    console.warn(`Fail to hydrate react-query data`);
    return null;
  }

  if (isFetching && !isFetchedAfterMount) {
    console.info(`Doing background refresh...`);
  }

  const { blocks, journal } = data;

  return (
    <PageContainer>
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
