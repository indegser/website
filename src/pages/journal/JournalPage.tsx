import { JournalHeadline } from './JournalHeadline';
import { useJournalRouter } from './JournalPage.hooks';

import { PageContainer } from '@src/design/atoms/Container';
import { NotionContent } from '@src/design/notion/NotionContent';
import { useJournalQuery } from '@src/queries/useJournalQuery';

interface Props {
  id: string;
}

export const JournalPage = (props: Props) => {
  const { id } = props;
  const { data, isSuccess } = useJournalQuery(id);
  useJournalRouter();

  if (!isSuccess) {
    console.warn(`Fail to hydrate react-query data`);
  }

  return (
    <PageContainer>
      <JournalHeadline id={id} />
      <NotionContent blocks={data.blocks} />
    </PageContainer>
  );
};
